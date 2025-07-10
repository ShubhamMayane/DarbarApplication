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
@Component({
  selector: 'app-view-details',
  imports: [
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputTextModule,
    ToastModule,
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

  constructor(private sObj: MasterService, public msgObj: MessageService,public router: Router) {}

  ngOnInit(): void {
    this.sObj.getAll().subscribe((res) => {
      this.loading = false;
      this.detailsFromDb = res;
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

  updateDetail(serialId: any) {
    console.log(serialId);
    //hit route of updateDetails component 

     this.router.navigate(['/update'], { queryParams: { inputSerialId: serialId } });

    


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
}
