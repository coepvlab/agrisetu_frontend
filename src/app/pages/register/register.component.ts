import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],  // No need to add provideHttpClient here
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private http = inject(HttpClient);  // Inject HttpClient here

  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      aadhar: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
      gatNumber: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      taluka: ['', Validators.required],
      village: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      address: ['', Validators.required],
      role_id:['',Validators.required]
    });
  }
  
 onSubmit(): void {
  if (true) {
    this.loader.start(); // Show loader

    const formData = this.registrationForm.value;
    this.authService.register(formData).subscribe(
      (response: any) => {
        this.loader.stop(); // Stop loader

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'नोंदणी यशस्वी झाली!',
            text: response.message,
            width: '350px',
            padding: '1.5em',
            backdrop: true,
            customClass: {
              popup: 'swal2-rounded'
            }
          }).then(() => {
            this.router.navigate(['/login']);
          });
        } else {
          // unexpected but safe fallback
          Swal.fire({
            icon: 'warning',
            title: 'Alert',
            text: 'Unexpected response received.',
            width: '90%',
          });
        }
      },
      (error) => {
        this.loader.stop();
        console.error('Registration error:', error);

        Swal.fire({
          icon: 'error',
          title: 'नोंदणी अयशस्वी',
          text: error.error?.message || 'काहीतरी चुकले आहे. कृपया पुन्हा प्रयत्न करा.',
          confirmButtonText: 'OK',
          width: '90%',
        });
      }
    );
  } else {
    this.registrationForm.markAllAsTouched();
  }
}



  goToLogin() {
    this.router.navigate(['/login']);
  }
}
