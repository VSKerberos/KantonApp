import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { BlockDirectorModel, DirectorModel, IslandModel, JobModel, ShowRoomModel } from '../models/job.model';
import { GlobalConstants } from '../models/global-constants';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public jobUrl:string=`${GlobalConstants.BackEndConnection}jobs`;
  public directorUrl:string = `${GlobalConstants.BackEndConnection}directors`;
  public blockDirectorUrl:string = `${GlobalConstants.BackEndConnection}blockdirectors`;
  public IslandUrl:string = `${GlobalConstants.BackEndConnection}islands`;
  public fileUrl:string = `${GlobalConstants.BackEndConnection}files/uploadfile`;
  public showCaseUrl:string= `${GlobalConstants.BackEndConnection}showrooms`;
  public deleteFileUrl:string = `${GlobalConstants.BackEndConnection}files`;

  public   url:string='/assets/islands.json';

  constructor(private http: HttpClient, private toaster:ToastrService) { }


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

    deleteDirector(directorId:number) {
      return this.http.delete(`${this.directorUrl}/${directorId}`);
    }

    addBlockDirector(blockDirector:BlockDirectorModel)
    {

      return this.http.post<BlockDirectorModel>(this.blockDirectorUrl,blockDirector);
    }

    listOfBlockDirector(){
      return this.http.get<BlockDirectorModel[]>(this.blockDirectorUrl);
    }

    deleteBlockDirector(blockDirectorId:number) {
      return this.http.delete(`${this.blockDirectorUrl}/${blockDirectorId}`);
    }
    listOfIslands(){
      return this.http.get<IslandModel[]>(this.IslandUrl);
    }

    loadIslands(){
      return this.http.get(this.url);
    }

    uploadFile(formData:FormData){
      const httpOptions = {
        headers: new HttpHeaders({

          'Content-Disposition':'multipart/form-data',
          'Accept':'application/json'
        })
      };

      return this.http.post(this.fileUrl,formData, httpOptions);
    }

    switchMapAddForm(formData:FormData,showRoom:ShowRoomModel)
    {
      const httpOptions = {
        headers: new HttpHeaders({

          'Content-Disposition':'multipart/form-data',
          'Accept':'application/json'
        })
      };


  return   this.http.post(this.fileUrl,formData, httpOptions)
  .pipe(
    switchMap(result => {
      /* do something with result */
      showRoom.path = result.toString();
      return this.http.post(this.showCaseUrl,showRoom)
    })
  );
    }

    addShowRoom(showRoom:ShowRoomModel)
    {
      return this.http.post<BlockDirectorModel>(this.showCaseUrl,showRoom);
    }

    deleteShowRoom(showRoomId:number){
      return this.http.delete(`${this.showCaseUrl}/${showRoomId}`);
    }

    listShowRoom(){
      return this.http.get<ShowRoomModel[]>(this.showCaseUrl);
    }

    switchMapDeleteForm(id:number){

      return this.http.delete(`${this.deleteFileUrl}/${id}`);

    }

}
