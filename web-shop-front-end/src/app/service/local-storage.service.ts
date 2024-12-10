import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {

    private readonly tokenKey = 'authToken';

    public setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    public removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    public getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    public getAuthHeaders(): HttpHeaders {
        const token = this.getToken();
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    public getUsernameFromToken(): string | null {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return null;
    }

    const payload = token.split('.')[1];
    if (!payload) {
        return null;
    }

    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);

    return parsedPayload.username;
}
}