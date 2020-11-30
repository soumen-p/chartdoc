import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show: boolean = false;
  title = 'ChartDoc';

  constructor(private router: Router) {

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/' || event['url'] == '/login' || event['url']=='/create-password') {
          this.show = false;
        } else {
          //console.log("NU ", event['url'])
          router.events.pipe(
            filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
          ).subscribe((event: NavigationEnd) => {
            switch (event.urlAfterRedirects) {
              case "/":
              case "/login":
              case "/forget-password":
                this.show = false;
                break;

              default:
                this.show = true;
                break;
            }
          })
        }
      }
    });

  }

  resolved(captchaResponse: string, res) {
    console.log(`Resolved response token: ${captchaResponse}`); 
  }

}
//event['url'] == '/landing-page' ||