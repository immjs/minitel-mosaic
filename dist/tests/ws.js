import { jsx as _jsx } from "react/jsx-runtime";
import { WebSocketServer } from 'ws';
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
    render(_jsx("mt-xjoin", { widthAlign: "middle", children: _jsx(DefaultImg, {}) }), minitel);
});
wss.on('error', () => { });
wss.on('listening', () => console.log('I exist!')); //
