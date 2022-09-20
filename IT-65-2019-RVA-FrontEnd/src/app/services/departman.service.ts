import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DEPARTMAN_URI } from "../constants";
import { Departman } from "../models/departman";

@Injectable({
    providedIn: 'root'
  })
  export class DepartmanService {
    
    constructor(private httpClient: HttpClient) { }

    public getAllDepartman(): Observable<any>{
      return this.httpClient.get(`${DEPARTMAN_URI}`);
    }
  
    public addDepartman(departman : Departman): Observable<any>{
        departman.id = 100000;
      return this.httpClient.post(`${DEPARTMAN_URI}`,departman);
    }
  
    public updateDepartman(departman: Departman): Observable<any>{
      return this.httpClient.put(`${DEPARTMAN_URI}`, departman);
    }
  
    public deleteDepartman(id: number): Observable<any>{
      return this.httpClient.delete(`${DEPARTMAN_URI}/${id}`);
  
    }
  }