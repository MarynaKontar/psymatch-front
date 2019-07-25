import { Injectable } from '@angular/core';
import {API_URL} from '../../utils/config';
import {HttpClient} from '@angular/common/http';
import {LogService} from '../services/log.service';
import {ComponentName} from '../services/component-name';

@Injectable({
  providedIn: 'root'
})
export class SendingTokensService {
  uri = `${API_URL}`;
  constructor(private http: HttpClient,
              private log: LogService) { }

  createFriendsTokens(): void {
    this.log.log(ComponentName.SENDING_TOKENS_SERVICE, `createFriendsTokens()`);
    this.http.get(this.uri + `/test/generateTokenList`).subscribe(
      tokens => {
        localStorage.setItem('friendsTokens', JSON.stringify(tokens));
      }
    );
  }

  getFriendsTokens() {
    if (localStorage.getItem('friendsTokens')) {
      this.log.log(ComponentName.SENDING_TOKENS_SERVICE, `getFriendsTokens()`);
      return  JSON.parse(localStorage.getItem('friendsTokens'));
    }
  }
  setFriendsTokens(tokens: string[]) {
    if (tokens != null && tokens.length > 0) {
      this.log.log(ComponentName.SENDING_TOKENS_SERVICE, `setFriendsTokens()`);
      localStorage.setItem('friendsTokens', JSON.stringify(tokens));
    }
  }
}
