import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-business-details',
  imports: [CommonModule, GoogleMapsModule, RouterModule],
  templateUrl: './business-details.component.html',
  styleUrl: './business-details.component.scss'
})
export class BusinessDetailsComponent {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild('mapWrapper', { static: false }) mapWrapper!: ElementRef;

  latitude = 33.640220551387806; // Replace with actual latitude
  longitude = -112.17469764232841; // Replace with actual longitude
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
}
