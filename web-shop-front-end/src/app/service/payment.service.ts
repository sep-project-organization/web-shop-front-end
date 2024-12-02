import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../env/environment";
import { HttpClient } from "@angular/common/http";
import { PurchaseRequest } from "../model/purchase-request.model";
import { PurchaseResponse } from "../model/purchase-response.model";
import { OneDto } from "../model/one-dto.model";

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    private readonly apiUrl = `${environment.apiHost}payment`;

    constructor(private http: HttpClient) {}

    submitPayment(purchaseRequest: PurchaseRequest): Observable<OneDto> {
        return this.http.post<OneDto>(`${this.apiUrl}`, purchaseRequest);
    }
}