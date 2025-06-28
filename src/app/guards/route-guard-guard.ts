import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth-service';
import { Auth, authState } from '@angular/fire/auth';
import { map, take } from 'rxjs';


export const routeGuardGuard: CanActivateFn = (route, state) => {

  let auth = inject( Auth )
  let router = inject( Router )

  return authState( auth ).pipe(
    take(1),
    map( user => {
      if( user ) {
        return true
      }
      else {
        router.navigate(['/'])
        return false
      }
    })
  )

};
