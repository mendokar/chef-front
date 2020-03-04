import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() viewComponents = new EventEmitter<boolean>();
  usuario = "ChefCompany";
  clave = "chef2020";
  constructor(private _serviceGlobal:GlobalService,private _routEx:Router) { }

  ngOnInit(): void {
  }

  /**
   * iniciarSesion
   */
  public iniciarSesion() {
    if(this.usuario === "ChefCompany"){
      if(this.clave === "chef2020"){
        this.viewComponents.emit(true);
        this._serviceGlobal.showSuccess("Inicio de sesion correcto");
        this._routEx.navigate(['home']);       
      }else{
        this._serviceGlobal.showError("Clave no es corrects.")
      }
    }else{
      this._serviceGlobal.showError("Usuario no es correcto.")
    }
  }

  

}
