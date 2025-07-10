import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddDetails } from '../Models/Data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  baseUrl = 'https://sheetdb.io/api/v1/vt227ch0gi6em'; // replace with your real SheetDB API URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addData(inputData: AddDetails): Observable<any> 
  {

    let inputObject;
    // console.log(inputData);
    // console.log(inputObject);
   
    //logic to convert date objecje in string of following format yyyy--mm--dd

    const date = new Date(inputData.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
   
    inputObject = {
      Serial_Id: inputData.serialId,
      Full_Name: inputData.fullName,
      Purpose: inputData.purpose,
      Date: formattedDate,
      Total_Amount: inputData.totalAmount,
      T_Amount: inputData.tAmount,
    };

    return this.http.post(this.baseUrl, { data: inputObject });
  }


   updateBySerialId(serialId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Serial_Id/${serialId}`, { data });
  }

  deleteBySerialId(serialId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Serial_Id/${serialId}`);
  }

  getDetailBySerialId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?Serial_Id=${id}`);
  }

}
