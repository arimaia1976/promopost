/**
 * Formulários do site, com os mesmos campos, textos e ordem do original.
 * `nome` é o identificador do campo no e-mail/planilha (no original, "Nome da
 * Empresa" reaproveitava o nome do Telefone e um apagava o outro — corrigido).
 */
export type Campo = {
  nome: string;
  rotulo: string;
  tipo: "text" | "email" | "tel" | "select" | "textarea" | "checkbox";
  placeholder?: string;
  obrigatorio?: boolean;
  opcoes?: string[];
  /** Classe de grupo do original (mantém o CSS). */
  grupo: string;
  mascaraTelefone?: boolean;
};

export type Formulario = {
  id: string;
  /** Id da página no original (campo oculto). */
  paginaId: string;
  titulo: string;
  botao: string;
  botaoTamanho: "sm" | "md";
  sucesso: string;
  erro: string;
  campos: Campo[];
};

export const formularios: Record<"contato" | "cadastro", Formulario> = {
  contato: {
    id: "95db6c7",
    paginaId: "437",
    titulo: "Contato",
    botao: "Enviar",
    botaoTamanho: "md",
    sucesso: "A mensagem foi enviada com sucesso.",
    erro: "Ocorreu um erro ao enviar. Tente novamente.",
    campos: [
      {
        nome: "nome",
        rotulo: "Nome",
        tipo: "text",
        placeholder: "Seu nome aqui",
        obrigatorio: true,
        grupo: "name",
      },
      {
        nome: "email",
        rotulo: "Email",
        tipo: "email",
        placeholder: "exemplo@exemplo.com",
        obrigatorio: true,
        grupo: "email",
      },
      {
        nome: "telefone",
        rotulo: "Telefone",
        tipo: "tel",
        placeholder: "(00) 0 0000-0000",
        obrigatorio: true,
        grupo: "Campo_tel",
        mascaraTelefone: true,
      },
      {
        nome: "empresa",
        rotulo: "Nome da Empresa",
        tipo: "text",
        placeholder: "Nome empresa",
        grupo: "Campo_tel",
      },
      {
        nome: "assunto",
        rotulo: "Assunto",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Anúncio", "Sugestão", "Crtítica", "Outros"],
        grupo: "field_007e24f",
      },
      {
        nome: "mensagem",
        rotulo: "Mensagem",
        tipo: "textarea",
        grupo: "message",
      },
    ],
  },
  cadastro: {
    id: "60ff717",
    paginaId: "2122",
    titulo: "Cadastro",
    botao: "Cadastrar",
    botaoTamanho: "sm",
    sucesso: "A mensagem foi enviada com sucesso.",
    erro: "Ocorreu um erro ao enviar. Tente novamente.",
    campos: [
      {
        nome: "nome",
        rotulo: "Nome",
        tipo: "text",
        placeholder: "Seu nome aqui",
        obrigatorio: true,
        grupo: "name",
      },
      {
        nome: "email",
        rotulo: "Email",
        tipo: "email",
        placeholder: "exemplo@exemplo.com",
        obrigatorio: true,
        grupo: "email",
      },
      {
        nome: "telefone",
        rotulo: "Telefone",
        tipo: "tel",
        placeholder: "(00) 0 0000-0000",
        obrigatorio: true,
        grupo: "field_be703e8",
      },
      {
        nome: "cidade",
        rotulo: "Cidade",
        tipo: "text",
        placeholder: "Sua cidade aqui",
        obrigatorio: true,
        grupo: "field_19d5354",
      },
      {
        nome: "novidades",
        rotulo: "Gostaria de receber novidades e promoções ",
        tipo: "checkbox",
        grupo: "field_2ec04ad",
      },
    ],
  },
};
