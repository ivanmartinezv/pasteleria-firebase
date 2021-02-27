import { Component, OnInit } from "@angular/core";
//servicios
import { ProductoService } from "../services/producto.service";
//formularios
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.css"]
})
export class ProductoComponent implements OnInit {
  //(I) Array que contendrá los datos de firebase
  public productos: any[] = [];
  //(II) atributos para editar productos
  public documentId = null;
  /*La app maneja 2 estados, currentStatus = 0 -> la app se encuentra en modo de creación?? de documentos, 
  currentStatus = 1 -> la app se encuentra en modo de edición?? de documentos. */
  public currentStatus = 1;
  public newProductoForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    url: new FormControl("", Validators.required),
    id: new FormControl("")
  });

  constructor(private _productoService: ProductoService) {
    //funcion con los datos que trae el servicio
    /*this._productoService.listaItem().subscribe(item => {
      this.items = item;
      console.log(this.items);
    });*/
    this.newProductoForm.setValue({
      id: "",
      nombre: "",
      url: ""
    });
  }

  //ngOnInit(): void {}

  ngOnInit() {
    //ANALIZAR ESTA WEA
    this._productoService.getProductos().subscribe(productosSnapshot => {
      this.productos = [];
      productosSnapshot.forEach((productoData: any) => {
        this.productos.push({
          id: productoData.payload.doc.id,
          data: productoData.payload.doc.data()
        });
      });
    });
  }

  public newProducto(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      //CREACION DE DOCUMENTOS
      let data = {
        nombre: form.nombre,
        url: form.url
      };
      this._productoService.createProducto(data).then(
        () => {
          console.log("Documento creado exitósamente!");
          this.newProductoForm.setValue({
            nombre: "",
            url: "",
            id: ""
          });
        },
        error => {
          console.error(error);
        }
      );
    } else {
      //EDICION DE DOCUMENTOS
      let data = {
        nombre: form.nombre,
        url: form.url
      };
      this._productoService.updateProducto(documentId, data).then(
        () => {
          this.currentStatus = 1;
          this.newProductoForm.setValue({
            nombre: "",
            url: "",
            id: ""
          });
          console.log("Documento editado exitósamente");
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public editProducto(documentId) {
    let editSubscribe = this._productoService
      .getProducto(documentId)
      .subscribe(producto => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newProductoForm.setValue({
          id: documentId,
          nombre: producto.payload.data()["nombre"],
          url: producto.payload.data()["url"]
        });
        editSubscribe.unsubscribe();
      });
  }

  public deleteProducto(documentId) {
  this._productoService.deleteProducto(documentId).then(() => {
    console.log('Documento eliminado!');
  }, (error) => {
    console.error(error);
  });
}

  /*eliminar(item: Item) {
    this._productoService.eliminarItem(item);
  }*/

  /*editar(item: Item) {
    console.log("editar!");
    //el item auxiliar recibe el item por editar
    this.editarItem = item;
    console.log(this.editarItem);
  }*/

  /*agregarItemEditado() {
    //llamar al servicio para editar el item en la bdd
    this._productoService.editarItem(this.editarItem);
  }*/
}
