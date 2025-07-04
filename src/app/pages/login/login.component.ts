import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // constructor(private authService: AuthService, private router: Router) {}

  // onLogin() {
  //   // Simulate login logic (you can use an AuthService)
  //   if (this.authService.login("Nayan","123")) {
  //     this.router.navigate(['/dashboard']); // Redirect to dashboard after successful login
  //   }
  // }

  loginForm!: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  role=sessionStorage.getItem('role');
  ngOnInit(): void {
    this.loginForm = this.fb.group({
     username: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', Validators.required]
    });
  }

  // Allow only digits, limit to 10 digits
onMobileInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
  this.loginForm.get('username')?.setValue(input.value, { emitEvent: false });
}

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}


onSubmit(): void {
  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        sessionStorage.setItem('username', this.loginForm.value.username);

        Swal.fire({
          iconHtml: '<i class="bi bi-check-circle-fill" style="font-size: 48px; color: #4CAF50;"></i>',
          title: '<h2>लॉगिन यशस्वी!</h2>',
          html: '<p>तुमचे खाते यशस्वीरित्या लॉगिन झाले आहे.<br>पुढे चालू ठेवण्यासाठी "Continue" वर क्लिक करा.</p>',
          showConfirmButton: true,
          confirmButtonText: 'Continue',
          confirmButtonColor: '#4CAF50',
          width: window.innerWidth <= 768 ? '90%' : '400px',
          customClass: {
            popup: 'rounded-4 p-4',
            title: 'mb-2',
            htmlContainer: 'mb-3'
          }
        }).then(() => {
          const parsedRes = JSON.parse(res);
          sessionStorage.setItem('role', parsedRes.role);

          // Redirect based on cropsAdded flag
          if(parsedRes.role!='2'){
            this.router.navigate(['/features/farmer-history']);
          }else{
           if (parsedRes.cropsAdded) {
            this.router.navigate(['/features/dashboard']);
          } else {
            this.router.navigate(['/crops']);
          }
          }
         
        });
      },
      error: (err) => {
        let title = 'त्रुटी';
        let text = 'काहीतरी चुकले आहे. कृपया पुन्हा प्रयत्न करा.';
        
        if (err.status === 401) {
          title = 'लॉगिन अयशस्वी';
          text = 'मोबाईल क्रमांक किंवा पासवर्ड चुकीचा आहे.';
        } else if (err.status === 0) {
          title = 'सर्व्हरशी संपर्क होत नाही';
          text = 'कृपया तुमचे इंटरनेट कनेक्शन तपासा.';
        }

        Swal.fire({
          icon: 'error',
          title: title,
          text: text,
          confirmButtonColor: '#d33',
          width: this.isMobile() ? '90%' : '400px',
          padding: '2em',
          timer: 3000,
          timerProgressBar: true,
        });

        console.error('Login error:', err);
      }
    });
  } else {
    // Mark fields as touched to show validation errors
    this.loginForm.markAllAsTouched();

    Swal.fire({
      icon: 'warning',
      title: 'Invalid Form',
      text: 'कृपया सर्व आवश्यक माहिती नीट भरा.',
      confirmButtonColor: '#f0ad4e',
      width: this.isMobile() ? '90%' : '400px',
      padding: '2em',
    });
  }
}



  // Helper function to detect mobile screen
  isMobile(): boolean {
    return window.innerWidth <= 768; // Consider it mobile if screen width is 768px or less
  }


  goToRegister() {
    this.router.navigate(['/register']);
  }
}
