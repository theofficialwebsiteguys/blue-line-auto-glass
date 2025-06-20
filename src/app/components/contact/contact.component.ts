import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, GoogleMapsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  name = '';
  email = '';
  company = '';
  message = '';

  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild('mapWrapper', { static: false }) mapWrapper!: ElementRef;

  latitude = 33.8487; // Replace with actual latitude
  longitude = -84.31077; // Replace with actual longitude
  zoom = 14;

  ngAfterViewInit() {
    this.triggerMapResize();
  }

  @HostListener('window:resize')
  triggerMapResize() {
    setTimeout(() => {
      if (this.map) {
        this.map.googleMap?.setCenter({ lat: this.latitude, lng: this.longitude });
      }

      // ✅ Ensure mapWrapper is defined before modifying its styles
      if (this.mapWrapper && this.mapWrapper.nativeElement) {
        if (window.innerWidth <= 1024) {
          this.mapWrapper.nativeElement.style.position = 'relative';
          this.mapWrapper.nativeElement.style.marginTop = '200px';
        } else {
          this.mapWrapper.nativeElement.style.position = 'static';
          this.mapWrapper.nativeElement.style.marginTop = '0';
        }
      }
    }, 300);
  }

  onSubmit() {
    // Send this data somewhere or use FormBuilder if preferred
    alert('Message sent!');
  }
}
