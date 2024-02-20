import {ApplicationConfig, ENVIRONMENT_INITIALIZER, inject, isDevMode} from '@angular/core';
import {provideRouter, RouterState} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {provideEffects} from "@ngrx/effects";
import {EntityDataService, provideEntityData, withEffects} from "@ngrx/data";
import {provideRouterStore} from "@ngrx/router-store";
import {provideStore} from "@ngrx/store";
import {metaReducers, reducers} from "./reducers";
import {getConfig} from "./entity-metadata";
import {UsersService} from "./pages/users/services/users.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        // per evitare che vengano modificati gli stati dal codice, es assegnare manualmente un nuovo valore ad uno stato. rende quindi lo state immutabile e non modificabile da codice
        // es: OK
        // on(AuthActions.login, (state, action) => {
        //   return {
        //     user: action.user,
        //   };
        // }),
        // NON ok
        // on(AuthActions.login, (state, action) => {
        //   state.user = action.user;
        //   return {
        //     state
        //   };
        // }),
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      },
    }),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideEffects(),
    provideEntityData(getConfig(), withEffects()),
    provideRouterStore({
      stateKey: 'router',
      // routerState: RouterState.Minimal,
    }),
    // questo è un environment initializer, serve per inizializzare l'ambiente. In questo caso serve per inizializzare l'entity data service che ha le chiamate http custom
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue() {
        const entityDataService = inject(EntityDataService);
        const usersDataService = inject(UsersService);
        entityDataService.registerService('User', usersDataService);
      },
      multi: true,
    },

  ]
};
