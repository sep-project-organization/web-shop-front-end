import { Component, OnInit } from '@angular/core';
import { PaymentMethodsService } from '../service/payment-methods.service';
import { PaymentMethod } from '../model/payment-method.model';
import { UpdatedPaymentMethods } from '../model/updated-payment-method.model';

@Component({
  selector: 'app-manage-payment-methods',
  templateUrl: './manage-payment-methods.component.html',
  styleUrls: ['./manage-payment-methods.component.css']
})
export class ManagePaymentMethodsComponent implements OnInit {

  availablePaymentMethods: PaymentMethod[] = [];
  supportedPaymentMethods: PaymentMethod[] = [];

  // Sadržaj akcija za svaku metodu - koristi se za praćenje dodavanja ili uklanjanja
  paymentMethodActions: UpdatedPaymentMethods[] = [];

  constructor(private paymentMethodsService: PaymentMethodsService) { }

  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  loadPaymentMethods() {
    // Učitaj dostupne metode
    this.paymentMethodsService.getAllAvailablePaymentMethods().subscribe(
      (response: any) => {
        console.log(response);
        this.availablePaymentMethods = response;
        this.loadSupportedPaymentMethods();
      },
      (error) => {
        console.log("Error loading payment methods", error);
      }
    );
  }

  loadSupportedPaymentMethods() {
    // Učitaj podržane metode
    this.paymentMethodsService.getAllSupportedPaymentMethods().subscribe(
      (response: any) => {
        console.log(response);
        this.supportedPaymentMethods = response;
      },
      (error) => {
        console.log("Error loading supported payment methods", error);
      }
    );
  }

  togglePaymentMethod(method: PaymentMethod) {

    const existingActionIndex = this.paymentMethodActions.findIndex(action => action.code === method.code);
    let newPMA = { name: method.name, code: method.code, action: ''};

    if (existingActionIndex !== -1) {
      this.paymentMethodActions.splice(existingActionIndex, 1); 
    }

    if (this.isMethodSelected(method)) {
      this.removePaymentMethod(method);

      newPMA.action='remove';

    }
    else {
      this.addPaymentMethod(method);

      newPMA.action='add';
    }

    this.paymentMethodActions.push(newPMA);

    console.log('Payment method actios: ', this.paymentMethodActions);
  }

  addPaymentMethod(method: PaymentMethod) {
    console.log('Add: ', method);
    if (!this.isMethodSelected(method)) {
      this.supportedPaymentMethods.push(method);
    }
  }

  removePaymentMethod(method: PaymentMethod) {
    console.log('Remove: ', method);
    this.supportedPaymentMethods = this.supportedPaymentMethods.filter(m => m.code !== method.code);
  }

  // Pomoćna funkcija koja proverava da li je metoda već odabrana
  isMethodSelected(method: PaymentMethod): boolean {
    return this.supportedPaymentMethods.some(m => m.code === method.code);
  }

  saveChanges() {
    console.log('Updated Payment Methods:', this.paymentMethodActions);
    this.paymentMethodsService.saveUpdatedPaymentMethods(this.paymentMethodActions).subscribe(
      (response: any) => {
        alert('Changes saved successfully!');
      },
      (error) => {
        console.log("Error saving changes", error);
      }
    );
  }
}