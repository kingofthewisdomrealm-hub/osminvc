(() => {
  const toggle = document.querySelector("[data-menu]");
  const form = document.querySelector("[data-note-form]");
  const status = document.querySelector("[data-form-status]");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const kind = String(data.get("kind") || "Note").trim();
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      if (status) status.textContent = "Name, email, and a short note are required.";
      return;
    }
    const subject = encodeURIComponent(`OSMIN — ${kind}${company ? ` — ${company}` : ""}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}${company ? `\n${company}` : ""}\n${kind}`);
    if (status) status.textContent = "Opening your mail client. If nothing appears, write oscar@oscarearias.com.";
    window.location.href = `mailto:oscar@oscarearias.com?subject=${subject}&body=${body}`;
    form.reset();
  });
})();
