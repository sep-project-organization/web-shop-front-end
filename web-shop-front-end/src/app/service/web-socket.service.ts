import { Injectable } from '@angular/core';
import { Client, Message, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../env/environment';
import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Client | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private keycloakService: KeycloakService
  ) {}

  connect(): void {
    const socket = new SockJS(environment.websocketUrl);

    this.stompClient = Stomp.over(socket);

    const username = this.keycloakService.getUsername();

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
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
