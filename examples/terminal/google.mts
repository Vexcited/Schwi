import { HttpRequest, send } from "schwi";

const request = new HttpRequest.Builder("https://google.com")
  .setRedirection(HttpRequest.Redirection.FOLLOW)
  .build();

const response = await send(request);
console.log(response.headers.getSetCookie());

const body = await response.toString();
console.log(body);
