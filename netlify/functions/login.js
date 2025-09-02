const {json,parseBody,setCookie,signJWT}=require("./_common.js");
exports.handler=async (event)=>{if(event.httpMethod!=="POST")return json(405,{error:"Method Not Allowed"});const {password}=parseBody(event);
const ok=password&&process.env.ADMIN_PASSWORD&&password===process.env.ADMIN_PASSWORD;if(!ok)return json(401,{ok:false,error:"Invalid credentials"});
const token=signJWT({role:"admin"},60*60*6);const cookie=setCookie("lxtk",token,{maxAge:60*60*6,httpOnly:true,secure:true,sameSite:"Lax",path:"/"});return json(200,{ok:true},{"Set-Cookie":cookie})}
