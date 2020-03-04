import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CustomersService } from "src/app/services/customers.service";
import { GlobalService } from "src/app/services/global.service";
declare var $:any;
@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"]
})
export class CustomersComponent implements OnInit {
  form: any;
  unsubcribe: any;

  constructor(
    private _customerService: CustomersService,
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
    this.consultarClientes();
  }

  fields = [
    {
      type: "text",
      name: "nombres",
      label: "Nombres",
      value: "",
      required: true
    },
    {
      type: "text",
      name: "direccion_facturacion",
      label: "Dirección Facturación",
      value: "",
      required: true
    },
    {
      type: "text",
      name: "direccion_correspondencia",
      label: "Dirección Correspondencia",
      value: "",
      required: true
    },
    {
      type: "text",
      name: "estrato",
      label: "Estrato",
      value: "",
      required: true
    },
    {
      type: "",
      name: "id_cliente",
      label: "",
      value: "id"
    }
  ];

  getFields() {
    return this.fields;
  }

  onSubmit(form) {
    let id = Math.round(Math.random() * 999);
    form.id_cliente = id;
    console.log(form);
    this._customerService.crearCliente(form).subscribe((res: any) => {
      if (res.status === "success") {
        this._globalService.showSuccess(res.message);
        this.form.clear();
      } else {
        this._globalService.showError(res.message);
      }
    });
  }

  clientes = [];
  /**
   * consultarClientes
   */
  public consultarClientes() {
    this._customerService.consultarClientes().subscribe((res: any) => {
      if (res.status === "success") {
        this._globalService.showSuccess(res.message);
        this.clientes = [];
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
          this.clientes.push({
            id_cliente: data[i].id_cliente,
            nombres: data[i].nombres,
            direccion_facturacion: data[i].direccion_facturacion,
            direccion_correspondencia: data[i].direccion_correspondencia,
            estrato: data[i].estrato
          });
        }
      } else {
        this._globalService.showError(res.message);
      }
    });
  }

  cliente;
  /**
   * consultarCliente
   */
  public consultarCliente() {
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
 
              this.clientes.push({
                id_cliente: data.id_cliente,
                nombres: data.nombres,
                direccion_facturacion: data.direccion_facturacion,
                direccion_correspondencia: data.direccion_correspondencia,
                estrato: data.estrato
              });
            
          } else {
            this._globalService.showError(res.message);
          }
        });
    } else {
      this._globalService.showError("Ingrese un id cliente valido");
      this.consultarClientes();
    }
  }



  direccion_facturacion;
	nombres;
	direccion_correspondencia;
	estrato;
	id_cliente;

  /**
   * editarCliente
   */
  public editarCliente(cliente) {
    $('#exampleModal').modal('show');
    this.nombres = cliente.nombres;
    this.direccion_facturacion = cliente.direccion_facturacion;
    this.direccion_correspondencia = cliente.direccion_correspondencia;
    this.estrato = cliente.estrato;
    this.id_cliente = cliente.id_cliente;
  }

  /**
   * actualizarCliente
   */
  public actualizarCliente() {
    let cliente = {
    nombres : this.nombres,
    direccion_facturacion : this.direccion_facturacion,
    direccion_correspondencia : this.direccion_correspondencia,
    estrato : this.estrato
    }
    this._customerService.actualizarCliente(this.id_cliente,cliente).subscribe((res:any)=>{
      if (res.status === "success") {
        this._globalService.showSuccess(res.message);
        $('#exampleModal').modal('hide');
        this.consultarClientes();
      } else {
        this._globalService.showError(res.message);
      }
    })
  }

  /**
   * eliminarCliente
   */
  public eliminarCliente(cliente) {
    this._customerService.eliminarCliente(cliente.id_cliente).subscribe((res:any)=>{
      if (res.status === "success") {
        this._globalService.showSuccess(res.message);      
        this.consultarClientes();
      } else {
        this._globalService.showError(res.message);
        this.consultarClientes();
      }
    })
  }


}
