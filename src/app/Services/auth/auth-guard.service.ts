import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {inject, Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {map, take, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.waitForInitialization().pipe(
      switchMap(() => {
        return this.authService.currentUser.pipe(
          take(1),
          map(user => {
            if (user) {
              if (route.data['roles'] && !route.data['roles'].some((role: string) => this.authService.hasRole(role))) {
                this.router.navigate(['/']);
                return false;
              }
              return true;
            }
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
          })
        );
      })
    );
  }
}
