const {json,getCookie,verifyJWT}=require("./_common.js");
exports.handler=async (event)=>{const t=getCookie(event,"lxtk");const p=t?verifyJWT(t):null;return json(200,{authenticated:!!(p&&p.role==="admin")})}
