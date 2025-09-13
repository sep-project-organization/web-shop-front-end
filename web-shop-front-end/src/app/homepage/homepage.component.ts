import { Component, OnInit } from '@angular/core';
import { getKeycloak } from '../../keycloak-init';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
 
  ngOnInit(): void {

    const kc = getKeycloak();
    const idTokenParsed = kc.idTokenParsed;  
    const accessToken = kc.token;
    const username = kc.idTokenParsed?.['preferred_username'] ?? kc.tokenParsed?.['preferred_username'];

    console.log('id token parsed: ', idTokenParsed);
    console.log('access token: ', accessToken);
    console.log('username: ', username);
  }

}
