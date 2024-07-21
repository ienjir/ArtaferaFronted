import { Routes } from '@angular/router';
import { Homepage } from "./Pages/homepage/homepage.component";

export const routes: Routes = [
  { path: 'home', component: Homepage},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];
