import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Departman } from 'src/app/models/departman';
import { Fakultet } from 'src/app/models/fakultet';
import { DepartmanService } from 'src/app/services/departman.service';
import { DepartmanDialogComponent } from '../../dialogs/departman-dialog/departman-dialog.component';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-departman',
  templateUrl: './departman.component.html',
  styleUrls: ['./departman.component.css']
})
export class DepartmanComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka', 'fakultet', 'actions'];
  dataSource!: MatTableDataSource<Departman>;
  subscription!: Subscription;
  selectedDepartmanTop!: Departman;

  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private departmanService: DepartmanService,
    public dialog: MatDialog) { }

   ngOnDestroy(): void {
      this.subscription.unsubscribe;
    }  

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
     this.subscription = this.departmanService.getAllDepartman()
    .subscribe
      (data => {this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator}),
    (error: Error) => {console.log(error.name + ' ' + error.message)}}

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, fakultet?: Fakultet){
     const dialogRef = this.dialog.open(DepartmanDialogComponent, {data:{id,naziv,oznaka,fakultet}});
     dialogRef.componentInstance.flag = flag;
     dialogRef.afterClosed().subscribe
     (result => {
       if(result == 1){
         this.loadData();
       }}
     );}
    
     public selectRow(row: Departman){
      console.log(row);
      this.selectedDepartmanTop=row;}

      public applyFilter(filter: any){
        filter=filter.target.value;
        filter=filter.trim();
        filter=filter.toLocaleLowerCase();
        this.dataSource.filter=filter;
      }
}



