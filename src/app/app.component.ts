import { Component, VERSION } from "@angular/core";

@Component({
  selector: "app-root", //se usa en el index.html
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  titulo = "Pasteleria usando Firebase y Angular " + VERSION.major;

  constructor() {
    //console.log("constructor de app.component");
  }
}
