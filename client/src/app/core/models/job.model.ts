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

export interface ShowRoomModel {
  id?:number;
  header:string;
desc:string;
path:string;
status:number;
createdDate:Date;
}

export interface UsefulLinksModel {
  id?:number;
  title:string;
  url:string;
  desc:string;
}

export interface ContactModel {
  id?:number;
  name:string;
  surname:string;
  email:string;
  desc:string;
}
