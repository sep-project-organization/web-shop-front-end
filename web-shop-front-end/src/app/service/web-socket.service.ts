import { Injectable } from '@angular/core';
import { Client, Message, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Client | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {}

  connect(): void {
    const socket = new SockJS('http://localhost:8081/ws');

    this.stompClient = Stomp.over(socket);

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      const username = this.localStorageService.getUsernameFromToken();
      if (username) {
        const channel = `/topic/${username}/notifications`;
        console.log(`Subscribing to channel: ${channel}`);
        this.stompClient?.subscribe(channel, (message: Message) => {
          console.log('Notification received:', message.body);
          this.toastr.info(message.body, 'Notification', {
            timeOut: 5000,
            positionClass: 'toast-container',
          });
        });
      }
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('Disconnected from WebSocket');
    }
  }
}
