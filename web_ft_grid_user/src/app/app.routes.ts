import { Routes } from '@angular/router';
import { TableUserComponent } from './components/table-user/table-user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: TableUserComponent },
];
