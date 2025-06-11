import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  role=localStorage.getItem('role');
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }


 onSubmit(): void {
  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('username', this.loginForm.value.username);
        Swal.fire({
          iconHtml: '<i class="bi bi-check-circle-fill" style="font-size: 48px; color: #4CAF50;"></i>',
          title: '<h2>Success!</h2>',
          html: '<p>Your request has been completed.<br>Everything is set!</p>',
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
          localStorage.setItem('role',parsedRes.role);
          console.log(parsedRes.cropsAdded,'cropsAdded');
          if (parsedRes.cropsAdded) {
            this.router.navigate(['/features/dashboard']);
          } else {
            this.router.navigate(['/crops']);
          }
        });
      },
      error: (err) => {
        if (err.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid mobile number or password',
            confirmButtonColor: '#d33',
            width: this.isMobile() ? '90%' : '400px',
            padding: '2em',
            timer: 2000,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong',
            confirmButtonColor: '#d33',
            width: this.isMobile() ? '90%' : '400px',
            padding: '2em',
            timer: 2000,
            timerProgressBar: true,
          });
        }
        console.error(err);
      }
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
