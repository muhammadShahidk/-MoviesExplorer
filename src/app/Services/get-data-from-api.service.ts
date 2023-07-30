import { Injectable } from '@angular/core';
import { MoveTitleDetails } from '../Models/IModels';

@Injectable({
  providedIn: 'root'
})
export class GetDataFromApiService {
  Movies: MoveTitleDetails[]=[];
  constructor() { }
}
