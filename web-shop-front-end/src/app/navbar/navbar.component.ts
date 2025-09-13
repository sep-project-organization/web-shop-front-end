import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';
import { getKeycloak } from '../../keycloak-init';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService 
  ) {}

  /*logout(): void {
    this.localStorageService.removeToken(); 
    this.router.navigate(['/login']); 
  }*/

    logout() {
      getKeycloak().logout({ redirectUri: window.location.origin });
    }

  isLoggedIn(): boolean {
    return this.localStorageService.getToken() !== null;  
  }
      
  public homepage() {}
}
