import {Component, Inject, OnInit, ElementRef, ViewChild, HostBinding} from '@angular/core';
import {API_URL, URL} from '../../utils/config';
import {DOCUMENT} from '@angular/common';
import {ValueCompatibilityService} from '../../testing/value-compatibility.service';
import {RegistrationService} from '../../registration/registration.service';
import {LoginService} from '../../login/login.service';
import {SendingTokensService} from './sending-tokens.service';
import {LIMIT_TO_OPEN_INVITE_TOKEN_LINKS, TOKENS_HEADER, TOKENS_INVITE} from './sending-tokens';

@Component({
  selector: 'app-sending-tokens',
  templateUrl: './sending-tokens.component.html',
  styleUrls: ['./sending-tokens.component.scss']
})
export class SendingTokensComponent implements OnInit {
  @ViewChild('openModalSendTokens') openModal: ElementRef; // in html <button id="openModalSendTokens" ...>

  @HostBinding('class.is-open')
  isOpen = false; // for open this component on button click in another component(UserAccountComponent). Not work yet
  // https://stackblitz.com/edit/angular-communication-1?file=app%2Fside-bar-toggle%2Fside-bar-toggle.component.ts

  private dom: Document;
  private uri = `${URL}`;
  tokens: string[];
  links: string[] = [];
  howManyTimesOpenInviteTokenLinks: number;
  limitToOpenInviteTokenLinks = +`${LIMIT_TO_OPEN_INVITE_TOKEN_LINKS}`;
  tokensHeader = `${TOKENS_HEADER}`;
  tokensInvite = `${TOKENS_INVITE}`;

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
    if (this.registrationService.isHaveAgeAndGender() && this.isTokenLinkVisible &&
        this.sendingTokensService.howManyTimesOpenInviteTokenLinks() < this.limitToOpenInviteTokenLinks) {
      console.log('SendingTokensComponent visible');
      this.getFriendsLinks();
      this.setHowManyTimesOpenInviteTokenLinks();
      this.openModal.nativeElement.click(); // @ViewChild
    }
  }

  open() {
    this.openModal.nativeElement.click();
  }
  private getFriendsLinks() {
       if (this.tokens) {
         this.tokens.forEach(token => this.links.push(this.uri + '/value-compatibility-test?token=' + token));
    }
  }
  private setHowManyTimesOpenInviteTokenLinks(): void {
    // const t = sessionStorage.getItem('howManyTimesOpenInviteTokenLinks');
    // console.log('t: ', t);
    // console.log('+t: ', +t);
    // console.log('t!=null: ', t != null);
    // console.log('!isNan(t): ', !isNaN(+t));

    this.howManyTimesOpenInviteTokenLinks = this.sendingTokensService.setHowManyTimesOpenInviteTokenLinks();
  }

  copyElementText(id) {
    let element = null; // Should be <textarea> or <input> (HTMLTextAreaElement, HTMLInputElement)
    let token;
    try {
      element = this.dom.getElementById(id);
      // if ( !this.dom.charset.includes(id) ) {
      //   token = this.dom.createTextNode('\n' + id);
      //   element.appendChild(token);
      //   console.log(element);
      // }
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
      // element.removeChild(token);
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
