var table;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable('assets/mammals.csv', 'csv', 'header');
}

function setup() {
  //count the rows and columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');

  // print everything in 'name' column
  print(table.getColumn('name'));

  //cycle through the table
  for (let r = 0; r < table.getRowCount(); r++)
    for (let c = 0; c < table.getColumnCount(); c++) {
      print(table.getString(r, c));
    }
}