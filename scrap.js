(() => {
  const scrape = () => {
    const mainSource = document.querySelector("#mw-content-text")

    /** @type {HTMLElement} */
    const main = mainSource.cloneNode(true)

    const selectToRemove = [
      "style",
      "noscript",
      ".navbox-styles",
      ".mw-editsection",
      ".mw-empty-elt",
      "[role=navigation]",
      "[role=note]",
      "[role=presentation]",
    ]
    Array.from(main.querySelectorAll(selectToRemove.join(", "))).forEach(el => el.remove())

    Array.from(main.querySelectorAll("a")).forEach(a => {
      const hrefAttr = a.getAttribute("href")
      if (hrefAttr && !hrefAttr.startsWith("#")) {
        a.setAttribute("href", a.href)
        a.setAttribute("target", "_blank")
        a.setAttribute("rel", "noreferrer noopener")
      }
    })

    Array.from(main.querySelectorAll("pre")).forEach(pre => {
      const newPre = document.createElement("pre")
      newPre.append(pre.innerText)
      pre.parentNode.insertBefore(newPre, pre)
      pre.remove()
    })

    Array.from(main.querySelectorAll(".mw-heading")).forEach(el => {
      while (el.firstElementChild) {
        el.parentNode.insertBefore(el.firstElementChild, el.nextSibling)
      }
      el.remove()
    })

    const walker = document.createTreeWalker(main, NodeFilter.SHOW_ELEMENT)

    while (walker.nextNode()) {
      /** @type {Element} */
      const el = walker.currentNode
      const attrs = Array.from(el.attributes)
      for (const attr of attrs) {
        if (!attr.value) el.removeAttribute(attr.name)
      }
    }

    main.prepend(main.querySelector(".printfooter"))

    return main.innerHTML
  }
  return scrape()
})()
