(() => {
  const scrape = () => {
    const mainSource = document.querySelector("#mw-content-text")

    /** @type {HTMLElement} */
    const main = mainSource.cloneNode(true)

    Array.from(main.querySelectorAll("style")).forEach(el => el.remove())
    Array.from(main.querySelectorAll("[role=navigation], .navbox-styles")).forEach(el => el.remove())

    Array.from(main.querySelectorAll("a")).forEach(a => {
      const hrefAttr = a.getAttribute("href")
      if (hrefAttr && !hrefAttr.startsWith("#")) {
        a.setAttribute("href", a.href)
        a.setAttribute("target", "_blank")
        a.setAttribute("rel", "noreferrer noopener")
      }
    })

    return main.innerHTML
  }
  return scrape()
})()
