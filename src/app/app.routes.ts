import { Routes } from '@angular/router';
import { Homepage } from "./Pages/homepage/homepage.component";

export const routes: Routes = [
  { path: '', component: Homepage},
  { path: 'home', redirectTo: '', pathMatch: 'full'}
];
