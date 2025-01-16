import { Component,Inject,ViewEncapsulation   } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-edit-user-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EditUserModalComponent {
  dataUser: any;
  cargos: any[] = [];
  departamentos: any[] = [];
  selectedDepartamentoId: number | null = null; 
  selectedCargoId: number | null = null;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { row: any; cargos: any[]; departamentos: any[] }
  ) {
    this.dataUser = data.row;
    this.cargos = data.cargos;
    this.departamentos = data.departamentos;

    this.selectedDepartamentoId = this.dataUser.departamento?.idDepartamento || null;
    this.selectedCargoId = this.dataUser.cargo?.idCargo || null;
  }

  onCargoChange(event: Event): void {
    const selectedCargo = event.target as HTMLSelectElement;
    const selectedValue = selectedCargo.value;
  
    const selectedDepartamento = this.cargos.find(
      dep => dep.idCargo === +selectedValue
    );
    if (selectedDepartamento) {
      this.dataUser.cargo = selectedDepartamento; 
    }
  }

  onDepartamentoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; 
    const selectedValue = selectElement.value; 
  
    const selectedDepartamento = this.departamentos.find(
      dep => dep.idDepartamento === +selectedValue
    );
    if (selectedDepartamento) {
      this.dataUser.departamento = selectedDepartamento; 
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
      const dataToSave = {
        ...this.dataUser,
        idDepartamento: this.dataUser.departamento.idDepartamento,
        idCargo: this.dataUser.cargo.idCargo,
      };
    this.apiService.updateUsers(dataToSave).subscribe(response => {
      console.log('Respuesta del servidor:', response);
      if (response.status === 201) {
        this.dialogRef.close({ success: 'success', message: response.message });
      } else {
        this.dialogRef.close({ success: 'error', message: response.message });
      }
    });
  }
}
