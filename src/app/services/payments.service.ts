import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  url_pagos = environment.url_pagos;
  constructor(private httpClient: HttpClient) { }

  /**
   * crearPagos
   */
  public crearPagos(factura) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.post(this.url_pagos + "crearPago", factura, {
      headers: headers
    });
  }

  /**
   * consultarPagos
   */
  public consultarPagos() {
   return this.httpClient.get(this.url_pagos+ "pagos");
  }

    /**
   * consultarPago
   */
  public consultarPago(id) {
    return this.httpClient.get(this.url_pagos+ "consultarPagos/"+id);
   }
}
