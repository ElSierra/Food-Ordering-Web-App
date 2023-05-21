import { Manager } from "socket.io-client";

const manager = new Manager("https://api.ojoisaac.me");
const socket = manager.socket("/");


export default socket;
