"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Banner } from "@/types/content";

/** Mesmos pontos de quebra do carrossel original (largura da janela). */
function config(janela: number) {
  if (janela >= 980) return { itens: 1, margem: 0, velocidade: 300 };
  if (janela >= 768) return { itens: 2, margem: 20, velocidade: 1000 };
  return { itens: 1, margem: 0, velocidade: 300 };
}

type Props = {
  /** Id do widget original (mantém o CSS de referência). */
  widgetId: string;
  slides: Banner[];
  /** Intervalo do autoplay em ms (original: 3000). */
  intervalo?: number;
  /** Prioridade de carregamento da 1ª imagem (slider acima da dobra). */
  prioridade?: boolean;
};

/**
 * Carrossel de banners. Reproduz a marcação e o comportamento do carrossel
 * original (1 por vez, loop, autoplay com pausa no mouse, setas, bolinhas e
 * arraste), sem jQuery nem bibliotecas.
 */
export function Carousel({
  widgetId,
  slides,
  intervalo = 3000,
  prioridade,
}: Props) {
  const total = slides.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const [largura, setLargura] = useState(0);
  const [janela, setJanela] = useState(1280);
  const { itens, margem, velocidade } = config(janela);
  const loop = total > itens;
  const k = loop ? itens : 0; // clones em cada ponta
  // Posição na faixa com clones: [...últimos k, ...slides, ...primeiros k]
  const [pos, setPos] = useState(k);
  const [animar, setAnimar] = useState(false);
  const [pausado, setPausado] = useState(false);
  const arraste = useRef<{ x: number; dx: number } | null>(null);
  // Imagens dos outros slides: carregam todas assim que o carrossel chega perto da tela
  // (depois do carregamento da página), para nenhum banner entrar em branco na troca.
  const [todas, setTodas] = useState(false);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    let io: IntersectionObserver | undefined;
    const observar = () => {
      io = new IntersectionObserver(
        (entradas) => {
          if (entradas.some((e) => e.isIntersecting)) {
            setTodas(true);
            io?.disconnect();
          }
        },
        { rootMargin: "600px 0px" },
      );
      io.observe(el);
    };
    if (document.readyState === "complete") observar();
    else window.addEventListener("load", observar, { once: true });
    return () => {
      window.removeEventListener("load", observar);
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const medir = () => {
      setLargura(el.clientWidth);
      setJanela(window.innerWidth);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Ao mudar a quantidade de itens visíveis, volta ao primeiro slide.
  useEffect(() => {
    setAnimar(false);
    setPos(k);
  }, [k]);

  const ir = useCallback((p: number) => {
    setAnimar(true);
    setPos(p);
  }, []);

  useEffect(() => {
    if (pausado || !loop) return;
    const t = setInterval(() => ir(pos + 1), intervalo);
    return () => clearInterval(t);
  }, [pausado, pos, total, intervalo, ir]);

  // Ao chegar num clone, salta sem animação para o slide real equivalente.
  const fimTransicao = () => {
    if (pos < k || pos >= k + total) {
      setAnimar(false);
      setPos(pos < k ? pos + total : pos - total);
    }
  };

  const ativo = (((pos - k) % total) + total) % total;
  const faixa = loop
    ? [...slides.slice(total - k), ...slides, ...slides.slice(0, k)]
    : slides;
  const desloc = arraste.current?.dx ?? 0;
  // Mesma conta do carrossel original: (largura + margem) / itens - margem
  const larguraItem = largura
    ? Math.round(((largura + margem) / itens - margem) * 1000) / 1000
    : 0;
  const passo = larguraItem + margem;
  const visivel = (i: number) => i >= pos && i < pos + itens;

  const item = (s: Banner, i: number, clone: boolean) => (
    <div
      key={i}
      className={`owl-item${clone ? " cloned" : ""}${visivel(i) ? " uc-active-item active" : ""}`}
      style={
        larguraItem
          ? {
              width: `${larguraItem}px`,
              ...(margem ? { marginRight: `${margem}px` } : {}),
            }
          : // Antes do JavaScript: cada item ocupa exatamente a largura visível.
            { width: `${100 / faixa.length}%` }
      }
      aria-hidden={!visivel(i)}
    >
      <div className="uc_classic_carousel_container_holder ue-item">
        <div className="ue-carousel-item">
          <div className="uc_classic_carousel_placeholder">
            {s.link ? (
              <a
                href={s.link}
                title=""
                target={s.novaAba ? "_blank" : undefined}
                rel={s.novaAba ? "noopener" : undefined}
                tabIndex={visivel(i) ? undefined : -1}
              >
                <img
                  src={s.imagem}
                  alt={s.alt}
                  width={s.largura}
                  height={s.altura}
                  fetchPriority={prioridade && i === k ? "high" : undefined}
                  loading={todas || (prioridade && i === k) ? "eager" : "lazy"}
                />
              </a>
            ) : (
              <img
                src={s.imagem}
                alt={s.alt}
                width={s.largura}
                height={s.altura}
                loading={todas ? "eager" : "lazy"}
              />
            )}
          </div>
          <div
            className="uc_classic_carousel_content"
            style={{ direction: "ltr" }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="uc_classic_carousel"
      id={`uc_card_carousel_elementor_${widgetId}-wrapper`}
    >
      <div
        className="uc_carousel owl-carousel uc-items-wrapper owl-loaded owl-drag"
        id={`uc_card_carousel_elementor_${widgetId}`}
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        aria-roledescription="carrossel"
      >
        <div
          className="owl-stage-outer"
          ref={outerRef}
          onPointerDown={(e) => {
            arraste.current = { x: e.clientX, dx: 0 };
            setPausado(true);
          }}
          onPointerMove={(e) => {
            if (!arraste.current) return;
            arraste.current.dx = e.clientX - arraste.current.x;
            setAnimar(false);
            setPos((p) => p); // re-render com o deslocamento
          }}
          onPointerUp={() => {
            const dx = arraste.current?.dx ?? 0;
            arraste.current = null;
            setPausado(false);
            if (Math.abs(dx) > passo / 6) ir(pos + (dx < 0 ? 1 : -1));
            else ir(pos);
          }}
          onPointerCancel={() => {
            arraste.current = null;
            ir(pos);
          }}
          style={{ touchAction: "pan-y" }}
        >
          <div
            className="owl-stage"
            onTransitionEnd={fimTransicao}
            style={{
              // Antes do JavaScript (largura ainda desconhecida), posiciona em % para
              // o 1º banner já aparecer no lugar certo, sem salto ao carregar.
              transform: larguraItem
                ? `translate3d(${-pos * passo + desloc}px, 0px, 0px)`
                : `translate3d(${(-pos / faixa.length) * 100}%, 0px, 0px)`,
              transition: animar
                ? `all ${velocidade / 1000}s ease 0s`
                : "all 0s ease 0s",
              width: larguraItem
                ? `${Math.ceil(passo * faixa.length)}px`
                : `${faixa.length * 100}%`,
            }}
          >
            {faixa.map((s, i) => item(s, i, loop && (i < k || i >= k + total)))}
          </div>
        </div>
        <div className="owl-nav">
          <button
            type="button"
            role="presentation"
            title="Anterior"
            aria-label="Banner anterior"
            className="owl-prev"
            onClick={() => ir(pos - 1)}
          >
            <svg className="owl-arrow" viewBox="0 0 320 512" aria-hidden="true">
              <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
            </svg>
          </button>
          <button
            type="button"
            role="presentation"
            title="Próximo"
            aria-label="Próximo banner"
            className="owl-next"
            onClick={() => ir(pos + 1)}
          >
            <svg className="owl-arrow" viewBox="0 0 320 512" aria-hidden="true">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </button>
        </div>
        <div className="owl-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === ativo ? "owl-dot active" : "owl-dot"}
              aria-label={`Banner ${i + 1}`}
              onClick={() => ir(i + k)}
            >
              <span></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
