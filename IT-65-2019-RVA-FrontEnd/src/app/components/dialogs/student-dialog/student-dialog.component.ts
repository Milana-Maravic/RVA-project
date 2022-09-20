import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/models/status';
import { Student } from 'src/app/models/student';
import { StatusService } from 'src/app/services/status.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  public flag!: number;
  statusi!: Status[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    public studentService: StudentService,
    public statusService: StatusService) { }

  ngOnInit(): void {
    this.statusService.getAllStatus().subscribe(
      result => {
        this.statusi = result;
      }
    )
  }

  public compare(a:any, b:any){
    return a.id == b.id;
  }

  public add() {
    this.studentService.addStudent(this.data)
      .subscribe(data => this.snackBar.open("Uspešno ste dodali novog studenta:" + data.id, "U redu.", { duration: 3500 })),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackBar.open("Dogodila se greška", "U redu", { duration: 2500 })
      }
  }

  public update() {
    this.studentService.updateStudent(this.data).subscribe
      (data => { this.snackBar.open("Uspešno ste ažurirali fakultet: " + data.id , "U redu.", { duration: 3500 }) }),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Dogodila se greška", "U redu", { duration: 2500 })
      }
  }

  public delete() {
    this.studentService.deleteStudent(this.data.id).subscribe
      (() => { this.snackBar.open("Uspešno ste obrisali studenta: ", "U redu", { duration: 3500 }) }),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Dogodila se greška", "U redu", { duration: 2500 })
      }
  }

  public cancel(){
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od izmena", "U redu", {duration:3500});
  }


}
