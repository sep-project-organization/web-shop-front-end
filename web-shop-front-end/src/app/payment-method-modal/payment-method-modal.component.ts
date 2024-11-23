import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentMethod } from '../model/payment-method.model';

@Component({
  selector: 'app-payment-method-modal',
  templateUrl: './payment-method-modal.component.html',
  styleUrls: ['./payment-method-modal.component.css']
})
export class PaymentMethodModalComponent {
  @Input() paymentMethods: PaymentMethod[] = [];  
  @Output() selectedPaymentMethod = new EventEmitter<PaymentMethod | null>();  

  selectedMethod: PaymentMethod | null = null;

  onSelectPaymentMethod(paymentMethod: PaymentMethod): void {
    this.selectedMethod = paymentMethod;
  }

  onDone(): void {
    this.selectedPaymentMethod.emit(this.selectedMethod);  
  }

  closeModal(): void {
    this.selectedPaymentMethod.emit(null);  
  }
}
