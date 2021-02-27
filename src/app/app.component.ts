import { Component, VERSION } from "@angular/core";
//agregar firestore
import { AngularFirestore } from "@angular/fire/firestore";
//agregar observable
import { Observable } from "rxjs";

//interfaz de un string (sustituye clase.ts)
export interface Item {
  name: string;
}

@Component({
  selector: "app-root", //se usa en el index.html
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  version = "Angular " + VERSION.major;
  titulo = "Pasteleria usando Firebase";
  //un item
  //item: Observable<Item>; //no se usa
  //coleccion de items (asi se llama en firebase)
  items: Observable<any[]>;

  //db era firestore
  constructor(db: AngularFirestore) {
    console.log("constructor de app.component");
    this.items = db.collection("items").valueChanges();
  }
}
