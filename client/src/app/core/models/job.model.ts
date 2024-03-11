

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
  description:string;
}

export interface ContactModel {
  id?:number;
  name:string;
  surname:string;
  email:string;
  desc:string;
}

export interface UserModel {
  username:string;
  password:string;
  token?:string;
}

export interface GeneralCurrencyModel {

  askUSD:string;
  bidUSD:string;
  askEUR:string;
  bidEUR:string;
  askJPY:string;
  bidJPY:string;
}

export interface MainModel{
  location:Location;
  current:Current;
}

export interface Location
{
  name?:string;
  lat?:string | '';
  lon?:string;
}

export interface Current {
  temp_c: string;
  wind_kph:string;
  wind_dir:string;
  humidity: number

}
