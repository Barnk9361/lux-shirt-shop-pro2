const {json,setCookie}=require("./_common.js");
exports.handler=async (event)=>{if(event.httpMethod!=="POST")return json(405,{error:"Method Not Allowed"});const cookie=setCookie("lxtk","",{maxAge:0,httpOnly:true,secure:true,sameSite:"Lax",path:"/"});return json(200,{ok:true},{"Set-Cookie":cookie})}
