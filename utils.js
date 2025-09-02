export const qs=(s,e=document)=>e.querySelector(s);export const qsa=(s,e=document)=>[...e.querySelectorAll(s)];
export const fmtBaht=(n)=>new Intl.NumberFormat('th-TH',{style:'currency',currency:'THB'}).format(n);
export const storage={get(k,d=null){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set(k,v){localStorage.setItem(k,JSON.stringify(v))},del(k){localStorage.removeItem(k)}};
export const html=(a,...v)=>{const s=a.reduce((x,b,i)=>x+b+(v[i]??""),"");const t=document.createElement("template");t.innerHTML=s.trim();return t.content.firstElementChild};
export function el(tag,attrs={},...children){const e=document.createElement(tag);Object.entries(attrs).forEach(([k,v])=>{if(k==="class")e.className=v;else if(k.startsWith("on")&&typeof v==="function")e.addEventListener(k.substring(2),v);else e.setAttribute(k,v)});children.flat().forEach(ch=>{if(typeof ch==="string")e.appendChild(document.createTextNode(ch));else if(ch)e.appendChild(ch)});return e}
