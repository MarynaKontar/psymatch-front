import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IdentityRevealedValidatorDirective} from './identity-revealed.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IdentityRevealedValidatorDirective],
  exports: [IdentityRevealedValidatorDirective]
})
export class SharedModule { }
