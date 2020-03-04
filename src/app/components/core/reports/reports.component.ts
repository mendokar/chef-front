import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(private _invoiceService: InvoicesService,
    private _customerService: CustomersService,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.consultarFacturas();
  }

clientes = [];
cliente;
  /**
   * consultarCliente
   */
  public consultarCliente(id) {
    if (
      this.cliente !== undefined &&
      this.cliente !== "" &&
      this.cliente !== null
    ) {
      this._customerService
        .consultarCliente(this.cliente)
        .subscribe((res: any) => {
          if (res.status === "success") {
            this._globalService.showSuccess(res.message);
            let data = res.data;
            this.clientes = [];
 
              /*this.clientes.push({
                id_cliente: data.id_cliente,
                nombres: data.nombres,
                direccion_facturacion: data.direccion_facturacion,
                direccion_correspondencia: data.direccion_correspondencia,
                estrato: data.estrato
              });*/

              this.facturasF.push({
                id_factura: this.facturas[id].id_factura,
                id_cliente: this.facturas[id].id_cliente,
                nombres: data.nombres,
                direccion_facturacion: data.direccion_facturacion,
                direccion_correspondencia: data.direccion_correspondencia,
                estrato: data.estrato,
                valor: this.facturas[id].valor,
                periodo: this.facturas[id].periodo,
                consumo: this.facturas[id].consumo + "KW",
                estado: this.facturas[id].estado
              });
            
          } else {
            this._globalService.showError(res.message);
          }
        });
    } else {
      this._globalService.showError("Ingrese un id cliente valido");
      //this.consultarClientes();
    }
  }

  facturas = [];
  facturasF = [];
  /**
   * consultarFacturas
   */
  public consultarFacturas() {
    console.log("Consulta facturas");
    
    this._invoiceService.consultarFacturas().subscribe((res: any) => {
      if (res.status === "success") {
        this._globalService.showSuccess(res.message);
        this.facturas = [];
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
          this.facturas.push({
            id_factura: data[i].id_factura,
            id_cliente: data[i].id_cliente,
            valor: data[i].valor,
            periodo: data[i].periodo,
            consumo: data[i].consumo + "KW",
            estado: data[i].estado
          });
        }


      for (let y = 0; y < this.facturas.length; y++) {
        this.cliente = this.facturas[y].id_cliente;
        this.consultarCliente(y);
        
      }



      } else {
        this._globalService.showError(res.message);
      }
    });
  }

}
