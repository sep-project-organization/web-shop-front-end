import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../env/environment";
import { TelecomService } from "../model/telecom-service.model";

@Injectable({
    providedIn: 'root',
})
export class TelecomServiceService {
    private readonly apiUrl = `${environment.apiHost}telecom-services`;

    constructor(private http: HttpClient) {}

    getAllTelecomServices(): Observable<TelecomService[]> {
        return this.http.get<TelecomService[]>(`${this.apiUrl}`);
    }
}