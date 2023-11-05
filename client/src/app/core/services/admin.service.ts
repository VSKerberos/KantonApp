import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobModel } from '../models/job.model';
import { GlobalConstants } from '../models/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  listOfJobs(){
    return this.http.get<JobModel[]>(`${GlobalConstants.BackEndConnection}jobs`);
  }


}
