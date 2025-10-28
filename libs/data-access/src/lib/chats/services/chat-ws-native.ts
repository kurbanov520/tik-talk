import {ChatConnectionWSParams, ChatWsService} from '../interfaces/chat-ws-service.interface';

export class ChatWsNativeService implements ChatWsService{

    #socket: WebSocket | null = null;

    connect(params: ChatConnectionWSParams) {
      if(this.#socket) return

      this.#socket = new WebSocket(params.url, [params.token])

      this.#socket.onmessage = (event: MessageEvent) => {
        params.handleMessage(JSON.parse(event.data));
      }

      this.#socket.onclose = () => {
        console.log('Что вы тут делаете? Кино уже давно закончилось')
      }

    }

    sendMessage(text: string, chatId: number) {
      this.#socket?.send(JSON.stringify({
        text,
        chat_id: chatId,
      }))
    }

    disconnect() {
      this.#socket?.close()
    }


}
