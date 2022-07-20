import {Component, OnInit} from '@angular/core';
import {Status} from "../../models/status";
import {StatusService} from "../../services/status.service";
import {OrderService} from "../../services/order.service";
import {data} from "jquery";
import { StatusCounts } from 'src/app/models/status-counts';


@Component({
  selector: 'app-home-page-cards',
  templateUrl: './home-page-cards.component.html',
  styleUrls: ['./home-page-cards.component.css']
})
export class HomePageCardsComponent implements OnInit {

  statuses: StatusCounts[] = [];


  constructor(private statusService: StatusService, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getAllStatuses();

  }

  private getAllStatuses() {
    this.statusService
      .getStatusCount()
      .subscribe((data) => {
        this.statuses = data
        console.log(data);

      }, (error) => {
        console.log(error);
      });
  }



}
