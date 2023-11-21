import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard {
  constructor(
    private router: Router
  ) { }
  canActivate(): boolean {
    if (localStorage.getItem("Tokens")) {
      this.router.navigate(['/chat'],{ replaceUrl: true });
      return false;
    }
    return true;
  }
}
