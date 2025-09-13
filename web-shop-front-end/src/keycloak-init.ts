import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:9099',
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