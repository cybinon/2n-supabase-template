import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socket from 'socket.io';

export class IoCustomAdapter extends IoAdapter {
  protected httpServer: any;
  constructor(app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: socket.ServerOptions) {
    const io = super.createIOServer(port, options);
    io.use(async (socket: socket.Socket, next: (...o: any) => void) => {
      // Authenticate the socket
      // socket.handshake.auth.authorization
      // socket.handshake.headers['authorization'];

      next();
    });

    return io;
  }
}
