import {Component, inject} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../core/models/user";
import {UserEntityService} from "./services/user-entity.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  usersEntityService = inject(UserEntityService);

  users$: Observable<User[]> | undefined

  constructor() {
    this.users$ = this.usersEntityService.entities$;
  }


  editOne(user: User) {
    const editedUser = {...user, name: `${user.name} - edited`};
    // update fa la chiamata al server e aggiorna la lista nello store
    this.usersEntityService.update(editedUser);


  }

  deleteUser(id: number) {
    console.log('edit user', id);

  }

  addUser() {
    const user: User = {
      id: 0,
      name: 'Giovanni Vidotto',
      email: 'new user email',
      phone: 'new user phone',
      username: 'new user username',
      address: {
        street: 'new user street',
        suite: 'new user suite',
        city: 'new user city',
        zipcode: 'new user zipcode',
        geo: {
          lat: 'new user lat',
          lng: 'new user lng'
        }
      },
      website: 'new user website',
      company: {
        name: 'new user company name',
        catchPhrase: 'new user company catchPhrase',
        bs: 'new user company bs'
      }
    }
    this.usersEntityService.add(user);
  }

  deleteOne(id: number) {
    this.usersEntityService.delete(id);
  }

  getById(id: number) {
    this.usersEntityService.getByKey(id);
  }

  loadMore() {
    this.usersEntityService.getWithQuery({pageNumber: 2, pageSize: 10});
  }
}
