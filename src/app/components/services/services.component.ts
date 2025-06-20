import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [RouterModule, CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  @Input() sectionLabel: string = '';
  @Input() sectionTitle: string = '';
  @Input() sectionSubtext: string = '';

  @Input() services: {
    icon: string;
    iconType?: 'image' | 'text'; // default is 'text'
    title: string;
    description: string;
    route?: string;
    data?: { name: string, role?: string, desc1?: string, desc2?: string , images?: string[] }
  }[] = [];


  @Input() buttonLabel: string = '';
  @Input() buttonLink: string = '/services'; 

  @Output() memberSelected = new EventEmitter<any>();

ngOnInit() {
  if (this.services.length && this.services[0].data) {
    this.memberSelected.emit(this.services[0].data);
  }
}

  isImage(path: string): boolean {
    return /\.(jpeg|jpg|gif|png|svg|webp)$/i.test(path);
  }

  onSelect(member: any): void {
    this.memberSelected.emit(member);
  }

  isFontAwesome(icon: string): boolean {
    return icon.includes('fa-');
  }
}
