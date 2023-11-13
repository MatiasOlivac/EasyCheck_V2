import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import type { QueryList } from '@angular/core';
import { Animation, AnimationController, IonCard } from '@ionic/angular'; 

@Component({
  selector: 'app-recuperar-cuenta-code',
  templateUrl: './recuperar-cuenta-code.page.html',
  styleUrls: ['./recuperar-cuenta-code.page.scss'],
})
export class RecuperarCuentaCodePage implements OnInit {
  codigoCambiaClave = 'CambiaClave';

  formularioRecuperarCuentaCode: FormGroup;

  @ViewChildren(IonCard, { read: ElementRef })
  cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;

  private animation: Animation | undefined;

  constructor(
    private animationCtrl: AnimationController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formularioRecuperarCuentaCode = this.formBuilder.group({
      codigo: ['', Validators.required],
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.cardElements && this.cardElements.length > 0) {
      const firstCard = this.cardElements.first.nativeElement;

      const card = this.animationCtrl
        .create()
        .addElement(firstCard)
        .duration(2000)
        .beforeStyles({
          filter: 'invert(75%)',
        })
        .beforeClearStyles(['box-shadow'])
        .afterStyles({
          'box-shadow': 'rgba(255, 0, 50, 0.4) 0px 4px 16px 6px',
        })
        .afterClearStyles(['filter'])
        .keyframes([
          { offset: 0, transform: 'scale(1)' },
          { offset: 0.5, transform: 'scale(1.5)' },
          { offset: 1, transform: 'scale(1)' },
        ]);

      this.animation = this.animationCtrl.create().duration(2000).addAnimation([card]);
    } else {
      console.error('No se encontraron elementos en cardElements.');
    }
  }

  cambiarClave() {
    const codigoIngresado = this.formularioRecuperarCuentaCode.get('codigo')?.value;

    if (codigoIngresado === this.codigoCambiaClave) {
      console.log('Vamos a cambiar la clave');
      
      this.router.navigate(['/recuperar-cuenta-code2']);
    } else {
      if (this.animation) {
        this.animation.play();
      } else {
        console.error('La propiedad "animation" es undefined.');
      }
      console.log('Código incorrecto');
    }
  
  }
}
