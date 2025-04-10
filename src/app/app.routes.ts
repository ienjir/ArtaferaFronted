import { Routes } from '@angular/router';
import { Homepage } from "./Pages/homepage/homepage.component";
import {LoginPage} from "./Pages/loginpage/loginpage.component";
import {AuthGuard} from "./Services/auth/auth-guard.service";

export const routes: Routes = [
  { path: '', component: Homepage},
  { path: 'home', redirectTo: '', pathMatch: 'full'},
  { path: 'login', component: LoginPage},
  { path: 'test', component: Homepage, canActivate: [AuthGuard] }
];
