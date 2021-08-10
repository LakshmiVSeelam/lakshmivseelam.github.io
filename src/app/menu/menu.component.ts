import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  NavigationEnd
} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pagename
  nav_colors = {
    '/home': '#ecca07',
    '/': '#ecca07'
  }
  constructor(private router: Router) {
    // this.pagename = this.router.url
    this.router.events.subscribe(value => {
      // debugger
      if(value instanceof NavigationEnd){
        this.pagename = value.url;
      }
      
    });
    // debugger
  }

  ngOnInit(): void {}

}
