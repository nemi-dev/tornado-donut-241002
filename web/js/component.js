
let injectDevicon = () => {
  injectDevicon = null
  const linkElemet = document.createElement("link")
  linkElemet.rel = "stylesheet"
  linkElemet.type = "text/css"
  linkElemet.href = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
  document.head.prepend(linkElemet)
}

let _stacks = [
  ["web", "Web", "safari-line"],
  ["html", "HTML", "html5-plain"],
  ["css", "CSS", "css3-plain"],
  ["js", "JavaScript", "javascript-plain"],
  ["jquery", "jQuery", "jquery-plain"],
  ["nodejs", "Node.js", "nodejs-plain-wordmark"],
  ["react", "React.js", "react-original"],
  ["next", "Next.js", "nextjs-plain"],
  ["vercel", "Vercel", "vercel-original"],
  ["netlify", "Netlify", "netlify-plain"],
  ["java", "Java", "java-plain"],
  ["spring", "Spring", "spring-original"],
  ["python", "Python", "python-plain"],
  ["django", "DJango", "django-plain"],
  ["mysql", "MySQL", "mysql-original"],
  ["mongo", "MongoDB", "mongodb-plain"],
  ["postgre", "PostgreSQL", "postgresql-plain"]
]

class StacksList extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerHTML = _stacks.map(([key, title, icon]) => {
      let i = ''
      if (icon) {
        injectDevicon?.()
        i = `<i class='devicon-${icon}'></i>`
      }
      // return `<li><a href='/w/${key}.html'>${i}<span>${title}</span></a></li>`  
      return `<a href='/w/${key}.html'>${i}<span>${title}</span></a>`
    }).join('')
  }
}


class SiteLogo extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerHTML = [
      `<span class="logo-bit">bit</span>`,
      `<span class="logo-dot">.</span>`,
      `<span class="logo-nemi">nemi</span>`,
      `<span class="logo-dot">.</span>`,
      `<span class="logo-dev">dev</span>`
    ].join("")
  }
}

class SiteNav extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = 
`\
<a href="/"><site-logo></site-logo></a>
<div class="QuickFlexRow">
  <a href="./login.html" class="UseButton">Sign In</a>
  <a href="./signup.html" class="UseButton">Sign Up</a>
</div>\
`.replace(/\s+/g, " ")
  }
}

customElements.define("site-logo", SiteLogo)
customElements.define("site-nav", SiteNav)
customElements.define("stacks-list", StacksList)
