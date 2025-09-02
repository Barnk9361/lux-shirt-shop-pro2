const { json } = require("./_common.js");

exports.handler = async () => {
  try {
    const mod = await import("@netlify/blobs");
    const store = mod.getStore({ name: "diagnostics" });
    await store.set("ping", JSON.stringify({ t: Date.now() }));
    const v = await store.get("ping");
    return json(200, {
      hasModule: true,
      canWrite: !!v
    });
  } catch (e) {
    return json(200, {
      hasModule: false,
      error: e.message
    });
  }
};
