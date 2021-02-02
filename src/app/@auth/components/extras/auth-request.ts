
import { TOKEN_NAME } from './auth-service';
import { HttpHeaders  } from '@angular/common/http';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

export class AuthRequestOptions{
    private headers = new HttpHeaders({});
  constructor() {
    
    const token = localStorage.getItem(TOKEN_NAME);
    if(token) {
      this.headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
    }
  }

}