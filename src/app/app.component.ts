import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'energiapp';

  viewComponents: boolean = false;  
  viewLogin:boolean = true;


   /**
   * viewComponent
   */
  public viewComponent(confirmation: boolean) {
    this.viewComponents = confirmation;
    this.viewLogin = false;
  }
}
