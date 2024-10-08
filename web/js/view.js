let _wikiList = null

async function getWikiList() {
  if (!_wikiList) {
    const response = await fetch("/list.json")
    
    /** @type {[string, string][]} */
    const wikiList = await response.json()
    
    _wikiList = wikiList
  }

  return _wikiList
}


/**
 * @param {HTMLElement} el 
 */
async function wiki(el) {
  const wikiList = await getWikiList()

  wikiList.forEach(([key, title]) => {
    const li = document.createElement("li")
    const anchor = document.createElement("a")
    anchor.setAttribute("href", `/w/${key}.html`)
    anchor.append(title)
    li.append(anchor)
    el.append(li)
  })
}

/**
 * @param {HTMLElement} el 
 */
function logo(el) {
  el.innerHTML = [
    `<span class="logo-bit">bit</span>`,
    `<span class="logo-dot">.</span>`,
    `<span class="logo-nemi">nemi</span>`,
    `<span class="logo-dot">.</span>`,
    `<span class="logo-dev">dev</span>`
  ].join("")
}

!(async () => {
  // const ul = document.querySelector("nav ul")
  const targets = document.querySelectorAll("[wiki-list]")
  targets.forEach(wiki)
})()


!(() => {
  const logos = document.querySelectorAll(".logo")
  logos.forEach(logo)
})()
