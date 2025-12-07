import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs';
import { SharedModule } from 'app/modules/shared/shared-module';

@Component({
  selector: 'app-root',
  imports: [SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isHandset$;
  freightExpanded = false;

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private router: Router
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = () => event.url === '/login'; // Or your specific login route
    })
  }

  public isLoginPage: (() => boolean) | undefined;
}
