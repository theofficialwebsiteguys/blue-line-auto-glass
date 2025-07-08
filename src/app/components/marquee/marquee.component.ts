import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-marquee',
  imports: [],
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.scss'
})
export class MarqueeComponent {
  @Input() text: string = 'Valleywide • Veteran Owned & Operated • Same-Day Mobile Auto Glass Service • Call (602) 237-6130';


}
