import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from './service/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'web-shop-front-end';

   constructor(private webSocketService: WebSocketService) {}

    ngOnInit(): void {
        this.webSocketService.connect();
    }

    ngOnDestroy(): void {
        this.webSocketService.disconnect();
    }
}
