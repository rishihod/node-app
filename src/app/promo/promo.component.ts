import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {
    title1 = "Sitting down has never been healthier";
    title2 = "A Health Check that takes only 20 minutes";
  constructor() { }

  ngOnInit() {
  }

}
