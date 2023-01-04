
let numSelected = null;
let tileSelected = null;

let errors = 0;
var resetBoard = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],  
]

var resetSolution = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
]
var board = generateSudoku(50);

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function(){
    setGame();
}

function setGame(){
    
    for(let i = 1; i <= 9; i++){
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);       
    }

    for(let r = 0; r < 9; r++){
        for(let c = 0; c < 9; c++){
            let tile = document.createElement("div");
            tile.id = r.toString()+"-"+c.toString();
            if(board[r][c] != 0){
                tile.innerText = board[r][c];
                tile.classList.add("tile-selected");
            }

            if(r == 2 || r == 5)
                tile.classList.add("horizontal-line");
            if(c == 2 || c == 5)
                tile.classList.add("vertical-line");
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }

    let solveButton = document.createElement("button");
    solveButton.type = "button";
    solveButton.innerText = "Solve!";
    solveButton.classList.add("button-4");
    solveButton.addEventListener("click", solve);
    document.getElementById("button").append(solveButton);

    let resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.innerText = "New";
    resetButton.classList.add("button-4");
    resetButton.addEventListener("click", reset);
    document.getElementById("button").append(resetButton );
}

function reset(){
  board = generateSudoku(50);
  for(let r = 0; r < 9; r++){
    for(let c = 0; c < 9; c++){
        var tile = document.getElementById(r.toString()+"-"+c.toString());
        
        tile.innerText = ' ';
        tile.classList.remove("tile-selected");

        if(r == 2 || r == 5)
            tile.classList.add("horizontal-line");
        if(c == 2 || c == 5)
            tile.classList.add("vertical-line");
        tile.addEventListener("click", selectTile);
        tile.classList.add("tile");
        document.getElementById("board").append(tile);
    }
  }

  for(let r = 0; r < 9; r++){
    for(let c = 0; c < 9; c++){
        var tile = document.getElementById(r.toString()+"-"+c.toString());
        
        if(board[r][c] != 0){
            tile.innerText = board[r][c];
            tile.classList.add("tile-selected");
        }

        if(r == 2 || r == 5)
            tile.classList.add("horizontal-line");
        if(c == 2 || c == 5)
            tile.classList.add("vertical-line");
        tile.addEventListener("click", selectTile);
        tile.classList.add("tile");
        document.getElementById("board").append(tile);
    }
  }
}
function solve(){
    if(solveSudoku(board)){
        let row = 0;
        let collumn = 0;
        setInterval(() => {
          document.getElementById(row.toString()+"-"+collumn.toString()).innerText = board[row][collumn];
          collumn++;
          if(collumn == 9){
            if(row == 8)
              return;
            row++;
            collumn = 0;
          }
        }, 100);
    }else{
        alert("no solution");
    }
}
function selectNumber(){
    if(numSelected != null){
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
  if (numSelected) {
      if (this.innerText != "") {
          return;
      }

      // "0-0" "0-1" .. "3-1"
      let coords = this.id.split("-"); //["0", "0"]
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      if (solution[r][c] == numSelected.id) {
          this.innerText = numSelected.id;
      }
      else {
          errors += 1;
          document.getElementById("errors").innerText = errors;
      }
  }
}


  function solveSudoku(grid) {
    // This function will return the first empty cell it finds in the grid, or null if the grid is full
    function findEmptyCell() {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] == 0) {
            return { row, col };
          }
        }
      }
      return null;
    }
  
    // This function will return true if the given number is valid in the given row, false otherwise
    function isValidInRow(row, num) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] == num) return false;
      }
      return true;
    }
  
    // This function will return true if the given number is valid in the given column, false otherwise
    function isValidInCol(col, num) {
      for (let row = 0; row < 9; row++) {
        if (grid[row][col] == num) return false;
      }
      return true;
    }
  
    // This function will return true if the given number is valid in the 3x3 subgrid, false otherwise
    function isValidInSubgrid(row, col, num) {
      let startRow = Math.floor(row / 3) * 3;
      let startCol = Math.floor(col / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (grid[i][j] == num) return false;
        }
      }
      return true;
    }
  
    // This function will return true if the given number is valid in the given cell, false otherwise
    function isValid(row, col, num) {
      return isValidInRow(row, num) && isValidInCol(col, num) && isValidInSubgrid(row, col, num);
    }
  
    // This function will try to solve the puzzle by trying different numbers in empty cells
    function solve() {
      let emptyCell = findEmptyCell();
      if (!emptyCell) return true; // If there are no empty cells, the puzzle is solved
  
      let { row, col } = emptyCell;
  
      // Try every possible number for the current cell
      for (let num = 1; num <= 9; num++) {
        if (isValid(row, col, num)) {
          // If the number is valid, place it in the cell and try to solve the rest of the puzzle
          grid[row][col] = num;
          if (solve()) return true; // If the puzzle is solved, return true
          grid[row][col] = 0; // If the puzzle is not solved, backtrack and try a different number
        }
      }
      return false; // If no number works, return false
    }
  
    return solve();
  }
  
  function generateSudoku(numCellsToRemove = 50) {
    // Initialize the Sudoku board
    let board = [    [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
  
    // Fill the diagonal of 3x3 squares
    for (let i = 0; i < 9; i += 3) {
      fillSquare(board, i, i);
    }
  
    // Fill the rest of the board
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          fillCell(board, i, j);
        }
      }
    }
  
    // Remove a certain number of cells from the board
    let cellsRemoved = 0;
    while (cellsRemoved < numCellsToRemove) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        cellsRemoved++;
      }
    }
  
    // Return the generated board
    return board;
  }
  
  // Helper function to fill a 3x3 square
function fillSquare(board, row, col) {
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = row; i < row + 3; i++) {
    for (let j = col; j < col + 3; j++) {
      let randIndex = Math.floor(Math.random() * nums.length);
      let randNum = nums[randIndex];
      if (!checkRow(board, i, randNum) && !checkCol(board, j, randNum) && !checkSquare(board, i, j, randNum)) {
        board[i][j] = randNum;
      } else {
        j--;
      }
      nums.splice(randIndex, 1);
    }
  }
}

// Helper function to fill a cell
function fillCell(board, row, col) {
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  while (nums.length > 0) {
    let randIndex = Math.floor(Math.random() * nums.length);
    let randNum = nums[randIndex];
    if (!checkRow(board, row, randNum) && !checkCol(board, col, randNum) && !checkSquare(board, row, col, randNum)) {
      board[row][col] = randNum;
      return;
    } else {
      nums.splice(randIndex, 1);
    }
  }
}

// Helper function to check if a number is in a row
function checkRow(board, row, num) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === num) {
        return true;
      }
    }
    return false;
  }
  
  // Helper function to check if a number is in a column
  function checkCol(board, col, num) {
    for (let row = 0; row < 9; row++) {
      if (board[row][col] === num) {
        return true;
      }
    }
    return false;
  }
  
  // Helper function to check if a number is in a 3x3 square
  function checkSquare(board, row, col, num) {
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) {
          return true;
        }
      }
    }
    return false;
  }