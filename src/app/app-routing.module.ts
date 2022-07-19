import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PfmComponent } from './pfm/pfm.component'

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "pfm", component: PfmComponent },
  { path: " ", component: HomeComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
