import {qs,qsa,fmtBaht,storage,el,html} from "./utils.js";import {API} from "./api.js";
const state={settings:null,products:[],cart:storage.get("lux_cart",[]),threadId:storage.get("lux_thread",null),customerName:storage.get("lux_name",null)};
const saveCart=()=>{storage.set("lux_cart",state.cart);renderCart();renderCartBadge()};const addToCart=p=>{const f=state.cart.find(i=>i.id===p.id);if(f)f.qty+=1;else state.cart.push({id:p.id,name:p.name,price:p.price,image:p.image,qty:1});saveCart()};
const setQty=(id,q)=>{const it=state.cart.find(i=>i.id===id);if(!it)return;it.qty=Math.max(1,q);saveCart()};const removeFromCart=id=>{state.cart=state.cart.filter(i=>i.id!==id);saveCart()};
const total=()=>state.cart.reduce((a,c)=>a+c.price*c.qty,0);function renderCart(){const list=qs("#cart-items");list.innerHTML="";state.cart.forEach(it=>{list.appendChild(html`
<div class="cart-item"><img src="${it.image}" alt="${it.name}"><div><div class="name">${it.name}</div><div class="muted">${fmtBaht(it.price)}</div></div>
<div class="qty-controls"><button class="btn outline" onclick="window._setQty('${it.id}', ${it.qty-1})">-</button><span>${it.qty}</span><button class="btn outline" onclick="window._setQty('${it.id}', ${it.qty+1})">+</button></div>
<button class="btn outline" onclick="window._remove('${it.id}')">✕</button></div>`)});qs("#cart-total").textContent=fmtBaht(total())}window._setQty=(id,q)=>setQty(id,q);window._remove=id=>removeFromCart(id);
const renderCartBadge=()=>qs("#cart-badge").textContent=String(state.cart.reduce((a,c)=>a+c.qty,0));
const productCard=p=>{const c=html`<div class="card"><img src="${p.image}" alt="${p.name}"><h4>${p.name}</h4><p class="price">${fmtBaht(p.price)}</p><button class="btn">ซื้อเลย</button></div>`;c.querySelector(".btn").addEventListener("click",()=>addToCart(p));return c}
function renderCatalog(){const g=qs("#catalog-grid");g.innerHTML="";state.products.forEach(p=>g.appendChild(productCard(p)))}
async function init(){state.settings=await API.getSettings().catch(()=>null);if(state.settings){qs("#store-name").textContent=state.settings.name??"Lux Shirt";qs("#store-slogan").textContent=state.settings.slogan??"Premium Shirts for Everyday Confidence";const h=qs("#hero-img");if(state.settings.hero?.image)h.src=state.settings.hero.image}
state.products=await API.listProducts().catch(()=>[]);if(state.products.length===0){state.products=[
{id:"lux-oxford",name:"LUX Oxford Shirt",price:1290,image:"./assets/hero.svg",description:"Oxford cotton. Everyday premium."},
{id:"lux-satin",name:"LUX Satin Shirt",price:1490,image:"./assets/hero.svg",description:"Silky smooth. Night-out ready."},
{id:"lux-linen",name:"LUX Linen Shirt",price:1390,image:"./assets/hero.svg",description:"Breathable linen. Tropical days."},
{id:"lux-stretch",name:"LUX Stretch Shirt",price:1190,image:"./assets/hero.svg",description:"Flex comfort. Smart casual."}]}
renderCatalog();renderCart();renderCartBadge();setupChat()}
function toggleDrawer(o){qs("#drawer").classList.toggle("open",o)}window._toggleDrawer=toggleDrawer;
function setupChat(){const box=qs("#chat-box"),toggle=qs("#chat-toggle");toggle.addEventListener("click",()=>box.classList.toggle("open"));
const nameGate=qs("#chat-name-gate"),form=qs("#chat-form"),input=qs("#chat-input"),messages=qs("#chat-messages");
const addMsg=(role,text)=>{const b=el("div",{class:"msg "+(role==="admin"?"admin":"user")},text);messages.appendChild(b);messages.scrollTop=messages.scrollHeight};
if(!state.customerName){nameGate.style.display="block";qs("#save-name").addEventListener("click",()=>{const n=qs("#cust-name").value.trim();if(!n){alert("กรุณาใส่ชื่อก่อนเริ่มแชท");return}state.customerName=n;storage.set("lux_name",n);nameGate.style.display="none";addMsg("admin",`ยินดีต้อนรับคุณ ${n}! มีอะไรให้ช่วยไหมครับ/คะ`)})}else{addMsg("admin",`ยินดีต้อนรับกลับมา คุณ ${state.customerName}`)}
form.addEventListener("submit",async e=>{e.preventDefault();const text=input.value.trim();if(!text)return;addMsg("user",text);input.value="";const payload={name:state.customerName??"Guest",text,threadId:state.threadId||undefined};
try{const res=await API.sendChat(payload);if(res.threadId){state.threadId=res.threadId;storage.set("lux_thread",res.threadId)}(res.messages||[]).slice(-1).forEach(m=>{if(m.role==='admin')addMsg('admin',m.text)})}catch(err){console.error(err)}})}
document.addEventListener("DOMContentLoaded",init);
