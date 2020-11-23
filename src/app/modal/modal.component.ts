import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  message;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
 
   this.message = data.message ;
  }
   ngOnInit() {
   }

}
