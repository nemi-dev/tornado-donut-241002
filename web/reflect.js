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
 * @param {HTMLScriptElement} je 
 */
function reflect(je) {
  let js = je.innerText

  js = js
    .replace(/^\s*function\s+[\d\w_]+\s*\(\)\s*\{/, "")
    .replace(/\}\s*$/, "");
  js = __truncateLine(js)

  const pre = document.createElement("pre")
  pre.dataset["filename"] = "<script>"

  const code = document.createElement("code")
  code.classList.add("lang-javascript")

  code.append(js)

  pre.append(code)
  je.parentElement.insertBefore(pre, je.nextElementSibling)
}