// import { useWebSocket } from "../../../contexts/shared/live-prices/live-prices.context"

// const ChatComponent = () => {
//   const { getInitialPrices } = useWebSocket();

//   const handleSend = () => {
//     getInitialPrices('sendMessage', { data: 'Hello from frontend!' });
//   };

//   const handleCloseSocket = () => {
//     getInitialPrices('closeSocket', {});
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">WebSocket Chat</h1>
//       <button onClick={handleSend} className="px-4 py-2 bg-blue-600 text-white m-2">Send Message</button>
//       <button onClick={handleCloseSocket} className="px-4 py-2 bg-red-600 text-white m-2">Close Socket</button>
//       <div className="mt-4">
//         <h2>Last message:</h2>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent
