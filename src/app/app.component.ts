import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

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
        if (event['url'] == '/landing-page' || event['url'] == '/login' || event['url'] == '/' ) {
          this.show = false;
        } else {
          // console.log("NU")
          this.show = true;
        }
      }
    });
  }
}
