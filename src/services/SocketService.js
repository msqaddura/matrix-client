import io from 'socket.io-client';
const SOCKET_URL = process.env.SOCKET_URL;
/**
 * handle the socket here, 
 * only App ill call connect & join while other componenents can sendMessage
 */
class SocketService {
  socket;
  //using this alone will leak
  connect() {
      //disable reconnection, for gracefulness
      return (this.socket = io(SOCKET_URL, { reconnection: false }));
  }
  join(username) {
      return this.socket.emit('join', username);
  }
  sendMessage(message) {
      this.socket.emit('message', message);
  }
  leave() {
      this.socket.emit('leave');
  }
  clearAll() {}
}

export let socketService = new SocketService();
