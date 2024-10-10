const noop = () => {}
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

/**
 * @param {HTMLElement} el 
 */
async function wiki(el) {
  const wikiList = await getWikiList()

  wikiList.forEach(([key, title, icon]) => {
    const li = document.createElement("li")
    const anchor = document.createElement("a")
    anchor.setAttribute("href", `/w/${key}.html`)

    const titleSpan = document.createElement("span")
    titleSpan.append(title)
    anchor.append(titleSpan)

    if (icon) {
      injectDevicon?.()
      const iconEl = document.createElement("i")
      iconEl.classList.add(`devicon-${icon}`)
      anchor.prepend(iconEl)
    }

    li.append(anchor)
    el.append(li)
  })
}

!(async () => {
  const targets = document.querySelectorAll("[wiki-list]")
  targets.forEach(wiki)
})()


!(() => {
  injectSiteNav()
})()
