import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { TelecomServicesComponent } from './telecom-services/telecom-services.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './service/auth-interceptor.service';
import { ManagePaymentMethodsComponent } from './manage-payment-methods/manage-payment-methods.component';
import { MatIconModule } from '@angular/material/icon';
import { PaymentMethodModalComponent } from './payment-method-modal/payment-method-modal.component';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';
import { FailedComponent } from './failed/failed.component';
import { WebSocketService } from './service/web-socket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    TelecomServicesComponent,
    LoginPageComponent,
    ManagePaymentMethodsComponent,
    PaymentMethodModalComponent,
    SuccessComponent,
    ErrorComponent,
    FailedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    WebSocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
