import {Component, Inject, OnInit} from '@angular/core';
import {URL} from '../../utils/config';
import {DOCUMENT} from '@angular/common';
import {ValueCompatibilityService} from '../../testing/value-compatibility.service';
import {RegistrationService} from '../../auth/registration/registration.service';
import {LoginService} from '../../auth/authentication/login.service';
import {SendingTokensService} from './sending-tokens.service';
import {LogService} from '../services/log.service';
import {ComponentName} from '../services/component-name';
import {
  TOKENS_HEADER,
  TOKENS_INVITE,
  TOKENS_NOT_EXIST,
  TOOLTIP,
  TOOLTIP_COPY
} from './sending-tokens';

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
  tooltip_copy = `${TOOLTIP_COPY}`;

  private isTokenLinkVisible = false;
  private isIncompleteRegistered;

  constructor(@Inject(DOCUMENT) dom: Document,
              private valueCompatibilityService: ValueCompatibilityService,
              private registrationService: RegistrationService,
              private sendingTokensService: SendingTokensService,
              private loginService: LoginService,
              private log: LogService) {
    this.dom = dom;
  }

  ngOnInit() {
    this.log.log(ComponentName.SENDING_TOKENS, `ngOnInit`);
    this.tokens = this.sendingTokensService.getFriendsTokens();
    this.isTokenLinkVisible = this.loginService.isValueCompatibilityTestPassed() && (this.tokens != null);
    this.isIncompleteRegistered = this.registrationService.isIncompleteRegistered();
    if (this.isIncompleteRegistered && this.isTokenLinkVisible) {
      this.log.log(ComponentName.SENDING_TOKENS, `ngOnInit: isTokenLinkVisible: ${this.isTokenLinkVisible}`);
      this.getFriendsLinks();
    } else {
      this.log.log(ComponentName.SENDING_TOKENS, `ngOnInit: isTokenLinkVisible: ${this.isTokenLinkVisible}`);
      this.error = this.tokensNotExist;
    }
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
    }
    finally {
      this.dom.getSelection().removeAllRanges;
    }
  }
}
