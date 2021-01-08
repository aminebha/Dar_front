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
import { AccidentService } from "../services/accident.service";

@Component({
  selector: 'app-accident-list',
  templateUrl: './accident-list.component.html',
  styleUrls: ['./accident-list.component.css']
})
export class AccidentListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','user','vehicle', 'v11', 'v12', 'v21', 'v22', 'dirver_move', 'seatbelt','damage_score','vehicle_state','need_help','is_rescued', 'localisation'];

  constructor(private accidentService: AccidentService, private dialog: MatDialog ){}

  ngOnInit() {
    console.log("ok")
    
    console.log("ok")
    this.accidentService.getAccidents().subscribe(
      (accidents: any) => {
        console.log(accidents)
        this.handler(accidents)
      }
    );
    this.dataSource.sort = this.sort;
  }

  handler(accidents:any){
    console.log(accidents)
    this.dataSource.data = accidents.reverse();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
