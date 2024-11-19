import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TelecomServicesComponent } from './telecom-services/telecom-services.component';

const routes: Routes = [
    {path:'', component: HomepageComponent},
    {path:'telecom-services', component: TelecomServicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
