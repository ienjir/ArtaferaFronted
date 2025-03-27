import { Routes } from '@angular/router';
import { Homepage } from "./Pages/homepage/homepage.component";
import {LoginPage} from "./Pages/loginpage/loginpage.component";
import {authGuard} from "./Services/auth/auth-guard.service";

export const routes: Routes = [
  { path: '', component: Homepage},
  { path: 'home', redirectTo: '', pathMatch: 'full', canActivate: [authGuard] },
  { path: 'login', component: LoginPage}
];
