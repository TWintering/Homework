"use strict";

var filteredData=data;

function makeTable(tableData){
  var tbody = d3.select("tbody");
  tbody.html("");
  tableData.forEach( sighting => { 
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(([key, value]) => {
      var cell = row.append("td");
	    switch(key){
          case "state":
            cell.text(value.toUpperCase()); //capitalize states
            break;
          case "country":
            cell.text(value.toUpperCase());
            break;
          case "city":  //split by space and do this forEach then use join
            cell.text(value.charAt(0).toUpperCase() + value.slice(1)); //capitalize first letter
            break;
          default:
            cell.text(value);
  console.log("I made a table!");
        }      
    });
  });
}

function getValues(){
  d3.event.preventDefault();
 
  var datetimeValue = d3.select("#datetime").property("value");
  var cityValue = d3.select("#city").property("value");
  var stateValue = d3.select("#state").property("value");
  var countryValue = d3.select("#country").property("value");
  var shapeValue = d3.select("#shape").property("value");

  console.log(datetimeValue);
  console.log(cityValue);
  console.log(stateValue);
  console.log(countryValue);
  console.log(shapeValue);

  if (datetimeValue != ""){
    datetimeValue = datetimeValue.replace(/-/g, '/'); //change dashes to forward slahes
    var mdy = datetimeValue.split("/");
    if (mdy[0].length == 4){   // testing for ISO 8601 date format
      var year = mdy[0];
      var month = mdy[1];
      var day = mdy[2];
    }else{
      var month = mdy[0];
      var day = mdy[1];
      var year = mdy[2];
    }
    if (month.charAt(0) == "0"){month = month.slice(1);} // one digit month format
    if (day.charAt(0) == "0"){day = day.slice(1);} // one digit day format
    datetimeValue = month + "/" + day + "/" + year;
    filteredData = filteredData.filter(datum => datum.datetime === datetimeValue);
    }
    

  if (cityValue != ""){
    cityValue = cityValue.toLowerCase();
    filteredData = filteredData.filter(datum => datum.city === cityValue);
  }
    

  if (stateValue != ""){
    stateValue = stateValue.toLowerCase();
    filteredData = filteredData.filter(datum => datum.state === stateValue);
  }

  if (countryValue != ""){
    countryValue = countryValue.toLowerCase();
    filteredData = filteredData.filter(datum => datum.country === countryValue);
  }

  if (shapeValue != ""){
    shapeValue = shapeValue.toLowerCase();
    filteredData = filteredData.filter(datum => datum.shape === shapeValue);
  }
  if (datetimeValue=="" && cityValue=="" && stateValue=="" && countryValue=="" & shapeValue==""){
     filteredData=data;}; // blank form resets table
    
  makeTable(filteredData);
}

function sortDate(){  //unfinished
  console.log(d3.event.target);
  if (sortDate.times == undefined){
    sortDate.times = 0;}
  else {sortDate.times++;}
  filteredData.forEach(function(date) {
    var mdy=date.datetime.split("/");
    var year=mdy[2];
    if (mdy[0].length ==1){
      var month="0" + mdy[0];}
    else{var month = mdy[0];}
    var day=mdy[1];
    if (mdy[1].length == 1){
      var day = "0" + mdy[1];}
    else {var day = mdy[1];}
    var newdate = year + month + day;
    var numdate =parseInt(newdate,10);
    date.numdate = numdate;
  });
  if (sortDate.times % 2 == 0){
    filteredData.sort((a,b) => a.numdate - b.numdate);}
  else {filteredData.sort((a,b) => b.numdate - a.numdate);}
  makeTable(filteredData);
}

function sortCity(){
  console.log(d3.event.target);
//filteredData.sort((a,b) => (a.city > b.city) ? 1 : ((b.city > a.city) ? -1 : 0));
  if (sortCity.times == undefined) {
    sortCity.times = 0;}
  else {sortCity.times++}
  console.log(sortCityTimes);
  if (sortCity.times % 2 == 0){
    filteredData.sort((a,b) => (a.city > b.city) ? 1 : ((b.city > a.city) ? -1 : 0));}
  else {filteredData.sort((a,b) => (a.city < b.city) ? 1 : ((b.city < a.city) ? -1 : 0));}
  makeTable(filteredData); 
}

function sortState(){
  console.log(d3.event.target);
  if (sortState.times == undefined) {
    sortState.times = 0;}
  else {sortState.times++}
  console.log(sortState.times);
  if (sortState.times % 2 == 0){
    filteredData.sort((a,b) => (a.state > b.state) ? 1 : ((b.state > a.state) ? -1 : 0));}
  else {filteredData.sort((a,b) => (a.state < b.state) ? 1 : ((b.state < a.state) ? -1 : 0));}
  makeTable(filteredData); 
}


function sortCountry(){
console.log(d3.event.target);
 if (sortCountry.times == undefined) {
    sortCountry.times = 0;}
  else {sortCountry.times++}
  console.log(sortCountry.times);
  if (sortCountry.times % 2 == 0){
    filteredData.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0));}
  else {filteredData.sort((a,b) => (a.country < b.country) ? 1 : ((b.country < a.country) ? -1 : 0));}
  makeTable(filteredData); 
}

function sortShape(){
  console.log(d3.event.target);
 if (sortShape.times == undefined) {
    sortShape.times = 0;}
  else {sortShape.times++}
  console.log(sortShape.times);
  if (sortShape.times % 2 == 0){
    filteredData.sort((a,b) => (a.shape > b.shape) ? 1 : ((b.shape > a.shape) ? -1 : 0));}
  else {filteredData.sort((a,b) => (a.shape < b.shape) ? 1 : ((b.shape < a.shape) ? -1 : 0));}
  makeTable(filteredData); 
}

function sortDuration(){
  if (sortDuration.times == undefined) {
    sortDuration.times = 0;}
  else {sortDuration.times++;}
  console.log(sortDuration.times);
  filteredData.forEach(function(duration){
    var dur=duration.durationMinutes + ' ';
    var durs = dur.split(" ");
    var digit=durs[0]
    //var num=parseFloat(durs[0]);
    switch(digit.toLowerCase()){
      case "one":
        digit="1";
        break;
      case "two":
        digit="2";
        break;
      case "three":
        digit="3";
        break;
      case "four":
        digit="4";
        break;
      case "five":
        digit="5";
        break;
      case "six":
        digit="6";
        break;
      case "seven":
        digit="7";
        break;
      case "eight":
        digit="8";
        break;
      case "nine":
        digit="9";
        break;
       default:
         break;}

    var num = parseFloat(digit);

    if (num != undefined){

    //console.log(duration.durationMinutes);
    
      //if (duration.duratonMinutes.indexOf("min") != -1){
      //   duration.number = num;}
      if (dur.indexOf("sec") != -1){
         duration.number = num / 60;}
      else if (dur.indexOf("hour") != -1){
         duration.number =num * 60;}
      else {duration.number = num;}
    }
    else {duration.number = 9999;}
  })
  if (sortDuration.times % 2 == 0){
    filteredData.sort((a,b) => a.number - b.number);}
  else {filteredData.sort((a,b) => b.number - a.number);}
  makeTable(filteredData);
}
  
    

function sortComments(){
  console.log(d3.event.target);
  if (sortShape.comments == undefined) {
    sortShape.comments = 0;}
  else {sortShape.comments++}
  console.log(sortShape.comments);
  if (sortShape.comments % 2 == 0){
    filteredData.sort((a,b) => (a.comments > b.comments) ? 1 : ((b.comments > a.comments) ? -1 : 0));}
  else {filteredData.sort((a,b) => (a.comments < b.comments) ? 1 : ((b.comments < a.comments) ? -1 : 0));}
  makeTable(filteredData); 
}


makeTable(data);

var filterButton = d3.select("#filter-btn");

var dateButton = d3.select("#datebutton");
var cityButton = d3.select("#citybutton");
var stateButton = d3.select("#statebutton");
var countryButton = d3.select("#countrybutton");
var shapeButton = d3.select("#shapebutton");
var durationButton = d3.select("#durationbutton");
var commentsButton = d3.select("#commentsbutton");

var sortCityTimes=0; 

filterButton.on("click",getValues);

dateButton.on("click",sortDate);
cityButton.on("click",sortCity);
stateButton.on("click",sortState);
countryButton.on("click",sortCountry);
shapeButton.on("click",sortShape);
durationButton.on("click",sortDuration);
commentsButton.on("click",sortComments);






