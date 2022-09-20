import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/models/status'
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {

  flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Status,
    public statusService: StatusService) { }

  ngOnInit(): void {
  }

  public add(){
    this.statusService.addStatus(this.data).subscribe
    (data => {
      this.snackBar.open("Uspešno ste dodali novi status: " + data.naziv, "U redu.", {duration: 3500})
 }),
    (error : Error) => {
      console.log(error.name + " " + error.message);
      this.snackBar.open("Dogodila se greška", "U redu", {duration:3500});
    };
 }

 public update(){
   this.statusService.updateStatus(this.data).subscribe
    (data => {
      this.snackBar.open("Uspešno ste ažurirali status: " + data.naziv, "U redu.", {duration: 3500})
 }),
    (error : Error) => {
      console.log(error.name + " " + error.message);
      this.snackBar.open("Dogodila se greška", "U redu", {duration:3500})
   }
 }

 public delete(){
   this.statusService.deleteStatus(this.data.id).subscribe
    (() => {
      this.snackBar.open("Uspešno ste obrisali status: " , "U redu.", {duration: 3500})
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
