import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
// export const AuthGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ):
//   Observable<boolean | UrlTree> 
//   | Promise<boolean | UrlTree> 
//   | boolean 
//   | UrlTree=> {

//   return inject(AuthenticationService).isAuthenicated()
//     ? true
//     : inject(Router).createUrlTree(['/auth/login']);
// };