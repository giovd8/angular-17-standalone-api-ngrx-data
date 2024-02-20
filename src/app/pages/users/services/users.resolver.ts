import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {map} from "rxjs";
import {UserEntityService} from "./user-entity.service";
import {inject} from "@angular/core";
import {User} from "../../../core/models/user";


// export class UsersResolver implements Resolve<boolean> {
//
//   constructor(private userService: UserEntityService) {
//
//   }
//
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     // return this.userService.loaded$.pipe(
//     //   take(1),
//     //   switchMap(loaded => {
//     //     if (!loaded) {
//     //       return this.userService.getAll();
//     //     } else {
//     //       return of(loaded);
//     //     }
//     //   })
//     // );
//     console.log('UsersResolver');
//     return this.userService.getAll().pipe(
//       map((users: User[]) => !!users)
//     );
//     // return of(true);
//   }
// }

export const usersResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('UsersResolver');
  return inject(UserEntityService).getAll().pipe(
    map((users: User[]) => !!users)
  );
};
