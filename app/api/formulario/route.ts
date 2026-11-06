import { NextResponse } from "next/server";
import { formularios } from "@/content/formularios";
import { getFormularios } from "@/lib/content";
import { emailConfigurado, enviarEmail } from "@/lib/email";

/**
 * Recebe os formulários do site e entrega:
 *  - por e-mail ao cliente (lib/email.ts), e/ou
 *  - para uma planilha/automação via FORM_WEBHOOK_URL (ex.: Make → Google Sheets).
 * Nenhum dado pessoal fica guardado no site.
 */
const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

export async function POST(req: Request) {
  let body: { formulario?: string; dados?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const tipo =
    body.formulario === "contato" || body.formulario === "cadastro"
      ? body.formulario
      : null;
  const dados = body.dados ?? {};
  if (!tipo) return NextResponse.json({ ok: false }, { status: 400 });

  // armadilha anti-spam preenchida → finge sucesso e descarta
  if (dados._site) return NextResponse.json({ ok: true });

  const f = formularios[tipo];
  const linhas: [string, string][] = [];
  const campos: Record<string, string> = {};
  for (const c of f.campos) {
    const v = String(dados[c.nome] ?? "")
      .slice(0, 5000)
      .trim();
    if (c.obrigatorio && !v)
      return NextResponse.json({ ok: false, campo: c.nome }, { status: 422 });
    const valor = c.tipo === "checkbox" ? (v ? "Sim" : "Não") : v;
    linhas.push([c.rotulo.trim(), valor]);
    campos[c.nome] = valor;
  }
  if (dados.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(dados.email))) {
    return NextResponse.json({ ok: false, campo: "email" }, { status: 422 });
  }

  const cfg = (await getFormularios())[tipo];
  const quando = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  const entregas: Promise<unknown>[] = [];

  if (emailConfigurado(cfg.emailDestino)) {
    entregas.push(
      enviarEmail({
        assunto: cfg.assunto,
        para: cfg.emailDestino,
        html: `<h2>Novo envio: ${esc(f.titulo)}</h2><table cellpadding="6">${linhas
          .map(
            ([k, v]) =>
              `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
          )
          .join(
            "",
          )}</table><p style="color:#888">Enviado em ${quando} pelo site promopost.com.br</p>`,
        texto:
          linhas.map(([k, v]) => `${k}: ${v}`).join("\n") +
          `\n\nEnviado em ${quando}`,
        responderPara: dados.email ? String(dados.email) : undefined,
      }),
    );
  }

  if (process.env.FORM_WEBHOOK_URL) {
    entregas.push(
      fetch(process.env.FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formulario: f.titulo,
          data: quando,
          ...campos,
        }),
      }).then((r) => {
        if (!r.ok) throw new Error(`webhook ${r.status}`);
      }),
    );
  }

  if (!entregas.length) {
    // Prévia sem destino configurado: aceita (para testar a tela) e registra no log.
    console.warn(`[formulario] ${tipo} recebido sem destino configurado`);
    return NextResponse.json({ ok: true, teste: true });
  }

  const res = await Promise.allSettled(entregas);
  const falhas = res.filter(
    (r) => r.status === "rejected",
  ) as PromiseRejectedResult[];
  falhas.forEach((r) =>
    console.error("[formulario] falha na entrega:", r.reason),
  );
  // sucesso se pelo menos um destino recebeu
  return falhas.length === res.length
    ? NextResponse.json({ ok: false }, { status: 502 })
    : NextResponse.json({ ok: true });
}
