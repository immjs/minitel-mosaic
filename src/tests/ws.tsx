import { WebSocket, WebSocketServer, createWebSocketStream } from 'ws';

import { DuplexBridge } from "ws-duplex-bridge";
import { Minitel } from 'minitel-standalone';
// import { sharpHandler } from '../converters/sharp.js';
import { DefaultImg } from '../converters/default.js';
import { render } from 'minitel-react';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', async function connection(ws) {
    console.log("connection");

    const bridge = new DuplexBridge(ws, { decodeStrings: false });

    const minitel = new Minitel(bridge, { statusBar: false });

    render(<mt-xjoin widthAlign="middle"><DefaultImg /></mt-xjoin>, minitel);
});

wss.on('error', () => {});

wss.on('listening', () => console.log('I exist!'));//
