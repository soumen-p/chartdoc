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
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ( event['url'] == '/login' || event['url'] == '/') {
          this.show = false;
        } else {
          // console.log("NU")
          router.events.pipe(
            filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
          if(event.urlAfterRedirects=="/" || event.urlAfterRedirects=='/login'){
            this.show = false;
          }else{
            this.show = true;
          }
        })
          
        }
      }
    });
  }
}
//event['url'] == '/landing-page' ||