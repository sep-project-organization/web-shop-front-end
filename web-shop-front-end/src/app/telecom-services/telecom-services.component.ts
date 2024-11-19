import { Component, OnInit } from '@angular/core';
import { TelecomService } from '../model/telecom-service.model';
import { TelecomServiceService } from '../service/telecom-service.service';

@Component({
  selector: 'app-telecom-services',
  templateUrl: './telecom-services.component.html',
  styleUrl: './telecom-services.component.css'
})
export class TelecomServicesComponent implements OnInit {

  telecomServices: TelecomService[] = [];

  constructor(private telecomServiceService: TelecomServiceService) {}

  ngOnInit(): void {
    this.loadTelecomServices();
  }

  loadTelecomServices(): void {
    this.telecomServiceService.getAllTelecomServices().subscribe(
      (data: TelecomService[]) => {
        this.telecomServices = data;
        console.log(this.telecomServices);
      },
      (error) => {
        console.error('Error fetching telecom services', error);
      }
    );
  }
}
