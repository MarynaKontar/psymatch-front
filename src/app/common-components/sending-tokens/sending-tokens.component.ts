import {Component, Inject, OnInit} from '@angular/core';
import {URL} from '../../utils/config';
import {DOCUMENT} from '@angular/common';
import {ValueCompatibilityService} from '../../testing/value-compatibility.service';
import {RegistrationService} from '../../auth/registration/registration.service';
import {LoginService} from '../../auth/authentication/login.service';
import {SendingTokensService} from './sending-tokens.service';
import {TOKENS_HEADER, TOKENS_INVITE, TOKENS_NOT_EXIST, TOOLTIP} from './sending-tokens';

@Component({
  selector: 'app-sending-tokens',
  templateUrl: './sending-tokens.component.html',
  styleUrls: ['./sending-tokens.component.scss']
})
export class SendingTokensComponent implements OnInit {
  private dom: Document;
  private uri = `${URL}`;
  tokens: string[];
  links: string[] = [];
  error;
  tokensHeader = `${TOKENS_HEADER}`;
  tokensInvite = `${TOKENS_INVITE}`;
  tokensNotExist = `${TOKENS_NOT_EXIST}`;
  tooltip = `${TOOLTIP}`;

  private isTokenLinkVisible = false;

  constructor(@Inject(DOCUMENT) dom: Document,
              private valueCompatibilityService: ValueCompatibilityService,
              private registrationService: RegistrationService,
              private sendingTokensService: SendingTokensService,
              private loginService: LoginService) {
    this.dom = dom;
  }

  ngOnInit() {
    console.log('SendingTokensComponent');
    this.tokens = this.sendingTokensService.getFriendsTokens();
    this.isTokenLinkVisible = this.loginService.isValueCompatibilityTestPassed() && (this.tokens != null);
    if (this.registrationService.isAnonimRegistered() && this.isTokenLinkVisible) {
      console.log('SendingTokensComponent visible');
      this.getFriendsLinks();
    } else { this.error = this.tokensNotExist; }
  }

  private getFriendsLinks() {
    if (this.tokens) {
      this.tokens.forEach(token => this.links.push(this.uri + '/value-compatibility-test?token=' + token));
    }
  }

  copyElementText(id) {
    let element = null; // Should be <textarea> or <input> (HTMLTextAreaElement, HTMLInputElement)
    let token;
    try {
      element = this.dom.getElementById(id);
      token = (element.value.includes(id)) ? '' : '\n' + id;
      element.value = element.value + token;

      const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      const text1 = element.value.replace(exp, '<a href=\'$1\'>$1</a>');
      const exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      element.innerHTML = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');

      element.select(); // выделяет текст
      this.dom.execCommand('copy'); // копирует выделенный текст
      console.log(element);
      console.log(element.value);
    }
    finally {
      this.dom.getSelection().removeAllRanges;
    }
  }
}










// @ViewChild('openModalSendTokens') openModal: ElementRef; // in html <button id="openModalSendTokens" ...>
//
// @HostBinding('class.is-open')
// isOpen = false; // for open this component on button click in another component(UserAccountComponent). Not work yet
// // https://stackblitz.com/edit/angular-communication-1?file=app%2Fside-bar-toggle%2Fside-bar-toggle.component.ts
//
// private dom: Document;
// private uri = `${URL}`;
// tokens: string[];
// links: string[] = [];
// howManyTimesOpenInviteTokenLinks: number;
// limitToOpenInviteTokenLinks = +`${LIMIT_TO_OPEN_INVITE_TOKEN_LINKS}`;
// tokensHeader = `${TOKENS_HEADER}`;
// tokensInvite = `${TOKENS_INVITE}`;
//
// private isTokenLinkVisible = false;
//
// constructor(@Inject(DOCUMENT) dom: Document,
//   private valueCompatibilityService: ValueCompatibilityService,
//   private registrationService: RegistrationService,
//   private sendingTokensService: SendingTokensService,
//   private loginService: LoginService) {
//   this.dom = dom;
// }
//
// ngOnInit() {
//   console.log('SendingTokensComponent');
//   this.tokens = this.sendingTokensService.getFriendsTokens();
//   this.isTokenLinkVisible = this.loginService.isValueCompatibilityTestPassed() && (this.tokens != null);
//   if (this.registrationService.isAnonimRegistered() && this.isTokenLinkVisible &&
//     this.sendingTokensService.howManyTimesOpenInviteTokenLinks() < this.limitToOpenInviteTokenLinks) {
//     console.log('SendingTokensComponent visible');
//     this.getFriendsLinks();
//     this.setHowManyTimesOpenInviteTokenLinks();
//     this.openModal.nativeElement.click(); // @ViewChild
//   }
// }
//
// open() {
//   this.openModal.nativeElement.click();
// }
// private getFriendsLinks() {
//   if (this.tokens) {
//     this.tokens.forEach(token => this.links.push(this.uri + '/value-compatibility-test?token=' + token));
//   }
// }
// private setHowManyTimesOpenInviteTokenLinks(): void {
//   // const t = sessionStorage.getItem('howManyTimesOpenInviteTokenLinks');
//   // console.log('t: ', t);
//   // console.log('+t: ', +t);
//   // console.log('t!=null: ', t != null);
//   // console.log('!isNan(t): ', !isNaN(+t));
//
//   this.howManyTimesOpenInviteTokenLinks = this.sendingTokensService.setHowManyTimesOpenInviteTokenLinks();
// }
//
// copyElementText(id) {
//   let element = null; // Should be <textarea> or <input> (HTMLTextAreaElement, HTMLInputElement)
//   let token;
//   try {
//     element = this.dom.getElementById(id);
//     // if ( !this.dom.charset.includes(id) ) {
//     //   token = this.dom.createTextNode('\n' + id);
//     //   element.appendChild(token);
//     //   console.log(element);
//     // }
//     token = (element.value.includes(id)) ? '' : '\n' + id;
//     element.value = element.value + token;
//
//     const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
//     const text1 = element.value.replace(exp, '<a href=\'$1\'>$1</a>');
//     const exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
//     element.innerHTML = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
//
//     element.select(); // выделяет текст
//     this.dom.execCommand('copy'); // копирует выделенный текст
//     console.log(element);
//     console.log(element.value);
//   }
//   finally {
//     this.dom.getSelection().removeAllRanges;
//     // element.removeChild(token);
//   }
// }
//
// toggle() {
//   this.isOpen = !this.isOpen;
// }
