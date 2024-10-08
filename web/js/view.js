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
  const linkElemet = document.createElement("link")
  linkElemet.rel = "stylesheet"
  linkElemet.type = "text/css"
  linkElemet.href = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
  document.head.prepend(linkElemet)
  injectDevicon = noop
}

let injectApexNav = () => {
  const nav = document.createElement("nav")
  nav.setAttribute("apex", "")
  nav.innerHTML = `\
<div>
  <div class="logo logo-even" style="font-size: 24px;"></div>
</div>
<div class="QuickFlexRow">
  <a href="./login.html">Sign In</a>
  <a href="./signup.html">Sign Up</a>
</div>\
`.replace(/\s+/g, " ")
  document.body.prepend(nav)
  injectApexNav = noop
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
    anchor.append(title)

    if (icon) {
      injectDevicon?.()
      const iel = document.createElement("i")
      iel.classList.add(`devicon-${icon}`)
      anchor.prepend(iel)
    }

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
  if (!document.querySelector("nav[apex]")) injectApexNav()
  
  const logos = document.querySelectorAll(".logo")
  logos.forEach(logo)

})()
