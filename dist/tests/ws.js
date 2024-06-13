"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const stream_1 = require("stream");
const minitel_standalone_1 = require("minitel-standalone");
const image_1 = require("../components/image");
const sharp_1 = require("../converters/sharp");
const sharp_2 = __importDefault(require("sharp"));
const wss = new ws_1.WebSocketServer({ port: 8080 });
class DuplexBridge extends stream_1.Duplex {
    constructor(destinationStream, ws, opts) {
        super(opts);
        this.ws = ws;
        this.destinationStream = destinationStream;
        this.destinationStream.on('readable', () => this.push(this.destinationStream.read()));
    }
    _write(chunk, bufferEncoding, callback) {
        if (this.ws.readyState === this.ws.CONNECTING || this.ws.readyState === this.ws.OPEN) {
            this.destinationStream.write(chunk, bufferEncoding, callback);
        }
        else {
            return;
        }
    }
    _read(size) {
        return this.destinationStream.read(size);
    }
}
wss.on('connection', async function connection(ws) {
    const bridge = new DuplexBridge((0, ws_1.createWebSocketStream)(ws, { decodeStrings: false }), ws, { decodeStrings: false });
    const minitel = new minitel_standalone_1.Minitel(bridge, { statusBar: true });
    await minitel.readyAsync();
    minitel.appendChild(new image_1.Image([], { imageData: await (0, sharp_1.sharpHandler)((0, sharp_2.default)('./test.png').resize(80, 75)) }, minitel));
    // minitel.appendChild(new Image([], { imageData: defaultImg() }, minitel));
    minitel.on('frame', () => console.log('render done!'));
    minitel.queueImmediateRenderToStream();
});
wss.on('error', () => { });
wss.on('listening', () => console.log('I exist!')); //
