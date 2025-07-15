import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MasterService } from '../Service/master.service';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-details',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    IconFieldModule,
    InputTextModule,
    ToastModule,
    MultiSelectModule,
    FormsModule,
  ],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css',
  providers: [MessageService],
})
export class ViewDetailsComponent implements OnInit {
  detailsFromDb: any; //to hold the all data from db

  first = 0;

  rows = 10;

  loading: boolean = true;

  //for select date filter select box
  dateFilterOptions: any;

  dateFilterValue: any[] = [];

  constructor(
    private sObj: MasterService,
    public msgObj: MessageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.sObj.getAll().subscribe((res) => {
      this.loading = false;
      this.detailsFromDb = res;
      this.dateFilterOptions = this.getUniqueDates(res);
      console.log(this.dateFilterOptions);
    });
  }

  refreshTableData() {
    this.loading = true;
    this.sObj.getAll().subscribe((res) => {
      this.loading = false;
      this.detailsFromDb = res;
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.detailsFromDb
      ? this.first + this.rows >= this.detailsFromDb.length
      : true;
  }

  isFirstPage(): boolean {
    return this.detailsFromDb ? this.first === 0 : true;
  }

  //function to hit a localhost:4000/update url.
  updateDetail(serialId: any) {
    console.log(serialId);
    //hit route of updateDetails component

    this.router.navigate(['/update'], {
      queryParams: { inputSerialId: serialId },
    });
  }
  deleteDetail(serialId: any) {
    console.log(serialId);
    this.sObj.deleteBySerialId(serialId).subscribe((res) => {
      //to show the toaster
      this.msgObj.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Data is deleted successfully...',
        life: 2000,
      });
      this.refreshTableData();
    });
  }

  //function to get unique values of date in the array of object.
  getUniqueDates(data: any): string[] {
    const uniqueDates = new Set<string>();

    for (const item of data) {
      if (item.Date) {
        uniqueDates.add(item.Date);
      }
    }

    return Array.from(uniqueDates);
  }

  goToAddNewDetails() 
  {
    this.router.navigate(['/add']);
  }

  clearFilter(table: any) {
    this.dateFilterValue = [];
    //logic to reset the table
    table.clear(); // clears all filters, global and column-specific
  }
}
