import { Injectable } from '@angular/core';
import {API_URL} from '../../utils/config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendingTokensService {
  uri = `${API_URL}`;
  constructor(private http: HttpClient) { }

  createFriendsTokens(): void {
    this.http.get(this.uri + `/test/generateTokenList`).subscribe(
      tokens => {
        localStorage.setItem('friendsTokens', JSON.stringify(tokens));
      }
    );
  }

  getFriendsTokens() {
    if (localStorage.getItem('friendsTokens')) {
      return  JSON.parse(localStorage.getItem('friendsTokens'));
    }
  }
  setFriendsTokens(tokens: string[]) {
    if (tokens != null && tokens.length > 0) {
      localStorage.setItem('friendsTokens', JSON.stringify(tokens));
    }
  }
  // howManyTimesOpenInviteTokenLinks(): number {
  //   return +sessionStorage.getItem('howManyTimesOpenInviteTokenLinks');
  // }
  // setHowManyTimesOpenInviteTokenLinks(): number {
  //   const t = sessionStorage.getItem('howManyTimesOpenInviteTokenLinks'); // null 1
  //   console.log('t: ', t);
  //   const k = this.getIfNotChangeHowManyTimesOpenInviteTokenLinks() ? 1 : 0;
  //   console.log('k: ', k);
  //
  //   // if (t != null && !isNaN(+t) && k === 1) {
  //
  //   // }
  //   const n = (t != null && !isNaN(+t)) ? +t + 1 - k : 1 - k;
  //   console.log('n: ', n);
  //   sessionStorage.setItem('howManyTimesOpenInviteTokenLinks', n.toString());
  //   return n;
  // }
  // setIfNotChangeHowManyTimesOpenInviteTokenLinks(ifNotChange: boolean) {
  //   if (ifNotChange) {
  //     sessionStorage.setItem('ifNotChangeHowManyTimesOpenInviteTokenLinks', 'true');
  //   } else { sessionStorage.removeItem('ifNotChangeHowManyTimesOpenInviteTokenLinks'); }
  //   console.log('setIfNotChangeHowManyTimesOpenInviteTokenLinks: ', sessionStorage.getItem('ifNotChangeHowManyTimesOpenInviteTokenLinks'));
  // }
  // getIfNotChangeHowManyTimesOpenInviteTokenLinks(): boolean {
  //   return sessionStorage.getItem('ifNotChangeHowManyTimesOpenInviteTokenLinks') === 'true';
  // }
}
