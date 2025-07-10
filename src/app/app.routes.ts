import { Routes } from '@angular/router';
import { AddDetailsComponent } from './add-details/add-details.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';

export const routes: Routes = [

        { path: '',component: ViewDetailsComponent},
        { path: 'add',component: AddDetailsComponent},
        { path: 'view',component: ViewDetailsComponent},
        { path: 'update',component: UpdateDetailsComponent}

];
