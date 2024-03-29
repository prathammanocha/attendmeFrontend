import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { myCustomConstant } from '../config/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {}

    private _datastream = new BehaviorSubject("");

    getDataStream(){
      return this._datastream.asObservable();
    }

    putDataToStream(data: string){
      this._datastream.next(data)
    }

    private _companyname = new BehaviorSubject("");

    getCompanyName(){
      return this._companyname.asObservable();
    }

    putCompanyName(data: string){
      this._companyname.next(data)
    }

    private _companyname1 = new BehaviorSubject("");

    getCompanyName1(){
      return this._companyname1.asObservable();
    }

    putCompanyName1(data: string){
      this._companyname1.next(data)
    }

    postStudent(data : any){
      return this.http.post<any>("http://localhost:3000/studentList/", data);
    }
    getStudent( ){
      return this.http.get<any>("http://34.121.4.22:3000/studentList/");
    }
    putStudent(data:any, id: number){
      return this.http.put<any>("http://localhost:3000/studentList/"+id, data);
    }
    deleteStudent(id: number){
      return this.http.delete<any>("http://localhost:3000/studentList/"+id);
    }

    postTeacher(data2 : any){
      return this.http.post<any>("http://localhost:3000/teacherlist/", data2);
    }
    getTeacher( ){
      return this.http.get<any>("http://localhost:3000/teacherlist/");
    }
    putTeacher(data2 :any, id2: number){
      return this.http.put<any>("http://localhost:3000/teacherlist/"+id2, data2);
    }
    deleteTeacher(id2: number){
      return this.http.delete<any>("http://localhost:3000/teacherlist/"+id2);
    }
    authenticateMe(data : any){
      return this.http.post<any>( myCustomConstant.API_ENDPOINT + "/api/AccountUser/Authenticate", data);
    }

    getParents(): Observable<any> {
      return this.http.get<any>('http://localhost:3000/parents');
    }
  
    editParent(id: number, data: any): Observable<any> {
      return this.http.put<any>(`http://localhost:3000/parents/${id}`, data);
    }
  
    deleteParent(id: number): Observable<any> {
      return this.http.delete<any>(`http://localhost:3000/parents/${id}`);
    }
  
    getRelatives(): Observable<any> {
      return this.http.get<any>('http://localhost:3000/relatives');
    }
  
    editRelative(id: number, data: any): Observable<any> {
      return this.http.put<any>(`http://localhost:3000/relatives/${id}`, data);
    }
  
    deleteRelative(id: number): Observable<any> {
      return this.http.delete<any>(`http://localhost:3000/relatives/${id}`);
    }
}
