import { SignUpMsg } from '@page/SignUp';
import instance from '../utils/http';

export function userSignIn(parameter: SignUpMsg) {
  return instance.post('/user/signin', parameter);
}

export function userSignUp(parameter: any) {
  return instance.post('/user/signup', parameter);
}

export function changeUserMsg(parameter: any) {
  return instance.patch('/user', parameter);
}

export function getUser() {
  return instance.get('/user');
}
