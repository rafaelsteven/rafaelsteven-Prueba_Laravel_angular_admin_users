import { Component, Inject,ViewEncapsulation  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../service/api.service';
import { TableUserComponent } from '../table-user/table-user.component';
@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DeleteUserModalComponent {
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<DeleteUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.apiService.deleteUsers(this.data.idUser).subscribe(
      (response: any) => {
        if(response.status == 201)
          this.dialogRef.close({ success: 'success', message: response.message });
        else
          this.dialogRef.close({ success: 'error', message: response.message });
      },
      (error) => {
        this.dialogRef.close({ success: 'error', message: 'No se pudo eliminar el usuario.' });
      }
    );
  }
}
