/**
 *  gggls.js
 *
 */
async function loadJson(path) {
  const uri = new URL(path, location.href);
  const resp = await fetch(uri.toString());
  const dat = await resp.json();
  return dat;
}

function isstr(s) {
  return typeof s === "string" || s instanceof String;
}

function ggl(sw, gl, lr, hl) {
  const base = "https://www.google.com/search";
  let query = [];

  if (isstr(sw) && sw.length > 0) {
    const words = sw
      .replaceAll("　", " ")
      .split(" ")
      .map(s => encodeURI(s))
      .join("+");
    query.push(`q=${words}`);
  } else {
    return;
  }

  if (isstr(gl) && gl.length == 2) {
    query.push(`gl=${gl.toLowerCase()}`);
  }
  if (isstr(lr) && lr.length == 2) {
    query.push(`lr=lang_${lr.toLowerCase()}`);
  }
  if (isstr(hl) && hl.length == 2) {
    query.push(`hl=${hl.toLowerCase()}`);
  }

  const uri = `${base}?${query.join("&")}`;
  //console.log(`URI: ${uri}`);
  window.open(uri);
}


window.onload = async function() {
  const input_sw = document.getElementById("sw");
  const slct_gl = document.getElementById("gl");
  const slct_lr = document.getElementById("lr");
  const slct_hl = document.getElementById("hl");

  const cclist = await loadJson('./res/json/cc.json');
  const lrlist = await loadJson('./res/json/lr.json');
  const hllist = await loadJson('./res/json/hl.json');

  cclist.forEach((cc) => {
    const lbl = `${cc.cc}: ${cc.en} - ${cc.ja}`;
    slct_gl.options[slct_gl.options.length] = new Option(lbl, cc.cc);
  });
  lrlist.forEach((dat) => {
    const lbl = `${dat.lr}: ${dat.en} - ${dat.ja}`;
    slct_lr.options[slct_lr.options.length] = new Option(lbl, dat.lr);
  });
  hllist.forEach((dat) => {
    const lbl = `${dat.hl}: ${dat.en} - ${dat.ja}`;
    slct_hl.options[slct_hl.options.length] = new Option(lbl, dat.hl);
  });

  document.getElementById("ggl").addEventListener("click", () => {
    ggl(
      input_sw.value,
      slct_gl.value,
      slct_lr.value,
      slct_hl.value
    );
  });
  document.getElementById("btn-reset").addEventListener("click", () => {
    slct_gl.value = "";
    slct_lr.value = "";
    slct_hl.value = "";
  });
  document.getElementById("btn-en-us").addEventListener("click", () => {
    slct_gl.value = "US";
    slct_lr.value = "en";
    slct_hl.value = "en";
  });
  document.getElementById("btn-ja-jp").addEventListener("click", () => {
    slct_gl.value = "JP";
    slct_lr.value = "ja";
    slct_hl.value = "ja";
  });
  document.getElementById("btn-fr-fr").addEventListener("click", () => {
    slct_gl.value = "FR";
    slct_lr.value = "fr";
    slct_hl.value = "fr";
  });
  document.getElementById("btn-id-id").addEventListener("click", () => {
    slct_gl.value = "ID";
    slct_lr.value = "id";
    slct_hl.value = "id";
  });
};

