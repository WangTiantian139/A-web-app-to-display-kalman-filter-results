# 一个演示卡尔曼滤波的网页

> 一个单页面应用前端，可以用来演示卡尔曼滤波效果。用到了`vuejs`, `vuetify`, `chartjs`等开源工具。
[与之配套的后端](https://github.com/WangTiantian139/A-backend-to-display-kalman-filter)
基于`python`，用到了`flask_sockets`提供 WebSocket 支持，同时用`numpy`完成科学运算。

## 如何使用

### 使用之前

在使用之前，应该正确的配置 `./src/pages/DisplayKalman/components/WebSocketTalker.js` 开始处的 `wspath`。比如：

```JavaScript
const wspath = "wss://example.com/wss-display-kalman"
```

你需要将 `example.com` 替换成你自己的网址或者服务器 `IP` 地址。否则不能建立正确的 `WebSocket` 来与前端通信。

你还要正确地配置 `nginx` 上的 `server`，确保正确地解析网址。举个例子，用 `lnmp` 建立了 `example.com` 然后你需要在 `/usr/local/nginx/conf/vhost/example.com.conf` 中添加一段：

```nginx
location = /wss-display-kalman
{
    proxy_pass http://127.0.0.1:4242/display-kalman; # 这里换成你想转发的ws服务地址即可
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header X-Real-IP $remote_addr;
}
```

这段具体含义我也不懂，大致是精确匹配 `/wss-display-kalman` 然后代理到本地端口 `127.0.0.1:4242/display-kalman`。

在调试阶段，也可以跳过上面繁琐的配置，直接在本地可以建立 `ws` 连接，比如：

```JavaScript
const wspath = "ws://127.0.0.1:4242/display-kalman"
```

或者直接使用你运行这后端服务进程的服务器 `IP`:

```JavaScript
const wspath = "ws://123.4.5.678:4242/display-kalman"
```

### 安装依赖

```bash
yarn
```

或者，如果你喜欢使用 npm

```bash
npm install
```

### 在 localhost:8080 创建一个可以热重载的服务进程

```bash
yarn dev
```

或者，如果你喜欢使用 npm

```bash
npm run dev
```

### 编译工程

```bash
yarn build
```

或者，如果你喜欢使用 npm

```bash
npm run build
```

这样就可以将 `./dist/` 目录下生成的网页文件发布到服务器上了。

---

## more about vue

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

[Build Setup](#build-setup)
