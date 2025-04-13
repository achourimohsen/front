import { io } from "socket.io-client";

const socket = io("http://localhost:9999"); // بدل بالرابط الحقيقي للسيرفر إذا لزم

export default socket;
