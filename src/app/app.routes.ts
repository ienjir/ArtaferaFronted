import { Routes } from '@angular/router';
import { Homepage } from "./Pages/homepage/homepage.component";
import {LoginPage} from "./Pages/loginpage/loginpage.component";
import {AuthGuard} from "./Services/auth/auth-guard.service";
import {NotFoundPageComponent} from "./Pages/notfoundpage/notfoundpage.component";
import {ContactPageComponent} from "./Pages/contactpage/contactpage.component";

export const routes: Routes = [
  { path: '', component: Homepage},
  { path: 'home', redirectTo: '', pathMatch: 'full'},
  { path: 'login', component: LoginPage},
  { path: 'kontakt', component: ContactPageComponent },
  { path: '**', component: NotFoundPageComponent}
];
