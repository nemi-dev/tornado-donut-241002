const ul = document.querySelector("nav ul")

!((async () => {
  const response = await fetch("./list.json")

  /** @type {[string, string][]} */
  const list = await response.json()
  list.forEach(([key, title]) => {
    const li = document.createElement("li")
    const anchor = document.createElement("a")
    anchor.setAttribute("href", `./${key}.html`)
    anchor.append(title)
    li.append(anchor)
    ul.append(li)
  })
})())

