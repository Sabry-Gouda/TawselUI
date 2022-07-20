import {Component, OnInit} from '@angular/core';
import {Status} from "../../models/status";
import {StatusService} from "../../services/status.service";
import {OrderService} from "../../services/order.service";
import {data} from "jquery";


@Component({
  selector: 'app-home-page-cards',
  templateUrl: './home-page-cards.component.html',
  styleUrls: ['./home-page-cards.component.css']
})
export class HomePageCardsComponent implements OnInit {

  statuses: Status[] = [];
  ordersCount: number = 0
  counts:number []=[];

  constructor(private statusService: StatusService, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getAllStatuses();
    this.getNumberOfProductByStatus()
  }

  private getAllStatuses() {
    this.statusService
      .getAll()
      .subscribe((data) => {
        this.statuses = data
      }, (error) => {
        console.log(error);
      });
  }

  public getNumberOfProductByStatus() : any {
    for (let i of this.statuses)
    {
      
      this.statusService.filterByStatus(i.id)
      .subscribe((data:any) => {
        console.log(data);
        
         this.counts.push(data)
      },error => {
        console.log(error)
      })
    }
  }

}
