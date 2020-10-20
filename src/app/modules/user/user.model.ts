import {UserInterface} from './user.interface';
import {Adapter} from '../../core/adapter.interface';
import {Injectable} from '@angular/core';

export class UserModel implements UserInterface {
  constructor(
    public id: number,
    public client_id: number,
    public name: string,
    public email: string,
    public created_at?: string,
    public updated_at?: string,
    public email_verified_at?: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class UserAdapter implements Adapter<UserModel> {
  adapt(item: any): UserModel {
    return new UserModel(
      item.id,
      item.client_id,
      item.name,
      item.email,
      item.created_at,
      item.edited_at,
      item.email_verified_at
    );
  }
}
