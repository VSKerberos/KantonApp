export interface JobModel {
  id?:number;
  title?:string;
}

export interface DirectorModel {
  id?:number;
  name?:string;
  surName?:string;
  jobId:number;
  jobTitle?:string;
}
