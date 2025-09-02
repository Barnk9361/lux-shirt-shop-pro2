const {json,parseBody,getCookie,verifyJWT,getStore}=require("./_common.js");
const DEFAULTS={name:"Lux Shirt",slogan:"Premium Shirts for Everyday Confidence",logo:"/assets/lux-logo.svg",hero:{image:"/assets/hero.svg"},socials:{ig:"",fb:"",line:"",email:"",address:"",phone:""},chat:{requireVerifyName:true}};
exports.handler=async (event)=>{const store=await getStore("settings");if(event.httpMethod==="GET"){const d=await store.get("site");return json(200,d||DEFAULTS)}
if(event.httpMethod==="POST"){const token=getCookie(event,"lxtk");const isAdmin=!!(token&&verifyJWT(token));if(!isAdmin)return json(401,{error:"Unauthorized"});const body=parseBody(event);
const next={...DEFAULTS,...body,hero:{...DEFAULTS.hero,...(body.hero||{})},socials:{...DEFAULTS.socials,...(body.socials||{})},chat:{...DEFAULTS.chat,...(body.chat||{})}};await store.set("site",next);return json(200,{ok:true,settings:next})}
return json(405,{error:"Method Not Allowed"})}
