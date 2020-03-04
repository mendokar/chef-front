import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  url_clientes = environment.url_clientes;
  constructor(private httpClient: HttpClient) { }

  /**
   * crearCliente
   */
  public crearCliente(cliente) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.post(this.url_clientes + "crearCliente", cliente, {
      headers: headers
    });
  }

  /**
   * consultarClientes
   */
  public consultarClientes() {
   return this.httpClient.get(this.url_clientes+ "clientes");
  }

    /**
   * consultarClientes
   */
  public consultarCliente(id) {
    return this.httpClient.get(this.url_clientes+ "consultarCliente/"+id);
   }


     /**
   * crearCliente
   */
  public actualizarCliente(id_cliente,cliente) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.put(this.url_clientes + "actualizarCliente/"+id_cliente, cliente, {
      headers: headers
    });
  }

  /**
   * eliminarCliente
   */
  public eliminarCliente(id_cliente) {
    return this.httpClient.delete(this.url_clientes + "eliminarCliente/" + id_cliente)
  }
}
