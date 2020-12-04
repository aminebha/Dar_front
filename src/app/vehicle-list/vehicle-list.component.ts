import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UserService } from '../services/user.service'
import { VehicleUpdateComponent } from "../vehicle-update/vehicle-update.component";
import { VehicleAddComponent } from "../vehicle-add/vehicle-add.component";
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ModalComponent } from '../modal/modal.component';
import { VehicleService } from "../services/vehicle.service";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'brand', 'model', 'number', 'date', 'id_user', 'action'];

  constructor(private vehicleService:VehicleService, private dialog: MatDialog ){}

  ngOnInit() {
    console.log("ok")
    
    console.log("ok")
    this.vehicleService.getVehicles().subscribe(
      (users: any) => {
        console.log(users)
        this.handler(users)
      }
    );
    this.dataSource.sort = this.sort;
  }

  handler(users:any){
    console.log(users)
    this.dataSource.data = users.reverse();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  deleteuser(id: any) {
    this.confirmer("Êtes-vous sûr ?", id);
  }

  Updateuser(cat: any) {
    const dialogRef = this.dialog.open(VehicleUpdateComponent, {
      data: { data: cat }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.vehicleService.getVehicles().subscribe(
        (users: any) => {
          this.dataSource.data = users.reverse();
        },

        (error: any) => console.log(error),
        () => {
          console.log("completed");
        }
      );
    });
  }

  confirmer(msg: any, id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.width = "300px";
    dialogConfig.height = "200px";
    dialogConfig.data = {
      message: msg
    };

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.DeleteVehicles(id).subscribe((result: any) => {
          this.OpenSuccModal("produit supprimé avec succès");

          this.vehicleService.getVehicles().subscribe(
            (users: any) => {
              this.dataSource.data = users.reverse();
            },

            (error: any) => console.log(error),
            () => {
              console.log("completed");
            }
          );
        });
      }
    });
  }
  
  OpenSuccModal(msg:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.width = "300px";
    dialogConfig.height = "200px";
    dialogConfig.data = {
      message: msg
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
  }
  openAddUser(){
    const dialogRef = this.dialog.open(VehicleAddComponent, {
      width: "500px",
      height: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.vehicleService.getVehicles().subscribe(
        (Produits: any) => {
          this.dataSource.data = Produits.reverse();
        },

        (error: any) => console.log(error),
        () => {
          console.log("completed");
        }
      );
    });
  }
}
