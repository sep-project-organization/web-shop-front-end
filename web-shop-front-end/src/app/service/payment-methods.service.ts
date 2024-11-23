import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../env/environment";
import { HttpClient } from "@angular/common/http";
import { PaymentMethod } from "../model/payment-method.model";
import { UpdatedPaymentMethods } from "../model/updated-payment-method.model";

@Injectable({
    providedIn: 'root',
})
export class PaymentMethodsService {
    private readonly apiUrl = `${environment.apiHost}payment-methods`;

    constructor(private http: HttpClient) {}

    getAllAvailablePaymentMethods(): Observable<PaymentMethod[]> {
        return this.http.get<PaymentMethod[]>(`${this.apiUrl}/available-methods`);
    }

    getAllSupportedPaymentMethods(): Observable<PaymentMethod[]> {
        return this.http.get<PaymentMethod[]>(`${this.apiUrl}`);
    }

    //todo: videti ovo za povratne vrednosti da se regulise
    saveUpdatedPaymentMethods(updatedMethods: UpdatedPaymentMethods[]): Observable<PaymentMethod[]> {
        const url = `${this.apiUrl}`; 
        return this.http.post<PaymentMethod[]>(url, updatedMethods);
    }
}