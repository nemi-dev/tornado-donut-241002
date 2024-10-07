export const auth = new GoTrue({
  APIUrl: 'https://bit.nemi.dev/.netlify/identity',
  audience: '',
  setCookie: true,
})

export function getFormJSON(form) {
  const formData = new FormData(form)
  return Object.fromEntries(formData.entries())
}

export async function doLogin({ username, password }) {
  const result = await auth.login(username, password, true)
  return result
}

export async function doSignup({ username, password }) {
  const result = await auth.signup(username, password)
  return result
}

