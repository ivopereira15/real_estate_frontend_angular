import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDialogComponent } from '../../shared/create-dialog/create-dialog.component';

import { HomeComponent } from './home/home.component';
import { SearchBoardComponent } from './search-board/search-board.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent,
  children: [
    {
      path: 'details/:id',
      component: CreateDialogComponent
    }
  ]},
  {path: 'search', component: SearchBoardComponent,
  },
  {
    path: 'search/details/:id/:from',
    component: CreateDialogComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class HomeRoutingModule { }
