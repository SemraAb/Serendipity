import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';

const routes: Routes=[
  {path:'auth' , component:AuthComponent},
  {path:'main' , component:MainComponent},
  {path:'' , redirectTo:'main' , pathMatch:'full'},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
