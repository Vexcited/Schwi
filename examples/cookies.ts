import { HeaderMap } from "../src/headers";

void async function () {
  const url = "https://postman-echo.com/cookies/set?foo1=bar1&foo2=bar2";
  const response = await fetch(url, { redirect: "manual" });

  const headers = new HeaderMap(response.headers);
  console.log(headers.getSetCookie());
}();
