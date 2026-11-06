"use client";

import { useState } from "react";
import { formularios, type Campo } from "@/content/formularios";

/** Máscara do original: (11) 99999-9999 */
function mascaraTelefone(v: string) {
  return v
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2");
}

function CampoForm({ c }: { c: Campo }) {
  const id = `form-field-${c.nome}`;
  const grupo = `elementor-field-type-${c.tipo} elementor-field-group elementor-column elementor-field-group-${c.grupo} elementor-col-100${
    c.obrigatorio ? " elementor-field-required elementor-mark-required" : ""
  }`;

  if (c.tipo === "checkbox") {
    return (
      <div className={grupo}>
        <div className="elementor-field-subgroup ">
          <span className="elementor-field-option">
            <input type="checkbox" value="Sim" id={`${id}-0`} name={c.nome} />{" "}
            <label htmlFor={`${id}-0`}>{c.rotulo}</label>
          </span>
        </div>
      </div>
    );
  }

  const label = (
    <label htmlFor={id} className="elementor-field-label">
      {" "}
      {c.rotulo}{" "}
    </label>
  );

  if (c.tipo === "select") {
    return (
      <div className={grupo}>
        {label}
        <div className="elementor-field elementor-select-wrapper remove-before ">
          <div className="select-caret-down-wrapper">
            <svg
              aria-hidden="true"
              className="e-font-icon-svg e-eicon-caret-down"
              viewBox="0 0 571.4 571.4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M571 393Q571 407 561 418L311 668Q300 679 286 679T261 668L11 418Q0 407 0 393T11 368 36 357H536Q550 357 561 368T571 393Z" />
            </svg>
          </div>
          <select
            name={c.nome}
            id={id}
            className="elementor-field-textual elementor-size-sm"
            required={c.obrigatorio}
            aria-required={c.obrigatorio || undefined}
          >
            {c.opcoes?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (c.tipo === "textarea") {
    return (
      <div className={grupo}>
        {label}
        <textarea
          className="elementor-field-textual elementor-field elementor-size-sm"
          name={c.nome}
          id={id}
          rows={4}
          required={c.obrigatorio}
        ></textarea>
      </div>
    );
  }

  return (
    <div className={grupo}>
      {label}
      <input
        size={1}
        type={c.tipo}
        name={c.nome}
        id={id}
        className="elementor-field elementor-size-sm elementor-field-textual"
        placeholder={c.placeholder}
        required={c.obrigatorio}
        aria-required={c.obrigatorio || undefined}
        autoComplete={
          c.tipo === "email"
            ? "email"
            : c.tipo === "tel"
              ? "tel"
              : c.nome === "nome"
                ? "name"
                : undefined
        }
        {...(c.tipo === "tel"
          ? {
              pattern: "[0-9()#&+*\\-=. ]+",
              title: "Informe apenas números do telefone.",
              ...(c.mascaraTelefone ? { maxLength: 15 } : {}),
            }
          : {})}
        onInput={
          c.mascaraTelefone
            ? (e) =>
                (e.currentTarget.value = mascaraTelefone(e.currentTarget.value))
            : undefined
        }
      />
    </div>
  );
}

/** Formulário com a mesma marcação do Elementor Forms; envia para /api/formulario. */
export function ElementorForm({ tipo }: { tipo: "contato" | "cadastro" }) {
  const f = formularios[tipo];
  const [estado, setEstado] = useState<"livre" | "enviando" | "ok" | "erro">(
    "livre",
  );

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setEstado("enviando");
    const dados = Object.fromEntries(new FormData(form).entries());
    try {
      const r = await fetch("/api/formulario/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formulario: tipo, dados }),
      });
      if (!r.ok) throw new Error(String(r.status));
      form.reset();
      setEstado("ok");
    } catch {
      setEstado("erro");
    }
  }

  return (
    <form
      className="elementor-form"
      method="post"
      name={f.titulo}
      onSubmit={enviar}
      onInput={() => estado !== "enviando" && setEstado("livre")}
    >
      {/* mesmos campos ocultos do original (mantém a estrutura do formulário) */}
      <input type="hidden" name="post_id" value={f.paginaId} />
      <input type="hidden" name="form_id" value={f.id} />
      <input type="hidden" name="referer_title" value={f.titulo} />
      <input type="hidden" name="queried_id" value={f.paginaId} />
      <div className="elementor-form-fields-wrapper elementor-labels-above">
        {f.campos.map((c) => (
          <CampoForm key={c.nome} c={c} />
        ))}
        <div className="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons">
          <button
            className={`elementor-button elementor-size-${f.botaoTamanho}`}
            type="submit"
            disabled={estado === "enviando"}
          >
            <span className="elementor-button-content-wrapper">
              <span className="elementor-button-text">{f.botao}</span>
            </span>
          </button>
        </div>
      </div>
      {estado === "ok" && (
        <div
          className="elementor-message elementor-message-success"
          role="alert"
        >
          {f.sucesso}
        </div>
      )}
      {estado === "erro" && (
        <div
          className="elementor-message elementor-message-danger"
          role="alert"
        >
          {f.erro}
        </div>
      )}
      {/* armadilha anti-spam: invisível para pessoas */}
      <input
        type="text"
        name="_site"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />
    </form>
  );
}
