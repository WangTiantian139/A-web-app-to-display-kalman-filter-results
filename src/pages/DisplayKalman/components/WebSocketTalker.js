/** REVIEW You should replace wspath with your own webset domain or simply IP:port
 * Use wss for https server or use ws for http server, donot forget to configure
 * nginx, for instance, /usr/local/nginx/conf/vhost/example.com.conf should
 * be changed properly.
 **/
// const wspath = "ws://127.0.0.1:4242/display-kalman"
const wspath = "wss://example.com/wss-display-kalman"

const wsstate = {
  response: [],
  rescnt: 0,
  command: "",
  recntctr: 1
}

WebSocket.prototype.checkConnection = function () {
  if (this.socket.readyState !== 1 && wsstate.recntctr <= 3) {
    console.log(`socket: tried to reconnect for the ${wsstate.recntctr} time`)
    this.init()
    wsstate.recntctr += 1
  } else if (wsstate.recntctr > 3) {
    console.log(
      `socket: tried to reconnect for ${wsstate.recntctr} times but failed, closed`
    )
    this.socket.onclose = this.close()
  } else { }
}
WebSocket.prototype.destroy = function () {
  this.onclose = function () {
    console.log("socket: closed")
  }
  this.close()
}
WebSocket.prototype.init = function (onMethods) {
  if (typeof WebSocket === "undefined") {
    alert("您的浏览器不支持socket")
  }
  this.onopen = onMethods.onopen
  this.onerror = onMethods.onerror
  this.onmessage = onMethods.onmessage
}

WebSocket.prototype.sendCommand = function (inputitem) {
  wsstate.command = JSON.stringify(inputitem)
  console.log(`socket: message is going to be sent: ${wsstate.command}`)
  this.send(wsstate.command)
}

const onMethods = {
  // 监听socket连接
  onopen: function () {
    console.log("socket: connected")
  },
  // 监听socket错误信息
  onerror: function () {
    console.log("socket: error")
  },
  // 监听socket消息
  onmessage: function (msg) {
    wsstate.response = JSON.parse(msg.data)
    wsstate.rescnt += 1
    console.log(`socket: get message, the message is : ${wsstate.rescnt}`)
  }
}

export default {
  WebSocket,
  onMethods,
  wspath,
  wsstate
}
