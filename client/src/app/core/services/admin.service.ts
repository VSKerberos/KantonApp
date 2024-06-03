import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, switchMap } from 'rxjs';
import { BlockDirectorModel, ContactModel, DirectorModel, GeneralCurrencyModel, IslandModel, JobModel, MainModel, ShowRoomModel, UsefulLinksModel, UserModel } from '../models/job.model';
import { GlobalConstants } from '../models/global-constants';
import { ToastrService } from 'ngx-toastr';
import { Theme } from '../models/theme';

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
  public usefulLinkUrl:string= `${GlobalConstants.BackEndConnection}links`;
  public contactsUrl:string = `${GlobalConstants.BackEndConnection}contacts`;
  public accountUrl:string = `${GlobalConstants.BackEndConnection}account/login`;
  public downloadFileUrl:string = `${GlobalConstants.BackEndConnection}files/downloadfile`;
  public currencyUrl:string = `${GlobalConstants.BackEndConnection}currency/currency`;
  public weatherUrl:string = `${GlobalConstants.BackEndConnection}currency/weather`


  public deleteFileUrl:string = `${GlobalConstants.BackEndConnection}files`;
  public   url:string='/assets/islands.json';

  public currentUserSource = new BehaviorSubject<UserModel | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  private currencySource = new BehaviorSubject<GeneralCurrencyModel | null>(null);
  currencies$ = this.currencySource.asObservable();

  private linkSource = new BehaviorSubject<UsefulLinksModel[] | []>([]);
  links$ = this.linkSource.asObservable();

  private weatherSource = new BehaviorSubject<MainModel[] |[]> ([]);
  weathers$ = this.weatherSource.asObservable();

  userLoggedIn = signal<boolean>(false);


  constructor(private http: HttpClient, private toaster:ToastrService) { }


  getHttpOptions() {


  }

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

    downloadFile(fileName:string){

      return this.http.get(`${this.downloadFileUrl}/${fileName}`,{responseType:'blob'});
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

    addUsefulLink(usefulLink:UsefulLinksModel)
    {
      return this.http.post<UsefulLinksModel>(this.usefulLinkUrl,usefulLink);
    }

    listOfUsefulLinks(){
      return this.http.get<UsefulLinksModel[]>(this.usefulLinkUrl);
    }

    deleteUsefulLink(linkId:number){
      return this.http.delete(`${this.usefulLinkUrl}/${linkId}`);
    }

    addContact(currentContact:ContactModel){
      return this.http.post<ContactModel>(this.contactsUrl,currentContact);

    }

    listOfContacts(){
      return this.http.get<ContactModel[]>(this.contactsUrl);
    }

    deleteContact(contactId:number) {
      return this.http.delete(`${this.contactsUrl}/${contactId}`);
    }

    userAutheticate(usermodel:UserModel){
      return this.http.post<UserModel>(this.accountUrl,usermodel);






    }


    loadCurrencies(){
      return this.http.get(this.currencyUrl);
    }

    loadWeathers(){
      return this.http.get(this.weatherUrl);
    }

    homePageServices()
    {
      const loadLinksAPI = this.listOfUsefulLinks();
      const loadCurrencyAPI = this.loadCurrencies();
      const loadWeatherAPI =  this.loadWeathers();


    forkJoin([loadLinksAPI, loadCurrencyAPI,loadWeatherAPI]) //we can use more that 2 api request
    .subscribe(
        result => {
            //this will return list of array of the result

            this.linkSource.next(<UsefulLinksModel[]>result[0]);
            this.currencySource.next(<GeneralCurrencyModel>result[1]);
            this.weatherSource.next(<MainModel[]>result[2]);


        },
        error=>{
          console.log(error);
        }
    );
    }

    logOutUser(){
      this.currentUserSource.next(null);
      this.userLoggedIn.set(false);
    }

}
