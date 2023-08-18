import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  cerrarSesion() {
    localStorage.removeItem('access_token'); // Elimina el token almacenado en localStorage
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
