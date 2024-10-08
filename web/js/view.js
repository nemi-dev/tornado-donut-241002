const ul = document.querySelector("nav ul")

!((async () => {
  const response = await fetch("/list.json")

  /** @type {[string, string][]} */
  const list = await response.json()
  list.forEach(([key, title]) => {
    const li = document.createElement("li")
    const anchor = document.createElement("a")
    anchor.setAttribute("href", `/w/${key}.html`)
    anchor.append(title)
    li.append(anchor)
    ul.append(li)
  })
})())


!(() => {
  if (window.logoinit) return
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
  window.logoinit = true
})()
