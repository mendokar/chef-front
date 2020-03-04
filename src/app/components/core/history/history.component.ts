import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private _invoiceService: InvoicesService,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.consultarFacturas();
  }

  facturas = [];
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
      } else {
        this._globalService.showError(res.message);
      }
    });
  }

  factura;
  /**
   * consultarFactura
   */
  public consultarFactura() {
    if (
      this.factura !== undefined &&
      this.factura !== "" &&
      this.factura !== null
    ) {
      this._invoiceService
        .consultarFactura(this.factura)
        .subscribe((res: any) => {
          if (res.status === "success") {
            this._globalService.showSuccess(res.message);
            let data = res.data;
            this.facturas = [];
 
              this.facturas.push({
                id_factura: data.id_factura,
                id_cliente: data.id_cliente,
                valor: data.valor,
                periodo: data.periodo,
                consumo: data.consumo + "KW",
                estado: data.estado
              });
            
          } else {
            this._globalService.showError(res.message);
          }
        });
    } else {
      this._globalService.showError("Ingrese un id factura valido");
      this.consultarFacturas();
    }
  }

}
