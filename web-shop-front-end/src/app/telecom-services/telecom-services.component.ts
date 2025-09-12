import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { TelecomService } from '../model/telecom-service.model';
import { TelecomServiceService } from '../service/telecom-service.service';
import { PaymentMethod } from '../model/payment-method.model';
import { PaymentMethodsService } from '../service/payment-methods.service';
import { PaymentService } from '../service/payment.service';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-telecom-services',
  templateUrl: './telecom-services.component.html',
  styleUrls: ['./telecom-services.component.css'],
})
export class TelecomServicesComponent implements OnInit {
  telecomServices: TelecomService[] = [];
  paymentMethods: PaymentMethod[] = [];
  showPaymentModal: boolean = false;

  qrCodeData: string = '';
  showQRCode: boolean = false;

  selectedPaymentMethod: PaymentMethod | null = null;

  selectedTelecomService: TelecomService | undefined;

  constructor(
    private telecomServiceService: TelecomServiceService,
    private paymentMethodService: PaymentMethodsService,
    private paymentService: PaymentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTelecomServices();
  }

  loadTelecomServices(): void {
    this.telecomServiceService.getAllTelecomServices().subscribe(
      (data: TelecomService[]) => {
        this.telecomServices = data;
        console.log('loaded telecom services: ', this.telecomServices);
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

  monthlySubscription(telecomService: TelecomService): void {
    this.selectedTelecomService = telecomService;

    const purchaseRequest = {
          paymentType: 'CC',
          amount: this.selectedTelecomService?.monthlyPrice,
          telecomServiceId: this.selectedTelecomService.id!,
          monthlySubscription: true
    };

    this.paymentService.submitPayment(purchaseRequest).subscribe(
          (response) => {
            console.log(response);
            console.log('Payment processed successfully', response);
            console.log('response payment url: ', response.paymentUrl);
            timeout(1000);         
            if (response.paymentUrl === '') {
              console.log('entered 1. blok');
              this.toastr.info(response.message, 'Alert', {
                timeOut: 5000,
                positionClass: 'toast-container',
              });
              return;
            }
            if (response.paymentUrl !== null) {
              console.log('entered 4. blok');
              console.log('response: ', response.paymentUrl)
              window.location.href = response.paymentUrl;
              return;
            }
          },
          (error) => {
            console.error('Error processing payment', error);
          }
        );
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
          amount: this.selectedTelecomService?.price,
          telecomServiceId: this.selectedTelecomService.id!,
          monthlySubscription: false
        };

        this.paymentService.submitPayment(purchaseRequest).subscribe(
          (response) => {
            console.log(response);
            console.log('Payment processed successfully', response);
            console.log('response payment url: ', response.paymentUrl);
            console.log('response qr code: ', response.qrCode); 
            timeout(1000);         
            if (response.paymentUrl === '') {
              console.log('entered 1. blok');
              this.toastr.info(response.message, 'Alert', {
                timeOut: 5000,
                positionClass: 'toast-container',
              });
              return;
            }
            if (
              response.paymentUrl !== null &&
              purchaseRequest.paymentType === 'LC'
            ) {
              console.log('entered 2. blok');
              window.open(response.paymentUrl, '_blank');
              return;
            }
            if (purchaseRequest.paymentType === 'QR' && response.qrCode) {
              console.log('entered 3. blok');
              this.qrCodeData = response.qrCode;
              this.showQRCode = true;
              console.log('qr code data: ', this.qrCodeData);
              return;
            }
            if (response.paymentUrl !== null) {
              console.log('entered 4. blok');
              console.log('response: ', response.paymentUrl)
              window.location.href = response.paymentUrl;
              return;
            }
            //window.location.href = response.paymentUrl;
          },
          (error) => {
            console.error('Error processing payment', error);
          }
        );
      }
    } else {
      console.log('No payment method selected');
    }
  }

  closeModal(): void {
    document.body.classList.remove('modal-open');
    this.showPaymentModal = false;
    this.selectedTelecomService = undefined;
    this.selectedPaymentMethod = null;
    this.showQRCode = false;
    this.qrCodeData = '';
  }

  closeQRModal(): void {
    this.showQRCode = false;
    this.qrCodeData = '';
  }
}
