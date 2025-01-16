import { Component,Inject,ViewEncapsulation   } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-crear-user-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './crear-user-modal.component.html',
  styleUrl: './crear-user-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CrearUserModalComponent {
  cargos: any[] = [];
  departamentos: any[] = [];
  dataCreate: any = {
    usuario: '',
    primerNombre: '',
    primerApellido: '',
    segundoNombre: '',
    segundoApellido: '',
    email: '',
    idCargo: null,
    idDepartamento: null,
    estado: 1
  };
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CrearUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { row: any; cargos: any[]; departamentos: any[] }
  ) {
    this.cargos = data.cargos;
    this.departamentos = data.departamentos;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
  this.apiService.createUsers(this.dataCreate).subscribe(response => {
    
    if(response.status == 201)
      this.dialogRef.close({ success: 'success', message: 'Se guardo con exito el usuario' });
    else
      this.dialogRef.close({ success: 'error', message: response.message });
  });
  }
}
