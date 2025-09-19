import Keycloak from 'keycloak-js';
import { environment } from './app/env/environment';

const keycloak = new Keycloak({
  url: environment.keycloakHost,
  realm: 'sep-realm',
  clientId: 'web-shop-frontend',
});

export function initKeycloak(): () => Promise<boolean> {
  return () =>
    keycloak.init({
      onLoad: 'login-required',
      pkceMethod: 'S256',
      checkLoginIframe: false,
      redirectUri: window.location.href, 
    }).then(authenticated => {
      return authenticated;
    });
}

export function getKeycloak() { return keycloak; }