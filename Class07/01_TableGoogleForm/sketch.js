var table;
var dates = [];

function preload(){
  table = loadTable('assets/LastTime.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, 800);

  for(var rowNum=0; rowNum<table.getRowCount(); rowNum++){
    for(var colNum=1; colNum<table.getColumnCount()-1; colNum++){
      dates.push(new Date(table.getString(rowNum, colNum), colNum));
    }
  }

  // passing in the function definition!
  dates.sort(compare);

}

function draw() {
  background(220);

  var x_val = 40;
  var y_val = 40;
  for(var i=0; i<dates.length; i++){
    if(y_val > height - 40){
      // this creates a new column
      x_val += 350;
      // this sets the 'cursor' at the top of the new column
      y_val = 40;
    }
    dates[i].drawDate(x_val,y_val);
    y_val +=40;
  }

  fill('red');
  circle(x_val, y_val+25, 25);
  text(table.columns[1], x_val+50, y_val+25);

  fill('green');
  circle(x_val, y_val+75, 25);
  text(table.columns[2], x_val+50, y_val+75);

  fill('blue');
  circle(x_val, y_val+125, 25);
  text(table.columns[3], x_val+50, y_val+125);

}

class Date{
  // im passing in a string (ie "12/27/2019")
  constructor(dateString, colNum){
    var dateParts = dateString.split('/');
    // 12/27/2019 ---> ['12', '27', '2019']
    this.year = int(dateParts[2]);
    this.month = int(dateParts[0]);
    this.day = int(dateParts[1]);

    this.col = colNum;
  }

  // helper function
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

  drawDate(x,y){
    if(this.col == 1){
      fill('red');
    } else if(this.col == 2){
      fill('green');
    } else {
      fill('blue');
    }
    textSize(32);
    text(this.printDate(), x, y);
  }
}


function compare(dateA, dateB){
  // first, compare the years
  if(dateA.year < dateB.year){
    // whenever a function hits a 'return' it LEAVES the function
    return -1;  // by returning -1 dateA happened first
  } 
  if (dateA.year > dateB.year) {
    return 1; //by returning 1 dateB happened first
  }
  if(dateA.month < dateB.month){
    return -1;  
  } 
  if (dateA.month > dateB.month) {
    return 1; 
  }
  if(dateA.day < dateB.day){
    return -1;  
  } 
  if (dateA.day > dateB.day) {
    return 1; 
  }
  return 0; // dateA is the same as dateB
}
