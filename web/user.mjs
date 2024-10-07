export const auth = new GoTrue({
  APIUrl: 'https://bit.nemi.dev/.netlify/identity',
  audience: '',
  setCookie: true,
})

export const user = auth.currentUser()
console.log(user)

export function getFormJSON(form) {
  const formData = new FormData(form)
  const obj = Object.fromEntries(formData.entries())
  console.log(obj)
  return obj
}

/**
 * @param {HTMLFormElement} form 
 * @param {boolean} enable 
 */
export function setFormEnable(form, enable) {
  const children = form.querySelectorAll("input")
  if (enable) {
    for (const el of children) {
      if (el.type === "submit") continue
      el.removeAttribute("disabled")
    }
  } else {
    for (const el of children) {
      if (el.type === "submit") continue
      el.setAttribute("disabled", "")
    }
  }
  
}

