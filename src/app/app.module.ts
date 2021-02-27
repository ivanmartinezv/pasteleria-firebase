import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
//modulos
import { AppRoutingModule } from "./app-routing.module";
//componentes
import { ProductoComponent } from "./producto/producto.component";
//firebase
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [AppComponent, ProductoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule, //rutas
    AngularFireModule.initializeApp(environment.firebase), //configuracion de firebase
    FormsModule, //formularios
    ReactiveFormsModule //formularios
    /*
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
    */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
