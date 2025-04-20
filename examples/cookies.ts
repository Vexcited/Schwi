import { HttpRequest, send } from "schwi";

void async function () {
  const request = new HttpRequest.Builder("https://postman-echo.com/cookies/set")
    .setUrlSearchParameter("foo1", "bar1")
    .setUrlSearchParameter("foo2", "bar2")
    .setRedirection(HttpRequest.Redirection.MANUAL)
    .build();

  const response = await send(request);
  console.log(response.headers.getSetCookie());
}();
