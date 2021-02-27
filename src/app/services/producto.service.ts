import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFirestoreCollection } from "@angular/fire/firestore";
import { AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";

//interfaz de un string (sustituye clase.ts)
export interface Item {
  name: string;
}
//importar .map
import { map } from "rxjs/operators";
//para eliminar

@Injectable({
  providedIn: "root"
})

//CONEXION BDD Y CRUD
export class ProductoService {
  //variables
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  //para eliminar
  private itemDoc: AngularFirestoreDocument<Item>;

  //constructor
  constructor(private afs: AngularFirestore) {
    //vacio
  }

  //(1) Crea un nuevo producto
  public createProducto(data: { nombre: string; url: string }) {
    return this.afs.collection("productos").add(data);
  }

  //(2) Obtiene un producto
  public getProducto(documentId: string) {
    return this.afs
      .collection("productos")
      .doc(documentId)
      .snapshotChanges();
  }

  //(3) Obtiene todos los productos
  public getProductos() {
    return this.afs.collection("productos").snapshotChanges();
  }

  //(4) Actualiza un producto
  public updateProducto(documentId: string, data: any) {
    return this.afs
      .collection("productos")
      .doc(documentId)
      .set(data);
  }

  //(5) Elimina un producto
  public deleteProducto(documentId: string) {
    return this.afs
      .collection("productos")
      .doc(documentId)
      .delete();
  }
}
