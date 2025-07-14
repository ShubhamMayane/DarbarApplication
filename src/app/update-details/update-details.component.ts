import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AddDetails, UpdateDetails } from '../Models/Data.model';
import { MasterService } from '../Service/master.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-details',
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    DatePickerModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './update-details.component.html',
  styleUrl: './update-details.component.css',
})
export class UpdateDetailsComponent implements OnInit {
  serialId: any;
  detailsObj: UpdateDetails;
  maxDate: any;

  constructor(
    private route: ActivatedRoute,
    private sObj: MasterService,
    public msgObj: MessageService,
    private router: Router
  ) {
    //creating a obbject to store a form data
    this.detailsObj = new UpdateDetails();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.serialId = params.get('inputSerialId');
      console.log('Query param SerialId:', this.serialId);
      // alert(this.serialId);

      console.log(this.serialId);

      //calling getDetailBy serialId
      this.sObj.getDetailBySerialId(this.serialId).subscribe((res) => {

        console.log(res);
        // console.log(res[0].Full_Name);
        this.detailsObj.fullName = res.Full_Name;
        this.detailsObj.date = new Date(res.Date);
        this.detailsObj.purpose = res.Purpose;
        this.detailsObj.totalAmount = res.Total_Amount;
        this.detailsObj.tAmount = res.T_Amount;
        console.log(this.detailsObj);
      });
    });
  }

  onUpdate(form: NgForm) {
    if (form.valid) {
      console.log('Model-bound object:', this.detailsObj); // [(ngModel)] data

      this.sObj.updateBySerialId(this.serialId, this.detailsObj).subscribe({
        next: (res) => {
          console.log('Success:', res);

          //to show the toaster
          this.msgObj.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Data is Updated successfully...',
            life: 2000,
          });

          setTimeout(() => {
            form.resetForm();
            this.router.navigate(['/view']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error:', err);

          alert('Failed to save the data.');
        },
      });
    }
  }


  backToViewPage()
  {
    this.router.navigate(['/view']);
  }
}
