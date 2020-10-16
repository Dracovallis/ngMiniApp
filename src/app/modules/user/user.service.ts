import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserAdapter, UserModel} from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient,
        private adapter: UserAdapter
      ) { }

    getUserById(userId: number): Observable<UserModel | false> {
      return new Observable((observer) => {
        this.getUsers().subscribe((users: UserModel[]) => {
          observer.next(this.findUserById(users, userId));
        });
      });
    }

    getUsers(): Observable<UserModel[]> {
        return this.http
          .get('/assets/users.json')
          .pipe(
            map((data: any[]) =>
              data.map(
                (item: any) => this.adapter.adapt(item)
              )
            )
          );
    }

    private findUserById(users: UserModel[], id: number): UserModel | false {
      const foundUsers = users.filter((user: UserModel) => {
        return user.id === id;
      });

      return foundUsers.length > 0 ? foundUsers[0] : false;
    }
}
