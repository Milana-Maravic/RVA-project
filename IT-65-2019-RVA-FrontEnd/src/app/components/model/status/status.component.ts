import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Status } from 'src/app/models/status';
import { StatusService } from 'src/app/services/status.service';
import { StatusDialogComponent } from '../../dialogs/status-dialog/status-dialog.component';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'oznaka', 'actions'];
  dataSource!: MatTableDataSource<Status>;
  subscription!: Subscription;

  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private statusService: StatusService, 
    public dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }


  loadData(){
    this.subscription = this.statusService.getAllStatus()
    .subscribe(
      //data => {console.log(data)}
      data => {this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator}),
    (error: Error) => {console.log(error.name + ' ' + error.message)}
  }
  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string){
    const dialogRef = this.dialog.open(StatusDialogComponent, {data:{id,naziv,oznaka}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe
    (result => {
      if(result == 1){
        this.loadData();
      }
    })
  }
  
  public applyFilter(filter: any){
    filter=filter.target.value;
    filter=filter.trim();
    filter=filter.toLocaleLowerCase();
    this.dataSource.filter=filter;
  }
}
