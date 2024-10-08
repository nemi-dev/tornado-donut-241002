/** This should be deferred. */

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
