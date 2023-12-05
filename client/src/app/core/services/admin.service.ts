import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DirectorModel, JobModel } from '../models/job.model';
import { GlobalConstants } from '../models/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public jobUrl:string=`${GlobalConstants.BackEndConnection}jobs`;
  public directorUrl:string = `${GlobalConstants.BackEndConnection}directors`
  constructor(private http: HttpClient) { }


  listOfJobs(){
    return this.http.get<JobModel[]>(this.jobUrl);
  }

  saveJob(){
    return this.http.post
  }

  addJob (job: JobModel) {
    return this.http.post<JobModel>(this.jobUrl, job)

  }

  deleteJob(jobId:number) {
    return this.http.delete(`${this.jobUrl}/${jobId}`)
  }

  addDirector(director:DirectorModel)
    {

      return this.http.post<DirectorModel>(this.directorUrl,director);

    }

    listOfDirector(){
      return this.http.get<DirectorModel[]>(this.directorUrl)
    }


}
