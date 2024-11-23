import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TelecomServicesComponent } from './telecom-services/telecom-services.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManagePaymentMethodsComponent } from './manage-payment-methods/manage-payment-methods.component';

const routes: Routes = [
    {path:'', component: HomepageComponent},
    {path:'telecom-services', component: TelecomServicesComponent},
    {path:'login', component: LoginPageComponent},
    {path:'manage-payment-methods', component: ManagePaymentMethodsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }