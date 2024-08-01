import { WebSocket, WebSocketServer, createWebSocketStream } from 'ws';

import { Duplex, DuplexOptions } from 'stream';
import { Minitel, Paragraph, Scrollable } from 'minitel-standalone';
import { Image } from '../components/image.js';
import { sharpHandler } from '../converters/sharp.js';
import sharp from 'sharp';

const wss = new WebSocketServer({ port: 8080 });

class DuplexBridge extends Duplex { // not nice making me do this, couldve been prevented with a simple event before CLOSING ready state
    destinationStream: Duplex;
    ws: WebSocket;
    constructor(destinationStream: Duplex, ws: WebSocket, opts?: DuplexOptions) {
        super(opts);
        this.ws = ws;
        this.destinationStream = destinationStream;
        this.destinationStream.on('readable', () => this.push(this.destinationStream.read()))
    }
    _write(chunk: any, bufferEncoding: BufferEncoding, callback: (err: Error | null | undefined) => void): void {
        if (this.ws.readyState === this.ws.CONNECTING || this.ws.readyState === this.ws.OPEN) {
            this.destinationStream.write(chunk, bufferEncoding, callback);
        } else {
            return;
        }
    }
    _read(size?: number) {
        return this.destinationStream.read(size);
    }
}

wss.on('connection', async function connection(ws) {
    const bridge = new DuplexBridge(createWebSocketStream(ws, { decodeStrings: false }), ws, { decodeStrings: false })

    const minitel = new Minitel(bridge, { statusBar: true });

    await minitel.readyAsync()

    minitel.appendChild(new Image([], { imageData: await sharpHandler(sharp('./test.png').resize(80, 75)) }, minitel));
    // minitel.appendChild(new Image([], { imageData: defaultImg() }, minitel));

    minitel.on('frame', () => console.log('render done!'));
    minitel.queueImmediateRenderToStream();
});

wss.on('error', () => {});

wss.on('listening', () => console.log('I exist!'));//
