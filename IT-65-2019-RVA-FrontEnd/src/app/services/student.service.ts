import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { STUDENT_FOR_DEPARTMAN_URI, STUDENT_URI } from '../constants';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  public getStudentByDepartman(idDepartmana: number): Observable<any>{
    return this.httpClient.get(`${STUDENT_FOR_DEPARTMAN_URI}/${idDepartmana}`);
  }

  public addStudent(student : Student): Observable<any>{
    student.id = 100000;
    return this.httpClient.post(`${STUDENT_URI}`, student)
  }

  public updateStudent(student: Student): Observable<any>{
    return this.httpClient.put(`${STUDENT_URI}`, student);
  }

  public deleteStudent(id: number): Observable<any>{
    return this.httpClient.delete(`${STUDENT_URI}/${id}`);
  }
}