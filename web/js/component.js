
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



class StacksList extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    const _this = this;
    getWikiList().then(wikiList => {
      wikiList.forEach(([key, title, icon]) => {
        const item = document.createElement("li")
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
    
        item.append(anchor)
        _this.append(item)
      })
    })
  }
}

class SiteLogo extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerHTML = [
      `<span class="logo-bit">bit</span>`,
      `<span class="logo-dot">.</span>`,
      `<span class="logo-nemi">nemi</span>`,
      `<span class="logo-dot">.</span>`,
      `<span class="logo-dev">dev</span>`
    ].join("")
  }
}

class SiteNav extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = 
`\
<div>
  <a href="/"><site-logo></site-logo></a>
</div>
<div class="QuickFlexRow">
  <a href="./login.html">Sign In</a>
  <a href="./signup.html">Sign Up</a>
</div>\
`.replace(/\s+/g, " ")
  }
}

customElements.define("site-logo", SiteLogo)
customElements.define("site-nav", SiteNav)
customElements.define("stacks-list", StacksList)
