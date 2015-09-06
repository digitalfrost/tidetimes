var TideCrawler = require('../lib/index.js');
var should = require('chai').should();

var tideData = "

                                  High Tide:
                                03:05
                Height:
                3.90m


                                  Low Tide:
                                09:25
                Height:
                1.80m


                                  High Tide:
                                15:58
                Height:
                3.80m


                                  Low Tide:
                                22:18
                Height:
                1.90m

                          "

var tideDataAsText = "High Tide: 03:05 Height: 3.90m
Low Tide: 09:25 Height: 1.80m
High Tide: 15:58 Height: 3.80m
Low Tide: 22:18 Height: 1.90m"

var tideDataAsJSON = "JSON DATA TO GO HERE"


describe('format tide data', function(){
  it('should format tide data as text', function(){
      tides = new TideCrawler();
      tides.formatToText(tideData).should.equal(tideDataAsText)
  });
  it('should format tide data as JSON', function(){
      tides = new TideCrawler();
      tides.formatToJSON(tideData).should.equal(tideDataAsJSON)
  });
});




//console.log("Test with time and location");
//var tides4 = new TideCrawler("monday", "@scrabster");
//console.log(tides4.uri);
//console.log(tides4.getTimes());

