import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Config, Menu } from '../menu/types';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean = false;
    userName: string = "";
    isAdmin: boolean = false;

    options: Config = { multi: false };
  
    menus: Menu[] = [
      { 
        name: 'Visitors',
        iconClass: 'keyboard_arrow_down',
        active: false,
        submenu: [
          { name: 'Visitor List', url: '/visitors/visitorlist' },
          { name: 'Visitor Log', url: '/visitors/visitorlog' },
        ]
      },
      { 
        name: 'Student',
        iconClass: 'keyboard_arrow_down',
        active: false,
        submenu: [
          { name: 'Student List', url: '/students/studentlist' },
          { name: 'Student Log', url: '/students/studentlog' },
          { name: 'Parents', url: '/students/parents' },
          { name: 'Relatives', url: '/students/relatives' },
        ]
      },
      { 
        name: 'Teachers',
        iconClass: 'keyboard_arrow_down',
        active: false,
        submenu: [
          { name: 'Teacher List', url: '/teachers/teacherlist' },
          { name: 'Teacher Log', url: '/teachers/teacherlog' },
        ]
      },
      { 
        name: 'Settings',
        iconClass: 'home',
        active: false,
        submenu: [
          { name: 'Pickup/Drop off Reasons', url: '/customers' },
          { name: 'Visitor Types', url: '/dashboard/teacherlist' },
          { name: 'Parent Types', url: '/dashboard/teacherlist' },
          { name: 'Relative Types', url: '/dashboard/teacherlist' },
          { name: 'Incident', url: '/dashboard/teacherlist' },
        ]
      },
      { 
        name: 'Account',
        iconClass: 'home',
        active: false,
        submenu: [
          { name: 'User Information', url: '/customers' },
          { name: 'Password  Reset', url: '/dashboard/teacherlist' },
        ]
      },  
    ];

    private autoLogoutSubscription: Subscription = new Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public spinnerService: SpinnerService,
        private authService: AuthenticationService,
        private authGuard: AuthGuard, private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.matIconRegistry.addSvgIcon(
            "teacher",
            this.domSanitizer.bypassSecurityTrustResourceUrl("src/assets/teacher.svg")
          );
    }

    ngOnInit(): void {
        const user = this.authService.getCurrentUser();

        this.isAdmin = user.isAdmin;
        this.userName = user.fullName;

        // Auto log-out subscription
        const timer$ = timer(2000, 5000);
        this.autoLogoutSubscription = timer$.subscribe(() => {
            this.authGuard.canActivate();
        });
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }
}
