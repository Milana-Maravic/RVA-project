import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { Departman } from 'src/app/models/departman';
import { Status } from 'src/app/models/status';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { StudentDialogComponent } from '../../dialogs/student-dialog/student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnChanges {

  displayedColumns = ['id','ime','prezime','brojIndeksa','status','departman','actions'];
  dataSource!: MatTableDataSource<Student>;
  subscription!: Subscription;
  @Input() selectedDepartmanBottom!: Departman;

  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;


  constructor(private studentService: StudentService,
    private dialog: MatDialog) { }

    ngOnChanges(): void {
      this.loadData();
    }
  
    ngOnDestroy(): void {
      this.subscription.unsubscribe;
    }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.studentService.
    getStudentByDepartman(this.selectedDepartmanBottom.id).subscribe
      (data => { this.dataSource = new MatTableDataSource(data) 
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator}),
      (error: Error) => { console.log(error.name + " " + error.message) }
  }

  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojIndeksa?: string,
                    status?:Status, departman?: Departman) {
    const dialogRef = this.dialog.open(StudentDialogComponent, { data: { id,ime,prezime,brojIndeksa,status,departman } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.componentInstance.data.departman = this.selectedDepartmanBottom;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
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
