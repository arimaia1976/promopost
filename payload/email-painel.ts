import { APIError, type PayloadEmailAdapter } from "payload";
import { emailConfigurado, enviarEmail } from "../lib/email";

function enderecos(destino: unknown): string[] {
  if (Array.isArray(destino)) return destino.flatMap(enderecos);
  if (typeof destino === "string") return [destino];
  if (destino && typeof destino === "object" && "address" in destino) return [String(destino.address)];
  return [];
}

/**
 * E-mails do próprio painel (recuperação de senha), pelo mesmo provedor dos formulários.
 * Se o envio falhar, o usuário vê um aviso claro em vez de achar que o e-mail foi enviado.
 */
export const emailPainel: PayloadEmailAdapter = () => ({
  name: "promopost",
  defaultFromAddress: "no-reply@promopost.com.br",
  defaultFromName: "PromoPost",
  sendEmail: async (mensagem) => {
    const para = enderecos(mensagem.to).join(",");
    try {
      if (!emailConfigurado(para)) throw new Error("envio de e-mail não configurado");
      const html = String(mensagem.html ?? "");
      await enviarEmail({
        para,
        assunto: String(mensagem.subject ?? ""),
        html,
        texto: String(mensagem.text ?? html.replace(/<[^>]+>/g, " ")),
      });
    } catch (erro) {
      console.error("[painel] falha ao enviar e-mail:", erro);
      throw new APIError(
        "Não foi possível enviar o e-mail agora. Fale com o administrador do site.",
        500,
        undefined,
        true,
      );
    }
  },
});
