import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../env/environment";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly apiUrl = `${environment.apiHost}auth`;
    headers: HttpHeaders;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
        this.headers = this.localStorageService.getAuthHeaders();
    }

    login(loginRequest: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, loginRequest);
    }
}