export interface JobModel {
  id?:number;
  title?:string;
}

export interface DirectorModel {
  name?:string;
  surname?:string;
  jobId:number
}
