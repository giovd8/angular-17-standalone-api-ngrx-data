import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {filter, first, tap} from "rxjs";
import {UserEntityService} from "./user-entity.service";
import {inject} from "@angular/core";

export const usersResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userEntityService: UserEntityService = inject(UserEntityService);
  // faccio la chiamata quando atterra sulla pagina e non quando la lista è vuota
  // la transizione della rotta avviene solo quando la chiamata è completata e loaded è true
  return userEntityService.loaded$
    .pipe(
      tap(loaded => {
          if (!loaded) {
            userEntityService.getAll().pipe(
              // map((users: User[]) => !!users)
            );
          }
        }
      ),
      (filter((loaded: boolean) => !!loaded)),
      first()
    );
};
