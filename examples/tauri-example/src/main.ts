import schwi, { HttpRequest } from "schwi";

async function greet() {
  const request: HttpRequest = {
    url: new URL("https://api.github.com")
  };

  const response = await schwi.send(request);
  console.log(response);
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});
