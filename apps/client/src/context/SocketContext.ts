import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { supabase } from "../lib/Store";

export const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL as string);


const auth = Date.now().toString(32);
supabase.auth.getSession().then((res) => {
    socket.auth = { token: auth, authorization: res.data.session?.access_token };
})


socket.on("connect", () => {
    console.log("socket connected");
});

socket.on("disconnect", () => {
    console.log("socket disconnected");
});

export const SocketContext = createContext<Socket | null>(null);
