const noop = () => { }


let injectDevicon = () => {
  injectDevicon = noop
  const linkElemet = document.createElement("link")
  linkElemet.rel = "stylesheet"
  linkElemet.type = "text/css"
  linkElemet.href = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
  document.head.prepend(linkElemet)
}

let injectSiteNav = () => {
  injectSiteNav = noop
  if (document.querySelector("site-nav")) return
  document.body.prepend(document.createElement("site-nav"))
}


function __truncateLine(chunk) {
  // const lines = codeText.nodeValue.split("\n")
  const lines = chunk.split("\n")

  let headLine;
  while ((headLine = lines.at(0)) != null) {
    if (!(headLine.trim())) lines.shift()
    else break
  }
  if (lines.length == 0) {
    // Fully empty code block
    return ""
  }

  while (!(lines.at(-1).trim())) lines.pop();

  let minimalIndentSize = null;

  /** @type {[number, string][]} */
  let processing = []

  for (const line of lines) {
    const m = line.match(/^(\s*)(.*)/)
    /**  @type {string[]} */
    let [whole, indent, content] = m

    /* empty/whitespace only line */
    if (!whole.trim()) {
      processing.push([0, whole])
      continue
    }

    indent = indent.replace(/\t/g, "  ")
    if (minimalIndentSize == null) minimalIndentSize = indent.length
    else minimalIndentSize = Math.min(minimalIndentSize, indent.length)
    processing.push([indent.length, content])
  }

  /** @type {string[]} */
  let output = []
  for (const [indentSz, content] of processing) {
    const indentApply = Math.max(indentSz - minimalIndentSize, 0)
    const indent = " ".repeat(indentApply)
    output.push(`${indent}${content}`)
  }

  const v = output.join("\n")
  return v
}


/**
 * @param {HTMLPreElement} pre 
 */
function _truncateLine(pre) {
  const codeText = pre.querySelector("code").firstChild
  if (!(codeText instanceof Text)) {
    console.log("not text")
    return
  }
  const chunk = codeText.nodeValue
  codeText.nodeValue = __truncateLine(chunk)
}

/** Process Preserve elements. */
function ppre() {
  Array.from(document.querySelectorAll("pre")).forEach(pre => _truncateLine(pre))
  if (window.hljs) window.hljs.highlightAll();
}

window.ppre = ppre


!(() => {
  injectSiteNav()
})()
