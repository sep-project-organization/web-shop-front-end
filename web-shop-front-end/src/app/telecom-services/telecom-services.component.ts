import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { TelecomService } from '../model/telecom-service.model';
import { TelecomServiceService } from '../service/telecom-service.service';
import { PaymentMethod } from '../model/payment-method.model';
import { PaymentMethodsService } from '../service/payment-methods.service';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-telecom-services',
  templateUrl: './telecom-services.component.html',
  styleUrls: ['./telecom-services.component.css']
})
export class TelecomServicesComponent implements OnInit {
  telecomServices: TelecomService[] = [];
  paymentMethods: PaymentMethod[] = [];
  showPaymentModal: boolean = false;  

  selectedPaymentMethod: PaymentMethod | null = null; 

  selectedTelecomService: TelecomService | undefined;

  constructor(
    private telecomServiceService: TelecomServiceService,
    private paymentMethodService: PaymentMethodsService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.loadTelecomServices();
  }

  loadTelecomServices(): void {
    this.telecomServiceService.getAllTelecomServices().subscribe(
      (data: TelecomService[]) => {
        this.telecomServices = data;
      },
      (error) => {
        console.error('Error fetching telecom services', error);
      }
    );
  }

  onBuyService(telecomService: TelecomService): void {
    this.loadPaymentMethods();  
    this.showPaymentModal = true;
    this.selectedTelecomService = telecomService;
  }

  loadPaymentMethods(): void {
    this.paymentMethodService.getAllSupportedPaymentMethods().subscribe(
      (methods: PaymentMethod[]) => {
        this.paymentMethods = methods;
      },
      (error) => {
        console.error('Error fetching payment methods', error);
      }
    );
  }

  onPaymentMethodSelected(paymentMethod: PaymentMethod | null): void {
    this.selectedPaymentMethod = paymentMethod;
    if (paymentMethod) {
      console.log('Selected Payment Method:', paymentMethod);
      this.submitPayment();
    } else {
      console.log('No payment method selected');
    }
    this.closeModal(); 
  }

  submitPayment(): void {
    if (this.selectedPaymentMethod) {
      console.log('Processing payment for', this.selectedPaymentMethod);

      if (this.selectedPaymentMethod && this.selectedTelecomService) {
      const purchaseRequest = {
        paymentType: this.selectedPaymentMethod.code,
        amount: this.selectedTelecomService?.price
      }

      this.paymentService.submitPayment(purchaseRequest).subscribe(
        (response) => {
          console.log(response);
          console.log('Payment processed successfully', response);
          if (response.redirectionUrl !== null) {
            window.location.href = response.redirectionUrl
            return;
          } 
          window.location.href = response.paymentUrl;
        },
        (error) => {
          console.error('Error processing payment', error);
        }
      );
    } 
  }
  else {
      console.log('No payment method selected');
    }
  }

  closeModal(): void {
    document.body.classList.remove('modal-open');
    this.showPaymentModal = false;  
    this.selectedTelecomService = undefined; 
    this.selectedPaymentMethod = null;  
  }
}