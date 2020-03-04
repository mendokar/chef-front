import { Component, OnInit } from "@angular/core";
import { PaymentsService } from "src/app/services/payments.service";
import { GlobalService } from "src/app/services/global.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"]
})
export class PaymentsComponent implements OnInit {
  form: any;
  unsubcribe: any;

  constructor(
    private _paymentService: PaymentsService,
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
    this.consultarPagos();
  }

  fields = [
    {
      type: "text",
      name: "id_factura",
      label: "Id Factura",
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
      name: "valor_parcial",
      label: "Valor parcial",
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
      name: "id_pago",
      label: "",
      value: "id"
    }
  ];

  getFields() {
    return this.fields;
  }

  onSubmit(form) {
    let id = Math.round(Math.random() * 999);
    form.id_pago = id;
    console.log(form);
    this._paymentService.crearPagos(form).subscribe((res: any) => {
      if (res.status === "success") {
        this._globalService.showSuccess(res.message);
        this.form.clear();
        this.consultarPagos();
      } else {
        this._globalService.showError(res.message);
      }
    });
  }

  Pagos = [];
  /**
   * consultarPagos
   */
  public consultarPagos() {
    console.log("Consulta Pagos");

    this._paymentService.consultarPagos().subscribe((res: any) => {
      if (res.status === "success") {
        this._globalService.showSuccess(res.message);
        this.Pagos = [];
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
          this.Pagos.push({
            id_pago: data[i].id_pago,
            id_factura: data[i].id_factura,
            valor: data[i].valor,
            valor_parcial: data[i].valor_parcial,
            estado: data[i].estado
          });
        }
      } else {
        this._globalService.showError(res.message);
      }
    });
  }

  Pago;
  /**
   * consultarPago
   */
  public consultarPago() {
    if (this.Pago !== undefined && this.Pago !== "" && this.Pago !== null) {
      this._paymentService.consultarPago(this.Pago).subscribe((res: any) => {
        if (res.status === "success") {
          this._globalService.showSuccess(res.message);
          let data = res.data;
          this.Pagos = [];

          this.Pagos.push({
            id_pago: data.id_pago,
            id_factura: data.id_factura,
            valor: data.valor,
            valor_parcial: data.valor_parcial,
            estado: data.estado
          });
        } else {
          this._globalService.showError(res.message);
        }
      });
    } else {
      this._globalService.showError("Ingrese un id Pago valido");
      this.consultarPagos();
    }
  }
}
