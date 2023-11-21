import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    if (!localStorage.getItem("Tokens")) {
      this.router.navigate(['/auth', 'login'], {queryParams: {redirectUrl: url}, replaceUrl: true});
      return false;
    }
    return true;
  }
}
