import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './user-list/user-list.component'
import {VehicleListComponent} from './vehicle-list/vehicle-list.component'
import {AccidentListComponent} from './accident-list/accident-list.component'
import { DashComponent } from './dash/dash.component'

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'accidents', component: AccidentListComponent },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'dash' , component: DashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
