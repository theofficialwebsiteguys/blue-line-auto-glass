import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { ServicesComponent } from '../services/services.component';
import { BusinessDetailsComponent } from '../business-details/business-details.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ServicesComponent, BusinessDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
