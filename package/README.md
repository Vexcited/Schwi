# Schwi

## Motivation

While building JS/TS librairies for [LiterateInk](https://github.com/LiterateInk) and [Papillon](https://github.com/PapillonApp/Papillon), I had a lot of issues concerning compatibility across runtimes.

Let's see an example about `Set-Cookie` headers.

```javascript
// Browsers, Bun, Deno, Node.js
new Headers([
  ["Set-Cookie", "hello=1"],
  ["Set-Cookie", "world=2"],
]).getSetCookie();
// This simply works, we get the following.
// > ["hello=1", "world=2"]

// React Native
new Headers([
  ["Set-Cookie", "hello=1"],
  ["Set-Cookie", "world=2"],
]).getSetCookie();
// This does NOT work because they're using
// https://www.npmjs.com/package/whatwg-fetch
// and `getSetCookie` is not implemented there.
// You can fix this by using the following code instead:
new Headers([
  ["Set-Cookie", "hello=1"],
  ["Set-Cookie", "world=2"],
]).get("Set-Cookie");
// > "hello=1, world=2"
// Now this works, but as you can see the output is not the same...
// We have to handle this properly !
```

So we have to use different code for React Native and the rest of the runtimes
and also handle the fact that the output is not the same !
As you can see, this is very frustrating.

Now let's query an API that is not allowing CORS through Tauri.

```javascript
// Tauri
const response = await fetch("https://api.example.com");
// > Error: CORS
// To fix this issue, you have to instead use the
// `fetch` API from official Tauri plugins.

// Node.js, Bun, Deno, React Native
const response = await fetch("https://api.example.com");
// > 200 OK
// Simply works !
```

Now you can see that the CORS policy is not the same across runtimes.
It's completely normal and compliant behavior, but it can be frustrating when you want to
build a cross-platform library that should work everywhere.

**Note that you should really only use this library if you want to build a cross-platform library which needs to either interact with `Set-Cookie` headers (such as `Set-Cookie`), either manipulate request headers (such as `User-Agent`, `Origin` or `Referer`) or simply ignore CORS.**

The goal of this library is to provide a consistent API across runtimes.
This means that you can use the same HTTP API across all runtimes, and it will behave the same way.

## Features

- Implements a working `getSetCookie` function on `HeaderMap`, [even on React Native](https://github.com/facebook/react-native/issues/47049)
- [Tauri's native HTTP plugin](https://tauri.app/plugin/http-client/) is automatically used when available
- Uses [`undici`](https://github.com/nodejs/undici) on Bun to [prevent strange headers issues](https://github.com/oven-sh/bun/issues/4529#issuecomment-2611447527)
- Provides optional `toXML()` and `toHTML()` helpers in `HttpResponse` for easier access with other packages, see [installation section to enable those](#optional-features)
- Uses a [native implementation of `fetch`](https://github.com/Vexcited/react-native-real-fetch) on React Native

## Installation

### Node.js, Deno

```sh
pnpm add schwi
```

### Bun

```sh
bun add schwi undici
```

### Tauri

You should setup Tauri's HTTP plugin first, see <https://tauri.app/plugin/http-client/> for more details.

```sh
pnpm tauri add http
pnpm add schwi
```

### React Native

> [`react-native-real-fetch`](https://github.com/Vexcited/react-native-real-fetch) is required to use features that are not supported by the default `fetch` implementation in React Native. `react-native-nitro-modules` is required to build `react-native-real-fetch` properly.

#### Bare

```sh
npm add schwi react-native-real-fetch@0.1.3 react-native-nitro-modules@^0.29.3
cd ios && pod install
```

#### Expo

```sh
npx expo add react-native-real-fetch@0.1.3 react-native-nitro-modules@^0.29.3
npm add schwi
npx expo prebuild
```

### Optional Features

```sh
# Enables `HttpResponse.toHTML()`, otherwise you'll get an error during runtime.
pnpm add cheerio

# Enables `HttpResponse.toXML()`, otherwise you'll get an error during runtime.
pnpm add fast-xml-parser
```

## Usage

```typescript
import { HttpRequest, send } from "schwi";

const request = new HttpRequest.Builder("https://postman-echo.com/cookies/set")
  .setUrlSearchParameter("foo1", "bar1")
  .setUrlSearchParameter("foo2", "bar2")
  .setRedirection(HttpRequest.Redirection.MANUAL)
  .build();

const response = await send(request);
console.log(response.headers.getSetCookie());

const body = await response.toString();
console.log(body);
```

You can browse the [`examples` folder](./examples/) to see how to use the library in different runtimes.
