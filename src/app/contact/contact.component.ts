import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  captchaToken: string | null = null;

  constructor(private fb: FormBuilder, private zone: NgZone) {}

  ngOnInit(): void {
    // Initialize the reactive form with required validators.
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', Validators.required]
    });

    // Set up a global callback function for reCAPTCHA.
    // The callback function name "resolvedCaptcha" must match the data-callback attribute in the HTML.
    (window as any)['resolvedCaptcha'] = (token: string) => {
      // Use NgZone.run to ensure Angular detects the change.
      this.zone.run(() => {
        console.log("Captcha resolved with token: " + token);
        this.captchaToken = token;
      });
    };
  }

  onSubmit(): void {
    if (this.contactForm.valid && this.captchaToken) {
      const formData = this.contactForm.value;
      console.log('Form Data:', formData);
      // Here you would typically send formData and captchaToken to your backend for verification.
    } else {
      console.warn('Form is invalid or captcha not resolved.');
    }
  }
}
