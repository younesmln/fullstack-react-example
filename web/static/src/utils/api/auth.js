import urls from '../url';
import { fetch } from '../helpers';

const auth = {
  signUp(values){
    return fetch(urls.signup, {method: 'post', body: {user: values}})
  },
  login(values){
    return fetch(urls.login, {method: 'post', body: {user: values}})
  },
  checkToken(token){
    const authHeader = {"Authorization": `Bearer ${token}`};
    return fetch(urls.login, {headers: authHeader})
  }
};

export default auth;