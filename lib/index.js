#!/usr/bin/env node
var moment = require('moment');
var sync = require('synchronize');
var scraperjs = require('scraperjs');

function TideTimes(argv) {

  this.location = 'falmouth';  //Default location
  this.date = '';
  this.format = "text";

  // if the location argument starts with @ remove it
  this.formatLocation = function(location) {
    if (location[0] === '@') {
      return location.substring(1)
    } else {
      return location
    }
  }

  // takes tomorrow or a day of the week and converts it to a date url fragment
  this.formatDate = function(day) {
    // Vaid Day arguments
    var dayArgs = ['tomorrow', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    var index = dayArgs.indexOf(day);
    if (index > -1 ){
      if (index === 0) {
        var date = moment().add('days', 1).format('-YYYYMMDD');
      } else {
        var date = moment().day(index).format('-YYYYMMDD');
      }
      return date;
    }
  }

  // Format the scaped tide times
  function formatTideTimes (times) {

    if (this.format == "text") {
      return this._formatToText(times)
    } else if (this.format == "JSON") {
     return formatToJSON(times)
    }
  }

  // Format the scaped tide times by removing extra spaces, adding a line break after m, and removing the leading spaces
  this._formatToText  = function (times) {
    return times.replace(/\s+/g, " ").replace(/m /g, "m\n").substring(1)
  }

  //TODO
  //format the scraped data to JSON in the format {"low" : [{"time": "11.58", "hight": 1.30} , {"time": "22.50", "hight": 1.40}], "high" : [{"time": "03.25", "hight": 4.60}, {"time": "14.25", "hight": 4.60}]}
  this._formatToJSON = function(times) {
     text = this._formatToText(times);
     json = {"low" : [], "high" : []}
     a = text.split("\n");
     a.pop(); //get rid of last value due to trailigng \n
     timeRegex = /([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/ ;
     hightRegex = /[0-9]*\.[0-9]{2}/ ;
     a.map(function(line){
          time = line.match(timeRegex)[0]
          hight = line.match(hightRegex)[0]
          tide = {"time" : time , "hight" : hight}
        if (line[0] == "H") {
              json["high"].push(tide)
        } else {
              json["low"].push(tide)
        }
     })
     return  json
  }

  if ((typeof(argv) !== "undefined") && (typeof(argv._) !== "undefined")){
    arguments = argv._
  }

  //Set location and date via values passed from args
  if (arguments.length == 1) {
    // is the argument a date or a location?
    var d = this.formatDate(arguments[0])
    if (typeof(d) != "undefined"){
      this.date = d
    } else {
      this.location = this.formatLocation(arguments[0])
    }
    } else if (arguments.length == 2) {
    // two arguments provided
    // first argument should be date related
    // second argument shoudl be a location
    this.date = this.formatDate(arguments[0])

    this.location = this.formatLocation(arguments[1])
  }

  // the uri of page where we will scrape the data
  this.uri = 'http://www.tidetimes.co.uk/'+this.location+'-tide-times'+this.date;


  this.getTimes = function(){

    // Scrape the data
    scraperjs.StaticScraper.create(this.uri)
      .scrape(function($) {
         return $(".times").text();
     }, function(tides) {
          console.log(formatTideTimes(tides));
      })

  }

}

module.exports = TideTimes;
