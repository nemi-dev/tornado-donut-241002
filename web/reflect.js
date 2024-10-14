function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * 
 * @param {HTMLScriptElement | HTMLStyleElement} el 
 */
function reflect(el) {
  let txt = el.innerText
  let lang;

  if (el instanceof HTMLScriptElement) {
    let headless = txt
      .replace(/^\s*function\s+[\d\w_]+\s*\(\)\s*\{/, "")
    if (txt != headless) txt = headless.replace(/\}\s*$/, "");
    lang = "lang-javascript"
  } else {
    lang = "lang-css"
  }

  txt = __truncateLine(txt)

  const pre = document.createElement("pre")
  pre.dataset["filename"] = `<${el.tagName.toLowerCase()}>`

  const code = document.createElement("code")
  code.classList.add(lang)

  code.append(txt)

  pre.append(code)
  el.parentElement.insertBefore(pre, el.nextElementSibling)
}