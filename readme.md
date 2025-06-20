# ExpressJS Websocket example

Use `http://localhost:3000/websocket` in browser.

```js
app.use('/websocket', express.static(__dirname));
```

OR

Use `http://localhost:3000` in browser.

```js
app.use(express.static(__dirname));
```

For https use wss instead of ws in html file

```js
const socket = new WebSocket('wss://website.com/websocket');
```