import { Inject, OnInit, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../services/user.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  user = { id:'',fname:'', login:'', lname:'', password:'', phone:'', email:'', bdate: ''};
  id: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      private usersService: UserService ,
      private dialog: MatDialog,
      private UpdateDialog: MatDialogRef<UserListComponent>
    ) {
    console.log(data.data);
  }

  ngOnInit() {
    this.user = this.data.data;
    this.id = this.user.id
    console.log(this.user)
  }

  onSubmit(){
    this.UpdateUser()
  }
  
  UpdateUser() {
    this.usersService.putUsers(this.user, this.id).subscribe((data: any) => {

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
