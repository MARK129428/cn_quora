import {
  action,
  flow,
  makeObservable,
  observable,
} from 'mobx';
import { SignUpMsg } from '@page/SignUp';
import { userSignIn } from '@/api/user';

export interface ResponseGenerator{
  avatar: string,
  email: string,
  message?: string,
  token?: string,
  username: string,
}

class UserModel {
  email: string = '';

  avatar: string = '';

  username: string = '';

  constructor() {
    makeObservable(this, {
      username: observable,
      avatar: observable,
      email: observable,
      getUser: action.bound,
      loadUser: flow,
    });
  }

  getUser() {
    return {
      email: this.email,
      username: this.username,
      avatar: this.avatar,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  * loadUser(signUpMsg: SignUpMsg) {
    const response:ResponseGenerator = yield userSignIn(signUpMsg);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    if (
      response
      && response.avatar
      && response.email
      && response.username
    ) {
      this.avatar = response.avatar;
      this.email = response.email;
      this.username = response.username;
    }
    return response;
  }
}

export default UserModel;
