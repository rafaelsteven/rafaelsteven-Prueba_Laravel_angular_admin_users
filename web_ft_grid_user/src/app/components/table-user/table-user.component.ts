import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { CrearUserModalComponent } from '../crear-user-modal/crear-user-modal.component';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  standalone: true,
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  imports: [
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    CommonModule, 
    FormsModule,
    HttpClientModule
  ],
  styleUrls: ['./table-user.component.scss'],
})
export class TableUserComponent {
  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'departamento', 'cargo', 'email', 'acciones'];


  dataSource: any[] = [];
  optionsCargos: any[] = [];
  optionsDepartamentos: any[] = [];

  selectedCargo: string | null = null;
  selectedDepartamento: string | null = null;
  totalUsers: number | null = null;
  selectedDepartment: string | null = null;
  selectedRole: string | null = null;
  data: any = {};
  constructor(public dialog: MatDialog,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.dataUser();
    this.dataCargo();
    this.dataDepartamento();
  }
  dataUser(){
    this.apiService.getDataUsers().subscribe((data: any) => {
      if(data.data.length >=0)
      {
      this.dataSource = Object.values(data.data);
      this.totalUsers = this.dataSource.length;
      }else{
      Swal.fire({
        title: 'Problemas al cargar los datos de usuarios',
        icon: 'error',
        draggable: true
      });
    }
    });
  }
  dataCargo(){
    this.apiService.getDataCargos().subscribe((data: any) => {
      this.optionsCargos = Object.values(data.data);
    });
  }
  dataDepartamento(){
    this.apiService.getDataDepartamentos().subscribe((data: any) => {
      this.optionsDepartamentos = Object.values(data.data);
    });
  }

  selectedValue: number = 0; 
  createUser() {
    const dialogRef = this.dialog.open(CrearUserModalComponent, {
      width: '60%',
      data: { cargos: this.optionsCargos, departamentos: this.optionsDepartamentos }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
      if (result) {
        Swal.fire({
          title: result.message,
          icon: result.success,
          draggable: true
        });
      }
    });
  }

  editUser(row: any): void {
    console.log( row);
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      width: '60%',
      data: {
        row: row,
        cargos: this.optionsCargos,
        departamentos: this.optionsDepartamentos,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
      if (result) {
        Swal.fire({
          title: result.message,
          icon: result.success,
          draggable: true
        });
      }
    });
  }

  deleteUser(row: any): void {
    const dialogRef = this.dialog.open(DeleteUserModalComponent, {
      width: '400px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
      if (result) {
        Swal.fire({
          title: result.message,
          icon: result.success,
          draggable: true
        });
      }
    });
  }

  loadUsers(): void {
    this.apiService.getDataUsers().subscribe(
      (data: any) => {
        this.dataSource =  Object.values(data.data); 
        this.totalUsers = this.dataSource.length;
      },
      (error) => {
        console.error('Error cargando usuarios:', error);
      }
    );
  }

  onFilterChange(): void {
    let queryParams = '';
    if (this.selectedCargo && this.selectedCargo !== '' && this.selectedCargo !== null) {
      queryParams += `cargo=${this.selectedCargo}`;
    }
  
    if (this.selectedDepartamento && this.selectedDepartamento !== null) {
      queryParams += queryParams ? `&departamento=${this.selectedDepartamento}` : `departamento=${this.selectedDepartamento}`;
    }

    this.apiService.getDataUsers(queryParams).subscribe(
      (response: any) => {
        console.log(response);
        if (response.data.length >= 0) {
          this.dataSource = Object.values(response.data);
          this.totalUsers = this.dataSource.length;
        } else {
          Swal.fire({
            title: 'Problemas al cargar los datos de usuarios',
            icon: 'error',
            draggable: true,
          });
        }
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
        Swal.fire({
          title: 'Error al realizar la búsqueda',
          icon: 'error',
          draggable: true,
        });
      }
    );
  }
  
  
}