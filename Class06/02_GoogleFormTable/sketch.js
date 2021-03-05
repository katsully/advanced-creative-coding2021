var table;
var headers = [];
var dropdown;

var questionOneDates = [];


function preload(){
  //file is comma separated value "csv"
  //and has a header specifying the columns labels
  // header is singular!
  table = loadTable('assets/LastTime.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 800);

  headers = [table.columns[1],table.columns[2],table.columns[3],table.columns[4]];

  dropdown = createSelect();
  // positioning within my canvas
  dropdown.position(10,10);
  // the second number (ie the 1) is what is returned for dropdown.value()
  dropdown.option("Select a question!", 0)
  dropdown.option(headers[0], 1);
  dropdown.option(headers[1], 2);
  dropdown.option(headers[2], 3);
  dropdown.option(headers[3], 4);

  // get all dates from question one
  for(var i=0; i<table.getRowCount(); i++){
    questionOneDates.push(new Date(table.getString(i,1)));
  }

}

function draw() {
  background(220);

  // airplane question
  if(dropdown.value() == 1){
    background(255,0,0);
    for(var i=0; i<questionOneDates.length; i++){
      questionOneDates[i].drawDate();
    }
  } else if(dropdown.value() == 2){
    background(0,255,0);
  }else if(dropdown.value() == 3){
    background(0,0,255);
  }else if(dropdown.value() == 4){
    background(255,0,255);
  }
}

class Date{
  constructor(date){
    var seperates = date.split("/");
    this.month = seperates[0];
    this.day = seperates[1];
    this.year = seperates[2];
    this.x = random(width);
    this.y = random(height);
  }

  printDate(){
    var month;
    if(this.month == 1) {
      month = "Jaunary";
    } else if (this.month == 2){
      month = "February";
    } else if (this.month == 3){
      month = "March";
    } else if (this.month == 4){
      month = "April";
    } else if (this.month == 5){
      month = "May";
    } else if (this.month == 6){
      month = "June";
    } else if (this.month == 7){
      month = "July";
    } else if (this.month == 8){
      month = "August";
    } else if (this.month == 9){
      month = "September";
    } else if (this.month == 10){
      month = "October";
    } else if (this.month == 11){
      month = "November";
    } else {
      month = "December";
    }

    return month + " " + this.day + ", " + this.year;
  }

  drawDate(){
    text(this.printDate(), this.x, this.y);
  }
}
