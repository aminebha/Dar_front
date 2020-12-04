import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UserService } from '../services/user.service'
import { UserUpdateComponent } from "../user-update/user-update.component";
import { UserAddComponent } from "../user-add/user-add.component";
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'login', 'fname', 'lname', 'email', 'phone', 'bdate', 'action'];

  constructor(private userService: UserService, private dialog: MatDialog ){}

  ngOnInit() {
    console.log("ok")
    
    console.log("ok")
    this.userService.getUsers().subscribe(
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
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      data: { data: cat }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userService.getUsers().subscribe(
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
        this.userService.DeleteUsers(id).subscribe((result: any) => {
          this.OpenSuccModal("produit supprimé avec succès");

          this.userService.getUsers().subscribe(
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
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: "500px",
      height: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userService.getUsers().subscribe(
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
