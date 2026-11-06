/**
 * Gera app/site.css a partir da cópia local do site original (tests/visual/prepare-ref.py,
 * servida em localhost:8080): só as regras usadas, na ordem original.
 * Uso: node scripts/build-css.mjs /tmp/site-raw.css / /sobre/ ...  e depois
 *      cat scripts/fonts.css /tmp/site-raw.css > app/site.css   (fontes Roboto no topo)
 */
// CSS usado: regras do original que se aplicam a alguma das páginas, na ORDEM original
// (folha → índice da regra), com a união dos seletores que se aplicam em cada página.
import {createRequire} from 'module';const require=createRequire(import.meta.url);const {chromium}=require('playwright');import fs from 'fs';
const [,,out,...pages]=process.argv;const base='http://localhost:8080';
const SKIP=/photoswipe|jet-woo-product-gallery|font-awesome|fontawesome|animate\.css|text-animations/;
const sheetOrder=[];const rules=new Map(); // id -> {sheet, path:[...], ctx, sels:Set, all:[...], style, kf, kfcss}
const b=await chromium.launch();
for(const w of [360,768,1280,1920]){const p=await b.newPage({viewport:{width:w,height:900}});
 for(const pg of pages){await p.goto(base+pg,{waitUntil:'networkidle'});await p.waitForTimeout(300);
  const res=await p.evaluate(()=>{const out=[];
   const test=sel=>{const s=sel.replace(/:not\(\.(elementor-active|highlighted)\)/g,'').replace(/:not\(\s*:(hover|focus|focus-visible|focus-within|active|visited|link|checked|disabled)\s*\)/g,'').replace(/\.(elementor-active|highlighted)(?![\w-])/g,'').replace(/::?(before|after|placeholder|marker|selection|-webkit-[a-z-]+|-moz-[a-z-]+)(\([^)]*\))?/g,'').replace(/:(hover|focus|focus-visible|focus-within|active|visited|link|checked|disabled)/g,'').trim()||'*';try{return !!document.querySelector(s)}catch(e){return false}};
   const sheets=[...document.styleSheets];
   sheets.forEach((s,si)=>{const txt=s.ownerNode?s.ownerNode.textContent:'';let h=0;for(let i=0;i<txt.length;i++)h=(h*31+txt.charCodeAt(i))|0;const key=s.href?s.href.replace(/\?.*$/,''):'inline:'+(s.ownerNode&&s.ownerNode.id||'')+':'+txt.length+':'+h;
    const walk=(rs,path,ctx)=>{[...rs].forEach((r,i)=>{const pth=path.concat(i);
     if(r.type===1){const all=r.selectorText.split(/,(?![^(]*\))/).map(x=>x.trim());const m=all.filter(test);if(m.length)out.push({key,path:pth,ctx,all,m,style:r.style.cssText})}
     else if(r.type===4)walk(r.cssRules,pth,(ctx?ctx+'|':'')+'@media '+r.conditionText);
     else if(r.type===12)walk(r.cssRules,pth,(ctx?ctx+'|':'')+'@supports '+r.conditionText);
     else if(r.type===7)out.push({key,path:pth,ctx,kf:r.name,css:r.cssText});})};
    try{walk(s.cssRules,[],'');out.push({sheet:key})}catch(e){}});
   return out});
  for(const r of res){if(r.sheet){if(!sheetOrder.includes(r.sheet))sheetOrder.push(r.sheet);continue}
   if(SKIP.test(r.key))continue;const id=r.key+'#'+r.path.join('.');
   let e=rules.get(id);if(!e){e={...r,sels:new Set()};rules.set(id,e)}(r.m||[]).forEach(s=>e.sels.add(s))}}
 await p.close()}
await b.close();
const cmp=(a,b)=>{const sa=sheetOrder.indexOf(a.key),sb=sheetOrder.indexOf(b.key);if(sa!==sb)return sa-sb;for(let i=0;i<Math.max(a.path.length,b.path.length);i++){const x=a.path[i]??-1,y=b.path[i]??-1;if(x!==y)return x-y}return 0};
let arr=[...rules.values()].sort(cmp);
// dedupe regras idênticas vindas de folhas inline repetidas
const seen=new Set();arr=arr.filter(r=>{if(!r.key.startsWith('inline:'))return true;const t=r.ctx+'§'+(r.kf?r.css:r.all.filter(s=>r.sels.has(s)).join(',')+'{'+r.style+'}');if(seen.has(t))return false;seen.add(t);return true});
const body=arr.filter(r=>!r.kf).map(r=>r.style).join('');
arr=arr.filter(r=>!r.kf||new RegExp('animation(-name)?:[^;}]*\\b'+r.kf+'\\b').test(body));
let css='';for(const r of arr){let c=r.kf?r.css:r.all.filter(s=>r.sels.has(s)).join(',')+'{'+r.style+'}';if(r.ctx)for(const m of r.ctx.split('|').reverse())c=m+'{'+c+'}';css+=c+'\n'}
css=css.replace(/url\(["']?(?:https?:\/\/[^/]+)?\/wp-content\/uploads\/[^)"']*\/([^/)"']+)["']?\)/g,'url("/images/$1")');
fs.writeFileSync(out,css);console.log(arr.length,'regras',(css.length/1024).toFixed(1)+'KB','folhas',sheetOrder.length);
