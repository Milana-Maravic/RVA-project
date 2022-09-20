import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FAKULTET_URI } from '../constants';
import { Fakultet } from '../models/fakultet';

@Injectable({
  providedIn: 'root'
})
export class FakultetService {

  constructor(private httpClient: HttpClient) { }

  public getAllFaculty(): Observable<any>{
    return this.httpClient.get(`${FAKULTET_URI}`);
  }

  public addFakultet(fakultet : Fakultet): Observable<any>{
    fakultet.id = 100000;
    return this.httpClient.post(`${FAKULTET_URI}`,fakultet);
  }

  public updateFakultet(fakultet: Fakultet): Observable<any>{
    return this.httpClient.put(`${FAKULTET_URI}`, fakultet);
  }

  public deleteFakultet(id: number): Observable<any>{
    return this.httpClient.delete(`${FAKULTET_URI}/${id}`);

  }
}
