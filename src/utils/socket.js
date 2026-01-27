import io from "socket.io-client";
import { BaseURL } from "./constants";

const createSocketConnection = function () {
    if (location.hostname === "localhost") { return io(BaseURL); }
    else { return io("/", { path: "/api/socket.io" }); }

}

export default createSocketConnection;