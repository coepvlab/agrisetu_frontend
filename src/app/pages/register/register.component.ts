import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],  // No need to add provideHttpClient here
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private http = inject(HttpClient);  // Inject HttpClient here

  registrationForm!: FormGroup;

  showPassword = false;

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}


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
  console.log('Form Valid:', this.registrationForm.valid);
  console.log('Form Values:', this.registrationForm.value);

  if (this.registrationForm.valid) {
    this.loader.start();
    const formData = this.registrationForm.value;

    this.authService.register(formData).subscribe({
      next: (response: any) => {
        this.loader.stop();

        if (response.status === 200) {
          Swal.fire({
            iconHtml: '<i class="bi bi-person-check-fill" style="font-size: 48px; color: #4CAF50;"></i>',
            title: '<h2>नोंदणी यशस्वी!</h2>',
            html: '<p>आपली नोंदणी यशस्वीरित्या पूर्ण झाली आहे.<br>लॉगिन करण्यासाठी "Login" वर क्लिक करा.</p>',
            showConfirmButton: true,
            confirmButtonText: 'Login',
            confirmButtonColor: '#4CAF50',
            width: window.innerWidth <= 768 ? '90%' : '400px',
            customClass: {
              popup: 'rounded-4 p-4',
              title: 'mb-2',
              htmlContainer: 'mb-3'
            }
          }).then(() => {
            this.router.navigate(['/login']);
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Alert',
            text: 'Unexpected response received.',
            confirmButtonColor: '#f0ad4e',
            width: window.innerWidth <= 768 ? '90%' : '400px',
          });
        }
      },
      error: (error) => {
        this.loader.stop();

        let errorMessage = 'काहीतरी चुकले आहे. कृपया पुन्हा प्रयत्न करा.';
        if (error.status === 400 && error.error?.message?.toLowerCase().includes('mobile')) {
          errorMessage = 'हा मोबाईल नंबर आधीच नोंदवलेला आहे.';
        }

        Swal.fire({
          icon: 'error',
          title: 'नोंदणी अयशस्वी',
          text: errorMessage,
          confirmButtonText: 'ठीक आहे',
          confirmButtonColor: '#d33',
          width: window.innerWidth <= 768 ? '90%' : '400px',
          padding: '2em',
          timer: 3000,
          timerProgressBar: true,
        });
      }
    });
  } else {
    this.registrationForm.markAllAsTouched();
    this.logFormErrors();

    Swal.fire({
      icon: 'warning',
      title: 'Invalid Form',
      text: 'कृपया सर्व आवश्यक माहिती नीट भरा.',
      confirmButtonText: 'ठीक आहे',
      confirmButtonColor: '#f0ad4e',
      width: window.innerWidth <= 768 ? '90%' : '400px',
      padding: '2em',
    });
  }
}



logFormErrors(): void {
  Object.keys(this.registrationForm.controls).forEach(field => {
    const control = this.registrationForm.get(field);
    if (control && control.invalid) {
      console.error(`Field "${field}" is invalid. Errors:`, control.errors);
    }
  });
}

onAadharInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '').slice(0, 12);
  this.registrationForm.get('aadhar')?.setValue(input.value, { emitEvent: false });
}



  goToLogin() {
    this.router.navigate(['/login']);
  }
}
