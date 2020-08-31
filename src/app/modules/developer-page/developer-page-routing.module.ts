import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';


const routes: Routes = [
  { path: 'developer-detail/:email', component: DeveloperDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperPageRoutingModule { }
