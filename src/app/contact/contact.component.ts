import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Import RecaptchaModule from ng-recaptcha.
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-contact',
  standalone: true,
  // Include the RecaptchaModule along with CommonModule and ReactiveFormsModule.
  imports: [CommonModule, ReactiveFormsModule, RecaptchaModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  // Store the token returned when reCAPTCHA is resolved.
  captchaToken: string | null = null;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    // Initialize the reactive form with validators.
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required]
    });
  }
  
  // Called when the reCAPTCHA is resolved.
  onCaptchaResolved(token: string | null): void {
    console.log('Captcha resolved with token:', token);
    this.captchaToken = token;
  }
  
  onSubmit(): void {
    if (this.contactForm.valid && this.captchaToken) {
      console.log('Form Data:', this.contactForm.value);
      // Process your form data and captcha token (e.g., send them to your backend for validation).
    } else {
      console.warn('Form is invalid or captcha not resolved.');
    }
  }
}
