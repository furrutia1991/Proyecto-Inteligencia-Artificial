//
// Game
//
function Game() {
  this.board = new Board();

  this.run = function() {
    this.board.start();
  }

  this.runHard = function() {
    this.board.startHard();
  }

  this.runMedium = function() {
    this.board.startMedium();
  }

  this.runEasy = function() {
    this.board.startEasy();
  }

  
  this.validate = function() {
    this.board.validate();
  }

  this.solve = function() {
    this.board.showResult();
  }
}

//
// Board
//
function Board() {
  this.grid   = new Grid();
  this.sudoku = new Array();

  this.start = function() {
    this.generateSudoku();
    this.showTips();
  }

  this.startEasy = function() {
    this.generateSudoku();
    this.showEasy();
  }

  this.startMedium = function() {
    this.generateSudoku();
    this.showMedium();
  }

  this.startHard = function() {
    this.generateSudoku();
    this.showHard();
  }

  this.generateSudoku = function() {
    this.initSudoku();
    this.generateCell(0);
  }

  this.initSudoku = function() {
    for (var row = 0; row < this.grid.rows; ++ row)
      this.sudoku[row] = new Array(this.grid.cols);
  }

  this.generateCell = function(id) {
    if (id == this.grid.rows * this.grid.cols) 
      return(true);
    
    var row  = Math.floor(id / this.grid.rows);
    var col  = id - (row * this.grid.rows)
    var suit = this.shuffle(this.grid.suit);
    
    for (var index in suit) {
      this.sudoku[row][col] = suit[index];

      if ( this.isValidCell(row, col) )
        if ( this.generateCell(id + 1) )
          return(true);
    }

    this.sudoku[row][col] = null;
    return(false);
  }

  this.isValidCell = function(row, col) {
    return( this.isValidRow(row, col) &&
            this.isValidColumn(row, col) &&
            this.isValidRegion(row, col) );
  }

  this.isValidRow = function(row, col) {
    var count = new Array();
    for (var c = 0; c <= col; ++ c) {
      if (count[ this.sudoku[row][c] ] != null)
        return(false);
      count[ this.sudoku[row][c] ] = 1;
    }
    return(true);
  }

  this.isValidColumn = function(row, col) {
    var count = new Array();
    for (var r = 0; r <= row; ++ r) {
      if (count[ this.sudoku[r][col] ] != null)
        return(false);
      count[ this.sudoku[r][col] ] = 1;
    }
    return(true);
  }
  
  this.isValidRegion = function(row, col) {
    var count = new Array();
    var rowi  = this.grid.region * Math.floor(row / this.grid.region);
    var coli  = this.grid.region * Math.floor(col / this.grid.region);

    for (var r = rowi; r <= row; ++ r)
      for (var c = coli; c <= col; ++ c) {
        if ( count[ this.sudoku[r][c] ] != null)
          return(false);
        count[ this.sudoku[r][c] ] = 1;
      }

    return(true);
  }

  this.showHard = function() {
    var spans = this.shuffle(this.grid.hard);
    for (var row = 0; row < this.grid.rows; ++ row) {
      var tips = this.shuffle(this.grid.tips);
      for (var col = 0; col < spans[row]; ++ col)
        this.grid.setCellValue(row, tips[col], this.sudoku[row][ tips[col] ]);
    }
  }

  this.showMedium = function() {
    var spans = this.shuffle(this.grid.medium);
    for (var row = 0; row < this.grid.rows; ++ row) {
      var tips = this.shuffle(this.grid.tips);
      for (var col = 0; col < spans[row]; ++ col)
        this.grid.setCellValue(row, tips[col], this.sudoku[row][ tips[col] ]);
    }
  }

  this.showEasy = function() {
    var spans = this.shuffle(this.grid.easy);
    for (var row = 0; row < this.grid.rows; ++ row) {
      var tips = this.shuffle(this.grid.tips);
      for (var col = 0; col < spans[row]; ++ col)
        this.grid.setCellValue(row, tips[col], this.sudoku[row][ tips[col] ]);
    }
  }

  this.showTips = function() {
    var spans = this.shuffle(this.grid.spans);
    for (var row = 0; row < this.grid.rows; ++ row) {
      var tips = this.shuffle(this.grid.tips);
      for (var col = 0; col < spans[row]; ++ col)
        this.grid.setCellValue(row, tips[col], this.sudoku[row][ tips[col] ]);
    }
  }

  this.showResult = function() {
    var spans = this.shuffle(this.grid.result);
    for (var row = 0; row < this.grid.rows; ++ row) {
      var tips = this.shuffle(this.grid.tips);
      for (var col = 0; col < spans[row]; ++ col)
        this.grid.setCellValue(row, tips[col], this.sudoku[row][ tips[col] ]);
    }
  }

  this.validate = function() {
    if ( this.isValidSudoku() )
      alert("FELICITACIONES!!! Has logrado solventar el SuDoKu.");
    else
      alert("Lo siento, esta no es un respuesta valida para el SuDoKu.");
  }

  this.isValidSudoku = function() {
    var cells = this.grid.getCellValues();

    var valid = true;
    for (var row in this.sudoku)
      for (var col in this.sudoku[row])
        if (cells[row][col] != this.sudoku[row][col]) {
          valid = false;
          break;
        }
        
    return(valid);
  }

  this.shuffle = function(suit) {
    for (var i in suit)
      suit = swap(suit, i, Math.floor( Math.random() * suit.length ) );
    return(suit);
  }
}

//
// Grid
//
function Grid() {
  this.rows   = 9;
  this.cols   = 9;
  this.region = 3;

  //Levels  #(E:45; M:31; H:25)
  this.hard  = new Array(6, 4, 3, 3, 3, 2, 2, 2, 1);
  this.medium  = new Array(7, 6, 5, 4, 4, 2, 1, 1, 1);
  this.easy  = new Array(8, 6, 6, 6, 5, 5, 4, 3, 2);

  this.spans  = new Array(4, 4, 4, 3, 3, 3, 2, 2, 2);
  this.result = new Array(9, 9, 9, 9, 9, 9, 9, 9, 9);
  this.tips   = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8);
  this.suit   = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);

  this.getCellId = function(row, col) {
    return("c" + String( (row * this.rows) + col) );
  }

  this.getCell = function(id) {
    return( document.getElementById(id) );
  }

  this.getCellValue = function(row, col) {
    return( this.getCellValueById( this.getCellId(row, col) ) );
  }

  this.getCellValueById = function(id) {
    return( this.getCell(id).value );
  }

  this.setCellValue = function(row, col, value) {
    this.setCellValueById( this.getCellId(row, col), value);
  }
  
  this.setCellValueById = function(id, value) {
    var cell = this.getCell(id);
    cell.value     = String(value);
    cell.className = "cell-disable";
    cell.readOnly  = "readonly";
  }

  this.getCellValues = function() {
    var cells = new Array();

    for (var row = 0; row < this.rows; ++ row) {
      cells[row] = new Array();
      for (var col = 0; col < this.cols; ++ col)
        cells[row][col] = this.getCellValue(row, col);
    }

    return(cells);
  }
}

//
// Utils
//

function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  return(array);
}

function getKeyCode(e) {
  return(e? e.keyCode: window.event.keyCode);
}

//
//
document.onkeydown = function(e){
  if( getKeyCode(e) == 116) {
     window.location.reload(true);
     return(false);
    }
}

//
//
var game = new Game;
game.run();