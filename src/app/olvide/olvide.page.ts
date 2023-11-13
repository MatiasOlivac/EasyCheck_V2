import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-olvide',
  templateUrl: './olvide.page.html',
  styleUrls: ['./olvide.page.scss'],
})
export class OlvidePage {
  username: string = '';
  recoveredPassword: string | null = null;
  recoveredEmail: string | null = null;
  userNotFound: boolean = false;
  searchingCredentials: boolean = false;

  constructor(private navCtrl: NavController, private dataService: DataService, private router: Router) {} // Inyecta NavController

  recoverPassword() {
    this.searchingCredentials = true;

    setTimeout(() => {
      this.dataService.getUserByUsername(this.username).then((user) => {
        if (user) {
          this.recoveredPassword = user.password;
          this.recoveredEmail = user.email;
          this.userNotFound = false;
          this.router.navigate(['/set-password']);
        } else {
          this.userNotFound = true;
          // Reinicia las variables de contraseña y correo
          this.recoveredPassword = null;
          this.recoveredEmail = null;
        }

        // Cambia el mensaje después de completar la búsqueda
        this.searchingCredentials = false;
      });
    }, 5000); // 5000 ms = 5 segundos (simulación)
  }

  navigateLeft() {
    // Navega de vuelta a la página anterior (por ejemplo, /home)
    this.navCtrl.back();
  }
}
