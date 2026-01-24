import io from "socket.io-client";
import { BaseURL } from "./constants";

const createSocketConnection = function (){
    return io(BaseURL);
}

export default createSocketConnection;