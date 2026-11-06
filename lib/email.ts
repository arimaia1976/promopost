/**
 * Envio de e-mail com provedor configurável por variável de ambiente.
 *   EMAIL_PROVIDER=resend  → RESEND_API_KEY
 *   EMAIL_PROVIDER=smtp    → SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (e-mail do próprio cliente)
 *   EMAIL_FROM, EMAIL_TO   → remetente e destinatário(s), separados por vírgula
 * Trocar de provedor = trocar variáveis no servidor. Nada no site muda.
 */
import nodemailer from "nodemailer";

type Mensagem = {
  assunto: string;
  html: string;
  texto: string;
  responderPara?: string;
  para?: string | null;
};

export function emailConfigurado(para?: string | null) {
  const p = process.env.EMAIL_PROVIDER;
  return (
    !!(para || process.env.EMAIL_TO) &&
    ((p === "resend" && !!process.env.RESEND_API_KEY) ||
      (p === "smtp" && !!process.env.SMTP_HOST))
  );
}

export async function enviarEmail(m: Mensagem) {
  const from =
    process.env.EMAIL_FROM ?? "PromoPost <no-reply@promopost.com.br>";
  const to = (m.para || process.env.EMAIL_TO || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (process.env.EMAIL_PROVIDER === "resend") {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: m.assunto,
        html: m.html,
        text: m.texto,
        reply_to: m.responderPara,
      }),
    });
    if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
    return;
  }

  const t = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await t.sendMail({
    from,
    to,
    subject: m.assunto,
    html: m.html,
    text: m.texto,
    replyTo: m.responderPara,
  });
}
