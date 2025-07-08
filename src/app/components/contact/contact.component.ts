import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { EmailService } from '../../email.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, GoogleMapsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm!: FormGroup;

  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild('mapWrapper', { static: false }) mapWrapper!: ElementRef;

  latitude = 33.8487; // Replace with actual latitude
  longitude = -84.31077; // Replace with actual longitude
  zoom = 14;

  successMessage: string = '';
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private emailService: EmailService) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      proposal: ['', [Validators.required]] // added proposal field here
    });
  }

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
    this.submitted = true; // Set to true to show the spinner and disable the button

    const formData = this.contactForm.value;

    this.emailService.submitForm(formData)
      .subscribe(response => {
        console.log('Form submitted successfully!', response);
        this.successMessage = 'Your website template request has been submitted successfully!';
        this.submitted = false; // Reset the submitted flag
      }, error => {
        console.error('Error submitting form', error);
        this.submitted = false; // Reset the submitted flag
    });
  }
}
