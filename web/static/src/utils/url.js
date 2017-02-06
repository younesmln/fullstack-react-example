import { BASE_PATH } from './config';

const urls = {
  signup: `${BASE_PATH}/api/users`,
  login: `${BASE_PATH}/api/auth`,
};

/*
 appendPath(path){
 if (required(path)) throw Error("path should not be empty");
 if (!path.startsWith('/')) this.currentPath += '/';
 return this.currentPath += path;
 }
 */

export default urls;