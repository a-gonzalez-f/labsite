import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() showMenuButton = false; // Para mostrar el botón de menú si usas un sidenav
  @Output() toggleSidenav = new EventEmitter<void>();

  logout() {
    console.log('Cerrar sesión');
    // Aquí iría la lógica real de cierre de sesión
  }
}
