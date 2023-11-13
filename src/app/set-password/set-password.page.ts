import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.page.html',
  styleUrls: ['./set-password.page.scss'],
})
export class SetPasswordPage {

  setForm: FormGroup; 

  constructor(private fb: FormBuilder, private alertController: AlertController, private router: Router) {
    this.setForm = this.fb.group({
      Password: ['', [Validators.required]],
    });
  }

  async setPassword() {
    const f = this.setForm.value;
  
    const userResult = await Preferences.get({ key: 'usuarioData' });
  
    console.log(f.Password);
    console.log(userResult);
  
    if (userResult && userResult.value) {
      const userData: { correo: string; nombre: string; apellido: string; rut: string; contrasena: string }[] = JSON.parse(userResult.value);
  
      console.log(userData[0].contrasena);

      userData[0].contrasena = f.Password;
  
      await Preferences.set({ key: 'usuarioData', value: JSON.stringify(userData) });
  
      console.log('Contraseña actualizada con éxito.');
    } else {
      console.error('No se pudieron encontrar los datos del usuario en el almacenamiento.');
    }
  }
  
  
}
