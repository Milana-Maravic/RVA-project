import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fakultet } from 'src/app/models/fakultet';
import { FakultetService } from 'src/app/services/fakultet.service';

@Component({
  selector: 'app-fakultet-dialog',
  templateUrl: './fakultet-dialog.component.html',
  styleUrls: ['./fakultet-dialog.component.css']
})
export class FakultetDialogComponent implements OnInit {

  flag!: number;

    constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FakultetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Fakultet,
    public fakultetService: FakultetService) { }

  ngOnInit(): void {
  }

  public add(){
     this.fakultetService.addFakultet(this.data).subscribe
     (data => {
       this.snackBar.open("Uspešno ste dodali novi fakultet: " + data.naziv, "U redu.", {duration: 3500})
  }),
     (error : Error) => {
       console.log(error.name + " " + error.message);
       this.snackBar.open("Dogodila se greška", "U redu", {duration:3500});
     };
  }

  public update(){
    this.fakultetService.updateFakultet(this.data).subscribe
     (data => {
       this.snackBar.open("Uspešno ste ažurirali fakultet: " + data.naziv, "U redu.", {duration: 3500})
  }),
     (error : Error) => {
       console.log(error.name + " " + error.message);
       this.snackBar.open("Dogodila se greška", "U redu", {duration:3500})
    }
  }

  public delete(){
    this.fakultetService.deleteFakultet(this.data.id).subscribe
     (() => {
       this.snackBar.open("Uspešno ste obrisali fakultet: " , "U redu.", {duration: 3500})
  }),
     (error : Error) => {
       console.log(error.name + " " + error.message);
       this.snackBar.open("Dogodila se greška", "U redu", {duration:3500})
     }
  }

  public cancel(){
   this.dialogRef.close();
   this.snackBar.open("Odustali ste od izmena", "U redu", {duration:3500});
  }

}
