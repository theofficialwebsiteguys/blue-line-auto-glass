import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../email.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm!: FormGroup;

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

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.submitted = true;
    const formData = this.contactForm.value;

    this.emailService.submitForm(formData).subscribe({
      next: (response) => {
        console.log('Form submitted successfully!', response);
        this.successMessage = 'Your request has been sent! We’ll be in touch soon.';
        this.contactForm.reset(); // ✅ Clear the form
        this.submitted = false;

        // Optionally clear message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error) => {
        console.error('Error submitting form', error);
        this.successMessage = 'There was an error. Please try again.';
        this.submitted = false;
      }
    });
  }

}
