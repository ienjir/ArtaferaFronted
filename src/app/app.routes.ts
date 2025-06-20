import {Routes} from '@angular/router';
import {Homepage} from "./Pages/homepage/homepage.component";
import {LoginPage} from "./Pages/loginpage/loginpage.component";
import {AuthGuard} from "./Services/auth/auth-guard.service";
import {NotFoundPageComponent} from "./Pages/notfoundpage/notfoundpage.component";
import {ContactPageComponent} from "./Pages/contactpage/contactpage.component";
import {DefaultLayoutComponent} from "./Pages/defaultLayout/defaultlayout.component";
import {AboutMePageComponent} from "./Pages/aboutmepage/aboutmepage.component";

export const routes: Routes = [
    {
      path: '',
      component: DefaultLayoutComponent,
      children: [
        {path: 'login', component: LoginPage},
        {path: 'kontakt', component: ContactPageComponent},
        {path: 'übermich', component: AboutMePageComponent},
        {path: '**', component: NotFoundPageComponent},
      ]
    },
    {
      path: '', component:
      Homepage
    },
    {
      path: 'home', redirectTo:
        '', pathMatch:
        'full'
    },
  ]
;
