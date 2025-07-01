document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const fields = ["name", "email", "phone", "subject", "message"];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9\s()+-]*$/;

  form.addEventListener("submit", e => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    const values = fields.reduce((acc, f) => {
      acc[f] = form[f].value.trim();
      return acc;
    }, {});

    if (!values.name) { valid=false; markError("name","Name is required."); }
    if (!values.email) { valid=false; markError("email","Email is required."); }
    else if (!emailPattern.test(values.email)) { valid=false; markError("email","Valid email required."); }
    if (values.phone && !phonePattern.test(values.phone)) { valid=false; markError("phone","Numbers/+, -, () only."); }
    if (!values.subject) { valid=false; markError("subject","Subject is required."); }
    if (!values.message) { valid=false; markError("message","Message can’t be empty."); }

    if (valid) {
      form.reset();
      document.getElementById("successMsg").textContent = "✅ Your message has been sent!";
      setTimeout(() => document.getElementById("successMsg").textContent = "", 6000);
    }
  });

  function markError(field, msg) {
    const el = document.getElementById(field);
    el.classList.add("invalid");
    document.getElementById(field + "Error").textContent = msg;
  }

  function clearErrors() {
    fields.forEach(f => {
      document.getElementById(f).classList.remove("invalid");
      document.getElementById(f + "Error").textContent = "";
    });
    document.getElementById("successMsg").textContent = "";
  }
});
