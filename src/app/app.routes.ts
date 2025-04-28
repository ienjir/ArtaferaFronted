import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {UnderMaintananceComponent} from "./Pages/under-maintanance/under-maintanance.component";

export const routes: Routes = [
  { path: '', component: UnderMaintananceComponent},
  { path: '**', pathMatch: 'full', component: UnderMaintananceComponent}
];
