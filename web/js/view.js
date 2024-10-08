'use strict'

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

!(async () => {
  const ul = document.querySelector("nav ul")
  wiki(ul)
})()


!(() => {
  const logos = document.querySelectorAll(".logo")

  logos.forEach(el => {
    el.innerHTML = [
      `<span class="logo-bit">bit</span>`,
      `<span class="logo-dot">.</span>`,
      `<span class="logo-nemi">nemi</span>`,
      `<span class="logo-dot">.</span>`,
      `<span class="logo-dev">dev</span>`
    ].join("")
  })
})()
