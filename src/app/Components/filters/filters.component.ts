import { Component, EventEmitter, Output } from '@angular/core';
import { TitlesOPtions } from '../../Services/movies-db.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Output() FilterdOptions =new EventEmitter<TitlesOPtions>();;
  Options:TitlesOPtions= {genre:'Action',page:'1',year:2001,list:'most_pop_movies',limit:10};
  
  YearsFilter: number[] = [2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010];
  titleTypeFilter: string[] = ['movie','series','episode'];
  listFilters:string[] = ['most_pop_movies' , 'most_pop_series' , 'top_rated_series_250','top_rated_tv','most_pop_actors','top_rated_actors'];
  
  ActiveFilters = {year:false,titleType:false,list:false};
  
  applyFilters(){
   //emit the event
    this.FilterdOptions.emit(this.Options);
  }
  SetYear(year:number){
    if (this.Options.year === year) {
      // If the clicked year is already selected, remove the active class and clear the Options value
      this.Options.year = undefined;
    } else {
      this.Options.year = year; // Update the selected year
    }
  
    console.log(year);
  }

  SetTitleType(titleType:string){
    this.Options.titleType =titleType; 
    console.log(titleType);
  }
  SetList(list:string){
    this.Options.list =list; 
    console.log(list);
  }
}
