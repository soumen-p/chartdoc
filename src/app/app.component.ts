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

  constructor(private router: Router){
    //console.log(router.events);

    /* router.events.forEach((event) => {
          console.log("NU ", event['url'])
          router.events.pipe(
            filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
          console.log("NU ", event['url'])
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
    }); */


    
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ( event['url'] == '/' || event['url'] == '/login') {
          this.show = false;
        } else {
          console.log("NU ", event['url'])
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
}
//event['url'] == '/landing-page' ||