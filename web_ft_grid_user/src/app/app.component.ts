import { Component } from '@angular/core';
// import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, // Importar el componente standalone
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web_ft_grid_user';
}
