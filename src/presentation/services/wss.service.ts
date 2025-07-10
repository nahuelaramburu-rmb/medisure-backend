import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { JwtAdapter } from '../../config';
import { prisma } from '../../data/postgres';

interface Options {
  server: Server;
  path?: string;
}


interface ChatWebSocket extends WebSocket {
  roomId?: string;
  userId?: string;
}

export class WssService {

  private static _instance: WssService;
  private wss: WebSocketServer;

  private constructor( options: Options ) {
    const { server, path = '/ws' } = options; /// ws://localhost:3000/ws

    this.wss = new WebSocketServer({ server, path });
    this.start();
  }

  static get instance(): WssService {
    if ( !WssService._instance ) {
      throw 'WssService is not initialized';
    }

    return WssService._instance;
  }

  static initWss( options: Options ) {
    WssService._instance = new WssService(options);
  }


  public sendMessage( type: string, payload: Object ) {
    this.wss.clients.forEach( client => {
      if ( client.readyState === WebSocket.OPEN ) {
        client.send( JSON.stringify({ type, payload }) );
      }
    })
  }


  public start() {
    this.wss.on('connection', (ws: WebSocket) => {
      const chatWs = ws as ChatWebSocket;

      console.log('Client connected');

      chatWs.on('message', async (data) => {
        try {
          const { type, payload } = JSON.parse(data.toString());
          
          
          
          chatWs.userId = payload.userId;

          
          if (type === 'join_room') {
            chatWs.roomId = payload.roomId;
            chatWs.send(JSON.stringify({
              type: 'joined_room',
              payload: { roomId: payload.roomId }
            }));
          }

          
          if (type === 'send_message') {
            this.wss.clients.forEach(client => {
              const c = client as ChatWebSocket;
              if (
                c.readyState === WebSocket.OPEN &&
                c.roomId === payload.roomId
              ) {
                c.send(JSON.stringify({
                  type: 'new_message',
                  payload: {
                    senderId: payload.userId || chatWs.userId || 'unknown',
                    roomId: payload.roomId,
                    content: payload.content,
                    sentAt: new Date().toISOString()
                  }
                }));
              }
            });
          }
        } catch (err) {
          chatWs.send(JSON.stringify({ type: 'error', payload: { message: 'Invalid message format' } }));
        }
      });

      chatWs.on('close', () => console.log('Client disconnected'));
    });
  }

}