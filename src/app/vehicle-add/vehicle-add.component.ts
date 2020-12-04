import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../services/user.service';
import { VehicleService } from "../services/vehicle.service";

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {

  vehicle = this.fb.group({
    brand: [null, Validators.required],
    model: [null, Validators.required],
    number: [null, Validators.required],
    date: [null, Validators.required],
    id_user: [null, Validators.required]
  });
  users = [];

  hasUnitNumber = false;

  constructor(private vehicleService:VehicleService, private userservice: UserService, private fb: FormBuilder, private dialog: MatDialog, private dialogref: MatDialogRef<VehicleAddComponent> ) {}

  ngOnInit(){
    this.userservice.getUsers().subscribe(users => {
      this.users=users
    })
  }

  onSubmit() {
    console.log(this.vehicle.value)
    this.vehicleService.addVehicle(this.vehicle.value).subscribe((data: any) => {
      
      this.openModal('vous êtes enregistré avec succès');

    }) ;
  }

  openModal(msg: any) {
    const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

     dialogConfig.width = '300px' ;
    dialogConfig.height = '200px' ;
    dialogConfig.data = {
    message : msg
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result:any) =>
    this.dialogref.close()
    );
  }

}
