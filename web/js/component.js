const el = (eltype, classList, children) => {
  const _el = document.createElement(eltype);
  _el.classList.add(...classList)
  _el.append(...children)
  return _el;
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
<div>
  <a href="/"><site-logo></site-logo></a>
</div>
<div class="QuickFlexRow">
  <a href="./login.html">Sign In</a>
  <a href="./signup.html">Sign Up</a>
</div>\
`.replace(/\s+/g, " ")
  }
}

customElements.define("site-logo", SiteLogo)
customElements.define("site-nav", SiteNav)
