import {Component, Inject, OnInit} from '@angular/core';
import {ValueCompatibilityService} from '../testing/value-compatibility.service';
import {URL} from '../utils/config';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-sending-tokens',
  templateUrl: './sending-tokens.component.html',
  styleUrls: ['./sending-tokens.component.scss']
})
export class SendingTokensComponent implements OnInit {

  private dom: Document;
  private uri = `${URL}`;
  links: string[];
  private isTokenLinkVisible = false;

  constructor(@Inject(DOCUMENT) dom: Document,
              private valueCompatibilityService: ValueCompatibilityService) {
    this.dom = dom;
  }

  ngOnInit() {
    this.getFriendsTokens();
  }

  private getFriendsTokens() {
    const tokens = this.valueCompatibilityService.getFriendsTokens();
    if (tokens) {
      this.links = [this.uri + '/user-test?token=' + tokens[0], this.uri + '/user-test?token=' + tokens[1],
        this.uri + '/user-test?token=' + tokens[2]];
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

      element.select();
      this.dom.execCommand('copy');
      console.log(element);
      console.log(element.value);
    }
    finally {
      this.dom.getSelection().removeAllRanges;
      // element.removeChild(token);
    }
  }

}
