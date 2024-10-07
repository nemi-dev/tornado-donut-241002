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

export async function doSignup({ username, password }) {
  const result = await auth.signup(username, password)
  return result
}

