# praxios<!-- omit in toc -->

![npm](https://img.shields.io/npm/v/praxios)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/safe-security/praxios/Release)

A wrapper over the axios library to support corporate proxies well

## Table of Contents<!-- omit in toc -->

- [Installation](#installation)
- [Usage](#usage)
  - [Proxy without authentication](#proxy-without-authentication)
    - [Proxy with authentication](#proxy-with-authentication)
  - [Bypass proxy for hosts](#bypass-proxy-for-hosts)
  - [Customizing the axios settings or using without proxy](#customizing-the-axios-settings-or-using-without-proxy)
- [Resources](#resources)
- [Credits](#credits)
- [License](#license)

## Installation

npm:

```shell
npm install praxios
```

yarn:

```shell
yarn add praxios
```

## Usage

### Proxy without authentication

```typescript
//proxy.js
import praxios from "praxios";

proxios
 .get("/dummy")
 .then(response => {
  console.log(response.data);
 })
 .catch(error => {
  console.log(error);
 });
```

```shell
export PROXY_HOST="my-corporate-proxy.local"
export PROXY_PORT="3128"
node proxy.js
```

#### Proxy with authentication

```shell
export PROXY_HOST="my-corporate-proxy.local"
export PROXY_PORT="3128"
export PROXY_USERNAME="foo"
export PROXY_PASSWORD="bar"
node proxy.js
```

### Bypass proxy for hosts

```shell
export PROXY_HOST="my-corporate-proxy.local"
export PROXY_PORT="3128"
export NO_PROXY="host1.domain,host2.domain,1.2.3.4"
node proxy.js
```

### Customizing the axios settings or using without proxy

The library also exposes the built-in axios library for any advanced configuration or customization

```typescript
//custom.js
import { baseAxios } from "praxios";

const axios = baseAxios.create({
 httpsAgent: {},
 baseUrl: "",
});

axios
 .get("/dummy")
 .then(response => {
  console.log(response.data);
 })
 .catch(error => {
  console.log(error);
 });
```

## Resources

- [axios](https://github.com/axios/axios/)
- [tunnel](https://github.com/koichik/node-tunnel)

## Credits

`praxios` was mostly inspired out of the great work and research done by [Jan Molak](https://github.com/jan-molak/) documented very well on this blog post: [Node.js Axios behind corporate proxies](https://janmolak.com/node-js-axios-behind-corporate-proxies-8b17a6f31f9d)

## License

[MIT](LICENSE)
