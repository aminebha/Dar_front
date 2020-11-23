import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  user = this.fb.group({
    fname: [null, Validators.required],
    lname: [null, Validators.required],
    login: [null, Validators.required],
    password: [null, Validators.required],
    phone: [null, Validators.required],
    email: [null, Validators.required],
    bdate: [null, Validators.required]
  });

  hasUnitNumber = false;

  constructor(private userservice: UserService, private fb: FormBuilder, private dialog: MatDialog, private dialogref: MatDialogRef<UserAddComponent> ) {}

  onSubmit() {
    console.log(this.user.value)
    this.userservice.addUser(this.user.value).subscribe((data: any) => {
      
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
