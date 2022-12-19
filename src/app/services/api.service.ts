import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {}

    postStudent(data : any){
      return this.http.post<any>("http://localhost:3000/studentList/", data);
    }
    getStudent( ){
      return this.http.get<any>("http://localhost:3000/studentList/");
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
      return this.http.post<any>("http://localhost:5001/api/AccountUser/Authenticate", data);
    }
}
