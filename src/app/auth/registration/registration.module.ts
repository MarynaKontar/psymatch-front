import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { IncompleteRegistrationComponent } from './incomplete-registration/incomplete-registration.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
  ],
  exports: [RegistrationComponent, IncompleteRegistrationComponent],
  declarations: [RegistrationComponent, IncompleteRegistrationComponent],
  providers: [RegistrationService]
})
export class RegistrationModule { }
