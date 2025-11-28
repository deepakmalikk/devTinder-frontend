import {io} from "socket.io-client";
import { baseURL } from "./constent";



export const createSocketConnection = () => {
    
    return io(baseURL);
}