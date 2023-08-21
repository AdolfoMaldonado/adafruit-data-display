import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 0 })), // Estado inicials
      state('hidden', style({ opacity: 1 })), // Estado final
      transition('visible => hidden', animate('100ms')),
      transition('hidden => visible', animate('300ms')),
    ]),
  ],
})
export class LoginComponent {
  loginEmailError: boolean = false;
  loginPasswordError: boolean = false;
  registrationSuccess = false;
  registerNameError: boolean = false;
  registerEmailError: boolean = false;
  registerPasswordError: boolean = false;

  email: string = '';
  password: string = '';
  error: string = '';

  // Agrega propiedades para el registro
  // showLogin: boolean = true;
  showRegister: boolean = false;
  loading: boolean = false;
  registerEmail: string = '';
  registerPassword: string = '';
  registerName: string = '';
  apiKey: string = ''; // Variable para almacenar la API Key

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.loading = true;
    this.loginEmailError = false;
    this.loginPasswordError = false;

    if (!this.email) {
      this.loginEmailError = true;
      this.loading = false;
      return;
    }

    if (!this.password) {
      this.loginPasswordError = true;
      this.loading = false;
      return;
    }

    this.authService
      .login(this.email, this.password)
      .subscribe(
        (response) => {
          // Mostrar el token de acceso en la consola
          console.log('Access Token:', response.token);
          // Guardar el token de acceso en el almacenamiento local
          localStorage.setItem('access_token', response.token);
          const token: any = localStorage.getItem('access_token');
          // Llamar a la función para guardar los datos en IndexedDB
          this.guardarDatosEnIndexedDB(token);
          // Redirigir al usuario a la página principal u otra página deseada
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Mostrar el mensaje de error en caso de fallar el inicio de sesión
          this.error = error.error.message;
        }
      )
      .add(() => {
        this.loading = false; // Ocultar el spinner cuando se complete el registro
      });
  }

  register(): void {
    // Lógica para registrar al usuario aquí
    console.log('Registrando usuario...');
    console.log('Name:', this.registerName);
    console.log('Email:', this.registerEmail);
    console.log('Password:', this.registerPassword);

    this.registerNameError = false;
    this.registerEmailError = false;
    this.registerPasswordError = false;

    if (!this.registerName) {
      this.registerNameError = true;
      return;
    }

    if (!this.registerEmail) {
      this.registerEmailError = true;
      return;
    }

    if (!this.registerPassword) {
      this.registerPasswordError = true;
      return;
    }

    this.authService
      .register(this.registerName, this.registerEmail, this.registerPassword)
      .subscribe(
        (response) => {
          console.log('Usuario registrado exitosamente:', response);
          this.registrationSuccess = true;
          this.showRegister = false;
          this.router.navigate(['/login']);
          this.showRegister = false;
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
        }
      );
  }

  backToLogin(): void {
    this.showRegister = false;
  }

  logout(): void {
    // Remover el token de acceso del almacenamiento local
    localStorage.removeItem('access_token');
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  guardarDatosEnIndexedDB(data: any) {
    // ...
  }

  emitirEventoActualizacion() {
    // ...
  }
}
