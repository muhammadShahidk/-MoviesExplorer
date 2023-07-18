import { Component, EventEmitter, Output } from '@angular/core';
import { TitlesOPtions } from '../../Services/movies-db.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Output() FilteredOptions =new EventEmitter<TitlesOPtions>();;
  Options:TitlesOPtions= {genre:'Action',page:'1',year:2001,list:'most_pop_movies',limit:10};
  
  YearsFilter: number[] = [2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010];
  titleTypeFilter: string[] = [
    "movie"
,"musicVideo"
,"podcastEpisode"
,"podcastSeries"
,"short"
,"tvEpisode"
,"tvMiniSeries"
,"tvMovie"
,"tvPilot"
,"tvSeries"
,"tvShort"
,"tvSpecial"
,"video"
,"videoGame"
  ];
  listFilters:string[] = [
  "most_pop_movies"
,"most_pop_series"
,"top_boxoffice_200"
,"top_boxoffice_last_weekend_10"
,"top_rated_250"
,"top_rated_english_250"
,"top_rated_lowest_100"
,"top_rated_series_250"
,"titles"
  ];
  genreFilters:string[]=[
    "Action"
    ,"Adult"
    ,"Adventure"
    ,"Animation"
    ,"Biography"
    ,"Comedy"
    ,"Crime"
    ,"Documentary"
    ,"Drama"
    ,"Family"
    ,"Fantasy"
    ,"Film-Noir"
    ,"Game-Show"
    ,"History"
    ,"Horror"
    ,"Music"
    ,"Musical"
    ,"Mystery"
    ,"News"
    ,"Reality-TV"
    ,"Romance"
    ,"Sci-Fi"
    ,"Short"
    ,"Sport"
    ,"Talk-Show"
    ,"Thriller"
    ,"War"
    ,"Western"  
  ]
  ActiveFilters = {year:false,titleType:false,list:false};
  
  applyFilters(){
   //emit the event
    this.FilteredOptions.emit(this.Options);
  }
  SetYear(year:number){
    if (this.Options.year === year) {
      // If the clicked year is already selected, remove the active class and clear the Options value
      this.Options.year = 0;
    } else {
      this.Options.year = year; // Update the selected year
    }
  
    console.log(year);
  }

  SetTitleType(titleType:string){
    if (this.Options.titleType === titleType) {
      // If the clicked titleType is already selected, remove the active class and clear the Options value
      this.Options.titleType = '';
    } else {
      this.Options.titleType = titleType; // Update the selected year
    }
    console.log(titleType);
  }
  SetList(list:string){
    if (this.Options.list === list) {
      // If the clicked list is already selected, remove the active class and clear the Options value
      this.Options.list = '';
    } else {
      this.Options.list = list; // Update the selected year
    }
    console.log(list);
  }
}
