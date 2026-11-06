/**
 * O Payload passa todo webp/gif pelo sharp (por poderem ser animados) e regrava o arquivo com
 * compressão padrão, o que altera os pixels e o peso da imagem. Aqui, quando não há
 * redimensionamento/conversão pedidos, devolvemos os bytes originais: a imagem enviada no painel
 * é exatamente a que aparece no site. Recortes e tamanhos extras continuam usando o sharp normal.
 */
import fs from "node:fs/promises";
import realSharp from "sharp";

type SharpFn = typeof realSharp;

const sharpPreservaOriginal = ((input?: unknown, options?: { animated?: boolean }) => {
  const inst = realSharp(input as never, options as never);
  if (!options?.animated || !(typeof input === "string" || Buffer.isBuffer(input))) return inst;

  let alterado = false;
  for (const m of ["resize", "toFormat", "trim", "extract", "webp", "jpeg", "png", "gif", "avif"] as const) {
    const orig = (inst as unknown as Record<string, (...a: unknown[]) => unknown>)[m].bind(inst);
    (inst as unknown as Record<string, unknown>)[m] = (...a: unknown[]) => {
      alterado = true;
      return orig(...a);
    };
  }
  const toBufferOriginal = inst.toBuffer.bind(inst);
  (inst as unknown as { toBuffer: unknown }).toBuffer = async (opts?: { resolveWithObject?: boolean }) => {
    if (alterado) return toBufferOriginal(opts as never);
    const data = typeof input === "string" ? await fs.readFile(input) : (input as Buffer);
    if (!opts?.resolveWithObject) return data;
    const m = await realSharp(data, { animated: true }).metadata();
    return { data, info: { format: m.format, width: m.width, height: m.height, channels: m.channels, size: data.length } };
  };
  return inst;
}) as unknown as SharpFn;

Object.assign(sharpPreservaOriginal, realSharp);

export default sharpPreservaOriginal;
