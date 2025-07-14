import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AddDetails } from '../Models/Data.model';
import { MasterService } from '../Service/master.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-details',
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    DatePickerModule,
    ToastModule 
  ],
  providers:[MessageService],
  templateUrl: './add-details.component.html',
  styleUrl: './add-details.component.css',
})
export class AddDetailsComponent implements OnInit {
  detailsObj: AddDetails;
  maxDate: any;
  serialIdToInsert: string;

  constructor(private sObj: MasterService,public msgObj:MessageService,public router:Router) 
  {
    //creating a obbject to store a form data
    this.detailsObj = new AddDetails();

    this.serialIdToInsert = '';
    const today = new Date();
    // console.log(today);
    
    this.detailsObj.date = today;
    this.maxDate = today;
  }

  ngOnInit(): void {
    //logic to get Serial Id of next row
    this.sObj.getAll().subscribe((entries) => {
      console.log(entries);
      const maxId =
        entries.length > 0
          ? Math.max(...entries.map((e) => +e.Serial_Id || 0))
          : 0;

      this.serialIdToInsert = (maxId + 1).toString();

      console.log(this.serialIdToInsert);
      this.detailsObj.serialId = this.serialIdToInsert;
      //logic to set a todays date to the input tag
    });
  }

  getNextSertialId() {
    //logic to get Serial Id of next row
    this.sObj.getAll().subscribe((entries) => {
      console.log(entries);
      const maxId =
        entries.length > 0
          ? Math.max(...entries.map((e) => +e.Serial_Id || 0))
          : 0;

      this.serialIdToInsert = (maxId + 1).toString();

      // console.log(this.serialIdToInsert);
      this.detailsObj.serialId = this.serialIdToInsert;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Model-bound object:', this.detailsObj); // [(ngModel)] data

    // const year = this.detailsObj.date.getFullYear();
    // const month = String(this.detailsObj.date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    // const day = String(this.detailsObj.date.getDate()).padStart(2, '0');
    // const formattedDate = `${year}-${month}-${day}`;
    //   console.log(formattedDate);
      
      this.sObj.addData(this.detailsObj).subscribe({
        next: (res) => {
          console.log('Success:', res);

          //to show the toaster
          this.msgObj.add({ severity: 'success', summary: 'Success', detail: 'Data is inserted successfully...', life: 2000 });

          form.resetForm();

          setTimeout(() => {
            this.detailsObj = new AddDetails();
            this.detailsObj.date = new Date();
            this.maxDate = new Date();
            this.getNextSertialId();
          }, 1000);
        },
        error: (err) => {
          console.error('Error:', err);

          alert('Failed to save the data.');
        },
      });
    }
  }

 goToViewDetails()
  {
    this.router.navigate(['/view']);
  }



  // getDataToUpdate(){

  // //   const inputDate = "11/8/1997"; // MM/DD/YYYY
  // //   const [month, day, year] = inputDate.split("/").map(part => parseInt(part));
  // //   // Format to YYYY-MM-DD
  // //   const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // // // Set the value
  // // dateInput.value = formattedDate;

  //   this.employee.fullName= 'Rohit';
  //   this.employee.empId= 'EMP223';
  //   this.employee.email= 'shubham@gmail.com';
  //   this.employee.phone= '8787878787';
  //   this.employee.dob= '2024-11-11'; //we have to send the value of this format to the input tag
  //   this.employee.gender= 'Male';

  // }

  // resetForm(formRef:any)
  // {

  //   // alert("reset is called");

  //   formRef.reset();

  //   this.employee = {
  //     fullName: '',
  //     empId: '',
  //     email: '',
  //     phone: '',
  //     dob: '',
  //     gender: '-1',
  //   }

  // }

  // updateItem(id:any)
  // {
  //   console.log(id);

  // }

  // deleteItem(id:any){

  //    console.log(id);

  // }
}
