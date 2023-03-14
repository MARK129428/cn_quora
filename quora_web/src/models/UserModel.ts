import {
  action,
  flow,
  makeObservable,
  observable,
} from 'mobx';
import { SignUpMsg } from '@page/SignUp';
import { changeUserMsg, getUser, userSignIn } from '@/api/user';

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
      initUser: action.bound,
      loadUser: flow.bound,
      getUserWithToken: flow.bound,
      changeUser: flow.bound,
    });
    if (localStorage.getItem('token')) {
      this.getUserWithToken();
    }
  }

  getUser() {
    return {
      email: this.email,
      username: this.username,
      avatar: this.avatar,
    };
  }

  * loadUser(signUpMsg: SignUpMsg) {
    const response:ResponseGenerator = yield userSignIn(signUpMsg);
    this.initUser(response);
    return response;
  }

  * getUserWithToken() {
    const response:ResponseGenerator = yield getUser();
    this.initUser(response);
    return response;
  }

  * changeUser(signUpMsg: SignUpMsg) {
    const response: ResponseGenerator = yield changeUserMsg(signUpMsg);
    this.initUser(response);
    console.log(response)
  }

  initUser(response:ResponseGenerator) {
    if (!response) {
      return response;
    }
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    if (
      response.avatar !== undefined
      && response.email !== undefined
      && response.username !== undefined
    ) {
      this.avatar = response.avatar;
      this.email = response.email;
      this.username = response.username;
    }
    return response;
  }
}

export default UserModel;
