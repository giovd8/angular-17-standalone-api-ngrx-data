import { Routes } from '@angular/router';
import {usersResolver} from "./pages/users/services/users.resolver";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component').then((m) => m.UsersComponent),
    // resolve: {
    //   User: usersResolver
    // }
    resolve: {data: usersResolver}
  },
];
