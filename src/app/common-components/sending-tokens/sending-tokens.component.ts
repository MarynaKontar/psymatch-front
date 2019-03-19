import {Component, Inject, OnInit, ElementRef, ViewChild} from '@angular/core';
import {URL} from '../../utils/config';
import {DOCUMENT} from '@angular/common';
import {ValueCompatibilityService} from '../../testing/value-compatibility.service';
import {RegistrationService} from '../../registration/registration.service';

@Component({
  selector: 'app-sending-tokens',
  templateUrl: './sending-tokens.component.html',
  styleUrls: ['./sending-tokens.component.scss']
})
export class SendingTokensComponent implements OnInit {
  @ViewChild('openModalSendTokens') openModal: ElementRef; // in html <button id="openModalSendTokens" ...>

  private dom: Document;
  private uri = `${URL}`;
  links: string[];
  private isTokenLinkVisible = false;

  constructor(@Inject(DOCUMENT) dom: Document,
              private valueCompatibilityService: ValueCompatibilityService,
              private registrationService: RegistrationService) {
    this.dom = dom;
  }

  ngOnInit() {
    this.getFriendsTokens();
    if (this.registrationService.isHaveAgeAndGender()) {
      this.openModal.nativeElement.click(); // @ViewChild
    }
  }

  private getFriendsTokens() {
    const tokens = this.valueCompatibilityService.getFriendsTokens();
    if (tokens) {
      this.links = [this.uri + '/value-compatibility-test?token=' + tokens[0],
                    this.uri + '/value-compatibility-test?token=' + tokens[1],
                    this.uri + '/value-compatibility-test?token=' + tokens[2]];
    }
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

}
