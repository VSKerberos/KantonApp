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
export interface BlockDirectorModel {
  id?:number;
  jobId:number;
  islandId:number,
  name?:string;
  surname?:string;
  islandName?:string;
  jobTitle?:string;
}

export interface IslandModel {
  id?:number;
  name:string;
}
