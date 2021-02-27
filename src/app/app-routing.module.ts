import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//importar componentes
import { ProductoComponent } from "./producto/producto.component";

//importar guards

const routes: Routes = [
  { path: "productos", component: ProductoComponent, pathMatch: "full" },
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
