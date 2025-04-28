import { HttpRequest, send } from "schwi";

async function callAPI(): Promise<void> {
  const request = new HttpRequest.Builder("https://api.github.com")
    .build();

  const response = await send(request);
  console.log(response);
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    callAPI();
  });
});
