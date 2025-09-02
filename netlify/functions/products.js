const {json,parseBody,getCookie,verifyJWT,getStore}=require("./_common.js");
exports.handler=async (event)=>{const store=await getStore("products");if(event.httpMethod==="GET"){const keys=await store.list();const items=[];for(const k of keys){const p=await store.get(k);if(p)items.push(p)}return json(200,items)}
const token=getCookie(event,"lxtk");const isAdmin=!!(token&&verifyJWT(token));if(!isAdmin)return json(401,{error:"Unauthorized"});
if(event.httpMethod==="POST"){const p=parseBody(event);if(!p.id||!p.name)return json(400,{error:"Missing id or name"});await store.set(p.id,p);return json(200,{ok:true,product:p})}
if(event.httpMethod==="PUT"){const p=parseBody(event);if(!p.id)return json(400,{error:"Missing id"});await store.set(p.id,p);return json(200,{ok:true,product:p})}
if(event.httpMethod==="DELETE"){const id=new URLSearchParams(event.queryStringParameters||{}).get("id");if(!id)return json(400,{error:"Missing id"});await store.del(id);return json(200,{ok:true})}
return json(405,{error:"Method Not Allowed"})}
