import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../env/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    private readonly apiUrl = `${environment.apiHost}payment`;

    constructor(private http: HttpClient) {}

    submitPayment(paymentType: string): Observable<string> {
        return this.http.post<string>(`${this.apiUrl}`, paymentType);
    }
}