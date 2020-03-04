import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  form: any;
  unsubcribe: any;

  constructor(
    private _invoiceService: InvoicesService,
    private _globalService: GlobalService
  ) {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields))
    });

    this.unsubcribe = this.form.valueChanges.subscribe(update => {
      //console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }

  ngOnInit(): void {
    this.consultarFacturas();
  }

  fields = [
    {
      type: "text",
      name: "id_cliente",
      label: "Id Cliente",
      value: "",
      required: true
    },
    {
      type: "text",
      name: "valor",
      label: "Valor",
      value: "",
      required: true
    },
    {
      type: "text",
      name: "periodo",
      label: "Periodo",
      value: "",
      required: true
    },
    {
      type: "text",
      name: "consumo",
      label: "Consumo",
      value: "",
      required: true
    },
    {
      type: "text",
      name: "estado",
      label: "Estado",
      value: "",
      required: true
    },
    {
      type: "",
      name: "id_factura",
      label: "",
      value: "id"
    }
  ];

  getFields() {
    return this.fields;
  }

  onSubmit(form) {
    let id = Math.round(Math.random() * 999);
    form.id_factura = id;
    console.log(form);
    this._invoiceService.crearFactura(form).subscribe((res: any) => {
      if (res.status === "success") {
        this._globalService.showSuccess(res.message);
        this.form.clear();
        this.consultarFacturas();
      } else {
        this._globalService.showError(res.message);
      }
    });
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
