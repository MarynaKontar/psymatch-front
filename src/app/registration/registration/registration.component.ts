import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../profile/user';
import {RegistrationService} from '../registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../login/login.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('openModalRegistration') openModal: ElementRef; // in html <button id="openModalRegistration" ...>
  registeredUser = new User();
  isNeedToBeRegistered = false;
  returnUrl: string;
  private retrieveDataResolver;
  constructor(private registrationService: RegistrationService,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private location: Location) { }

  ngOnInit() {
    if (this.isNew()) {
      this.openModal.nativeElement.click(); // @ViewChild
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  }

  registerUser() {
    // SYNCHRONOUS: doing a serial sequence of async tasks with PROMISE, using chaining "then" calls.
    // without Promise, all commands async, and there is can be "navigate" before retrieve data from server
    console.log('registerUser(): ', this.registeredUser);
    this.retrieveUserPromise().then(() => { this.afterSaveUserActions(); });
  }

  isNew(): boolean {
    console.log('isNew: ' + !this.registrationService.isRegistered());
    return !this.registrationService.isRegistered();
  }

  private afterSaveUserActions(): void {
    console.log('returnUrl: ' + this.returnUrl);
    location.reload();
  }
  private saveUser(): void {
    console.log('saveUser()');
    this.registrationService.registerNewUser(<User> this.registeredUser)
      .subscribe(data => {
        this.registrationService.setIsRegistered(data);
        this.registeredUser = data;
        this.isNeedToBeRegistered = this.isNew();

        if (this.loginService.ifHaveTokenInLocalStorage()) {
          this.router.navigateByUrl(this.returnUrl);
        } else { this.router.navigate(['login']); }

        this.retrieveDataResolver(); // <--- This must be called as soon as the data are ready to be displayed
      });
  }
  private retrieveUserPromise(): Promise<any> {
    console.log('retrieveUserPromise()');
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.saveUser();
    });
  }
}
