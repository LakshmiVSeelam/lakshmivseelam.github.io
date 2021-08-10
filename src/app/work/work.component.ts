import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  // hovered = false
  projects_data = [
    {"id": 1, "projectname": "Vehicle Rental Website", "link": "https://lakshmivseelam.github.io/rentalWebsite/", "imgUrl": "assets/images/website1.png", "b-color": "rgba(0, 0, 0, 0.9)"},
    {"id": 2, "projectname": "ISP provider Website", "link": "https://lakshmivseelam.github.io/broadband/", "imgUrl": "assets/images/website2.png", "b-color" : "rgba(255, 162, 0, 0.9)"},
    {"id": 3, "projectname": "Portal", "link": "https://portal.geniusott.com/", "imgUrl": "assets/images/website3.png", "b-color": "rgba(215, 26, 31, 0.9)"},
    {"id": 4, "projectname": "Promotel", "link": "https://promotel.in", "imgUrl": "assets/images/website4.png", "b-color": "rgba(0, 24, 84, 0.9)"}
  ]

  constructor() {

   }
  
  ngOnInit(): void {
  }

}
