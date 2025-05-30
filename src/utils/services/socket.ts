// You need a custom backend that speaks Socket.IO for this to work. AWS API Gateway (the backend)
// does not natively support Socket.IO's protocol (which is a custom protocol over WebSocket).
// Therefore, using Socket.IO will not work out of the box unless you build a custom backend that
// speaks the Socket.IO protocol (like a Node.js server using socket.io server-side)

// import { io, Socket } from "socket.io-client"

// const socket: Socket = io("wss://localhost:4000") // example custom server

// socket.on("connect", () => {
//   console.log("Connected with Socket.IO server")
// })

// socket.on("message", (msg) => {
//   console.log("Received message: ", msg)
// })

// export default socket