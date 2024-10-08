const gotrue = new GoTrue({
  APIUrl: 'https://bit.nemi.dev/.netlify/identity',
  audience: '',
  setCookie: true,
})

const user = gotrue.currentUser()
console.log(user) // null
