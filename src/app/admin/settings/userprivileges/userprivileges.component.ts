import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import { Page } from 'src/app/models/page';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-userprivileges',
  templateUrl: './userprivileges.component.html',
  styleUrls: ['./userprivileges.component.css']
})
export class UserprivilegesComponent implements OnInit {

  pages: Page[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.getAllPages();
  }

  getAllPages() {
    this.pageService.getAll().subscribe(
      data => { this.pages = data },
      err => console.log(err));
  }

  savePermissionGroup(): void {

  }

}
