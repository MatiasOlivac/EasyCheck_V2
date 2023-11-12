import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardsService {

  constructor(private router: Router) { }

  canActivate(){
    this.router.navigate(['login']); // reedireccionamos a login en caso de no tener el pass correspondiente
    return false;
  }
}
