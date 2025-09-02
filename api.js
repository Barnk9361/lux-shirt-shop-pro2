const jsonHeaders={"Content-Type":"application/json"};const ok=r=>{if(!r.ok)throw new Error("API "+r.status);return r.json()};
export const API={login:p=>fetch("/api/login",{method:"POST",headers:jsonHeaders,body:JSON.stringify({password:p})}).then(ok),
logout:()=>fetch("/api/logout",{method:"POST"}).then(ok),session:()=>fetch("/api/session").then(ok),
getSettings:()=>fetch("/api/settings").then(ok),updateSettings:d=>fetch("/api/settings",{method:"POST",headers:jsonHeaders,body:JSON.stringify(d)}).then(ok),
listProducts:()=>fetch("/api/products").then(ok),createProduct:p=>fetch("/api/products",{method:"POST",headers:jsonHeaders,body:JSON.stringify(p)}).then(ok),
updateProduct:p=>fetch("/api/products",{method:"PUT",headers:jsonHeaders,body:JSON.stringify(p)}).then(ok),
deleteProduct:id=>fetch(`/api/products?id=${encodeURIComponent(id)}`,{method:"DELETE"}).then(ok),
listChats:()=>fetch("/api/chats").then(ok),sendChat:payload=>fetch("/api/chats",{method:"POST",headers:jsonHeaders,body:JSON.stringify(payload)}).then(ok),
adminReply:(id,text)=>fetch(`/api/chats?action=reply`,{method:"POST",headers:jsonHeaders,body:JSON.stringify({threadId:id,text})}).then(ok)};
