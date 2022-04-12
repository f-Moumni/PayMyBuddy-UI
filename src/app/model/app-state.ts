import {DataState} from "../enum/DataState.enum";

export interface AppState<T>{
  dataState: DataState ;
  appData ?:T;
  error ?:string;
}
