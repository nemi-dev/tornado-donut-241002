
const LOG_BASE = Math.log(50)

let total = 0
const imageContainer = document.querySelector('#ImageContainer')
const selectedMenuName = document.querySelector('#MenuName')
const selectedMenuPrice = document.querySelector('#Price')
/** @type {HTMLElement} */
const receipt = document.querySelector("#Receipt")
const totalView = document.querySelector("#Total")

const insertBeforeHere = receipt.querySelector("hr")

function setIntense(price) {
  const d = price / 30000
  const v = Math.max(-0.00004 * price + 1.5, 0.35)
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 3 * i
    const x = d * Math.cos(angle)
    const y = d * Math.sin(angle)
    receipt.style.setProperty(`--mx${i + 1}`, `${x}px`)
    receipt.style.setProperty(`--my${i + 1}`, `${y}px`)
  }
  console.log({ d, v })
  receipt.style.setProperty("--duration", v + 's')
}

function priceText(n) {
  return `${n.toLocaleString()}원`
}
function createMenu(name, menu) {
  const el = document.createElement("li")
  const img = document.createElement("img")
  img.src = `/img/udon/${name}.png`
  img.alt = name

  const nameEl = document.createElement("span")
  nameEl.append(name)

  const _priceText = priceText(menu.price)
  const priceEl = document.createElement("span")
  priceEl.append(_priceText)


  el.append(img, nameEl, priceEl)
  el.onclick = ev => {
    orderMenu(name, img.src, menu.price)

  }
  return el
}

function createMenuType(cname, menuType) {
  const summary = document.createElement("summary")
  summary.innerText = cname
  const ul = document.createElement("ul")

  for (const menuName of menuType.order) {
    const menu = menuType.byKey[menuName]
    ul.append(createMenu(menuName, menu))
  }

  const el = document.createElement("details")
  el.append(summary, ul)

  return el
}

/** 메뉴를 주문합니다. */
function orderMenu(name, imgsrc, price) {
  if (imageContainer.firstElementChild) imageContainer.removeChild(imageContainer.firstElementChild)
  selectedMenuName.innerText = name
  selectedMenuPrice.innerText = priceText(price)
  const im = document.createElement("img")
  im.classList.add("Coming")
  im.src = imgsrc
  imageContainer.append(im)
  window.setTimeout(() => im.classList.remove("Coming"), 1)

  const a = document.createElement("span")
  a.classList.add("MenuName")
  a.innerText = name

  const b = document.createElement("span")
  b.classList.add("Price")
  b.innerText = priceText(price)

  // receipt.append(a, b)
  receipt.insertBefore(a, insertBeforeHere)
  receipt.insertBefore(b, insertBeforeHere)
  total += price

  totalView.innerText = priceText(total)
  setIntense(total)
}

!((async () => {
  const udon = await fetch('/udon.json').then(res => res.json())

  const main = document.querySelector('main')
  const aside = document.querySelector('aside')

  for (const [cname, menuType] of Object.entries(udon)) {
    aside.append(createMenuType(cname, menuType))

  }
})())