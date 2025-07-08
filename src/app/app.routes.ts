import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WarrantyComponent } from './components/warranty/warranty.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesPageComponent } from './components/services-page/services-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'warranty', component: WarrantyComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'about', component: AboutComponent},
    { path: 'services', component: ServicesPageComponent},
];
