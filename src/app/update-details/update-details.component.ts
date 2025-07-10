import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-details',
  imports: [],
  templateUrl: './update-details.component.html',
  styleUrl: './update-details.component.css'
})
export class UpdateDetailsComponent implements OnInit {
  
  id: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      console.log('Query param id:', this.id);
      // Use the id as needed
    });
  }

}
