
const LOG_BASE = Math.log(50)

/** @type {LunchMenu[]} */
let udon2;
let total = 0
const aside = document.querySelector('aside')
const imageContainer = document.querySelector('#ImageContainer')
const selectedMenuName = document.querySelector('#MenuName')
const selectedMenuPrice = document.querySelector('#Price')
/** @type {HTMLElement} */
const receipt = document.querySelector("#Receipt")

const receiptText = receipt.querySelector("#ReceiptText")
const totalView = document.querySelector("#Total")

/** @type {HTMLDialogElement} */
const newMenuDialog = document.querySelector("#NewMenu")


/** @type {Map<string, [HTMLDetailsElement, Map<string, HTMLElement>]>} */
const bm1 = new Map()

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
  receipt.style.setProperty("--duration", v + 's')
}

function priceText(n) {
  return `${n.toLocaleString()}원`
}

/** `<details>`를 만든다. */
function createDetails(summaryText) {
  const el = document.createElement('details')
  const sum = document.createElement('summary')
  sum.append(summaryText)
  el.append(sum)
  return el
}

/** 지정된 상호의, 지정된 메뉴 분류의 Details 엘리먼트를 얻거나, 없으면 만들어내서 얻는다. */
function type1(brandName, typeName) {
  let brandInfo = bm1.get(brandName)
  if (brandInfo == undefined) {
    const newBrandDetails = createDetails(brandName)
    bm1.set(brandName, brandInfo = [newBrandDetails, new Map()])
    aside.append(newBrandDetails)
  }

  const [brandDetails, typeMap] = brandInfo

  let typeUl = typeMap.get(typeName)
  if (typeUl == undefined) {
    const typeDetails = createDetails(typeName)
    typeUl = document.createElement('ul')
    typeMap.set(typeName, typeUl)
    // typeUl.append(document.createElement("ul"))
    typeDetails.append(typeUl)
    brandDetails.append(typeDetails)
  }
  
  return typeUl
}

/** 
 * 상호, 메뉴 분류, 메뉴를 전부 다 알아서 추가합니다.
 * @param {LunchMenu} menu */
function addMenu2(menu) {
  const { brand = '', type = '', name, price } = menu
  const de = type1(brand, type)
  
  const el = document.createElement("li")
  const img = document.createElement("img")
  img.src = `/img/udon/${name}.png`
  img.alt = name

  const nameEl = document.createElement("span")
  nameEl.append(name)

  const _priceText = priceText(price)
  const priceEl = document.createElement("span")
  priceEl.append(_priceText)

  el.append(img, nameEl, priceEl)
  el.onclick = ev => {
    // orderMenu(name, price)
    orderMenu(menu)
  }

  de.append(el)
  return el
}

/** 메뉴를 주문합니다.
 * @param {Object} param0 
 * @param {string} param0.name 
 * @param {number} param0.price 
 */
// function orderMenu(name, price) {
function orderMenu({name, price}) {
  if (imageContainer.firstElementChild) imageContainer.removeChild(imageContainer.firstElementChild)
  selectedMenuName.innerText = name
  selectedMenuPrice.innerText = priceText(price)
  const im = document.createElement("img")
  im.classList.add("Coming")
  im.src = `/img/udon/${name}.png`
  imageContainer.append(im)
  window.setTimeout(() => im.classList.remove("Coming"), 1)

  const a = document.createElement("span")
  a.classList.add("MenuName")
  a.innerText = name

  const b = document.createElement("span")
  b.classList.add("Price")
  b.innerText = priceText(price)

  receiptText.append(a, b)
  total += price

  totalView.innerText = priceText(total)
  setIntense(total)
}

/** 모르겠으니 아무거나 고릅니다. */
function randomChoice() {
  // if (!udon) return
  // const categoryChoice = Math.random()
  // let categoryKey;
  // if (categoryChoice < 0.6) categoryKey = "우동 & 면류"
  // else if (categoryChoice < 0.9) categoryKey = "덮밥 & 돈까스"
  // else categoryKey = "세트 & 사이드"
  
  // const category = udon[categoryKey]
  // const menuChoiceRNG = Math.random()
  // const menuIndex = Math.floor(menuChoiceRNG * category.order.length)

  // const menuChoiceKey = category.order[menuIndex]
  // const menuChoice = category.byKey[menuChoiceKey]
  const rng = Math.random()
  const randomIndex = Math.floor(rng * udon2.length)

  const menu = udon2[randomIndex]
  // return [menuChoiceKey, menuChoice]
  return [menu.name, menu]
}

document.querySelector("#RandomChoice").addEventListener("click", e => {
  const [key, menu] = randomChoice()
  // orderMenu(key, menu.price)
  orderMenu(menu)
})

!((async () => {
  udon2 = await fetch('/udon2.json').then(res => res.json())

  for (const menu of udon2) {
    addMenu2(menu)
  }

  document.querySelector('#CloseNewMenuDialog').addEventListener('click', e => {
    newMenuDialog.close()
    e.preventDefault()
  })

  /** @type {HTMLFormElement} */
  const newMenuForm = document.querySelector("#NewMenuForm")
  newMenuForm.addEventListener("submit", e => {
    const m = Object.fromEntries((new FormData(newMenuForm)).entries())
    addMenu2({name: m.menuname, price:m.menuprice, type: m.menucategory, brand: m.menubrand })
  })

  document.querySelector("#OpenNewMenuModal").addEventListener('click', e => {
    newMenuDialog.showModal()
  })
})())