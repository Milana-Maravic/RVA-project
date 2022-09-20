import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Departman } from 'src/app/models/departman';
import { Fakultet } from 'src/app/models/fakultet';
import { DepartmanService } from 'src/app/services/departman.service';
import { FakultetService } from 'src/app/services/fakultet.service';



@Component({
  selector: 'app-departman-dialog',
  templateUrl: './departman-dialog.component.html',
  styleUrls: ['./departman-dialog.component.css']
})
export class DepartmanDialogComponent implements OnInit {

  public flag!: number;
  fakulteti!: Fakultet[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DepartmanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Departman,
    public fakultetService: FakultetService,
    public departmanService: DepartmanService,) { }

  ngOnInit(): void {
    this.fakultetService.getAllFaculty()
    .subscribe(result =>
      {this.fakulteti = result;}); 
  }


  public compare(a:any, b:any){
    return a.id == b.id;
  }

public add() {
  this.departmanService.addDepartman(this.data).subscribe
  (data => {
    this.snackBar.open('Uspešno ste dodali departman: ' + data.id ,'OK', {duration: 2500}), 
  (error: Error) => {
    console.log(error.name + " " + error.message);
    this.snackBar.open("Dogodila se greška", "U redu", {duration:2500});
  }
}
  );
}

 public update(){
   this.departmanService.updateDepartman(this.data).subscribe
    (data => {
      this.snackBar.open("Uspešno ste ažurirali departman: " + data.id, "U redu.", {duration: 2500}),
    (error : Error) => {
      console.log(error.name + " " + error.message);
      this.snackBar.open("Dogodila se greška", "U redu", {duration:2500});
   }});
 }

 public delete(){
   this.departmanService.deleteDepartman(this.data.id).subscribe
    (() => {
      this.snackBar.open("Uspešno ste obrisali departman: " + this.data.id, "U redu.", {duration: 2500}),
    (error : Error) => {
      console.log(error.name + " " + error.message);
      this.snackBar.open("Dogodila se greška", "U redu", {duration:2500});
    }});
 }

 public cancel(): void{
  this.dialogRef.close();
  this.snackBar.open("Odustali ste od izmena", "U redu", {duration:1000});
 }

}
