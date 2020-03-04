import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  url_facturas = environment.url_facturas;
  constructor(private httpClient: HttpClient) { }

  /**
   * crearFactura
   */
  public crearFactura(factura) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.post(this.url_facturas + "crearFactura", factura, {
      headers: headers
    });
  }

  /**
   * consultarFacturas
   */
  public consultarFacturas() {
   return this.httpClient.get(this.url_facturas+ "facturas");
  }

    /**
   * consultarFactura
   */
  public consultarFactura(id) {
    return this.httpClient.get(this.url_facturas+ "consultarFactura/"+id);
   }
}
