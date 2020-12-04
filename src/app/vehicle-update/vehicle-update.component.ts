import { Inject, OnInit, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../services/user.service';
import { UserListComponent } from '../user-list/user-list.component';
import { VehicleService } from "../services/vehicle.service";
import { VehicleListComponent } from '../vehicle-list/vehicle-list.component';

@Component({
  selector: 'app-vehicle-update',
  templateUrl: './vehicle-update.component.html',
  styleUrls: ['./vehicle-update.component.css']
})
export class VehicleUpdateComponent implements OnInit {

  vehicle = { id:'',brand:'', model:'', number:'', id_user:''};
  id: any;
  users = [{id:'', fname:'', lname: ''}];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      private vehicleService:VehicleService,
      private usersService: UserService ,
      private dialog: MatDialog,
      private UpdateDialog: MatDialogRef<UserListComponent>
    ) {
    console.log(data.data);
  }

  ngOnInit() {
    this.vehicle = this.data.data;
    this.id = this.vehicle.id;
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    })
    console.log(this.vehicle)
  }

  onSubmit(){
    this.UpdateUser()
  }
  
  UpdateUser() {
    this.vehicleService.putVehicle(this.vehicle, this.id).subscribe((data: any) => {

      this.OpenSuccModal('vous êtes enregistré avec succès');

    }) ;
  }

  OpenSuccModal(msg: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.width = "300px";
    dialogConfig.height = "200px";
    dialogConfig.data = {
      message: msg
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.UpdateDialog.close();
    });
  }
}
