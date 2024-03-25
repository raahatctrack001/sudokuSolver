


document.addEventListener("DOMContentLoaded", function () {
  const sudokuGrid = document.getElementById("sudoku-grid");
  const solveBtn = document.getElementById("solve-btn");
  const clearBtn = document.getElementById("clear-btn");

  // Function to create Sudoku grid cells
  function createSudokuGrid() {
    for (let i = 0; i < 81; i++) {
      const cell = document.createElement("input");
      cell.type = "text";
      cell.maxLength = 1;
      cell.classList.add("sudoku-cell");
      sudokuGrid.appendChild(cell);
    }
  }

  // Call function to create Sudoku grid cells
  createSudokuGrid();

  // Event listener for solve button
  solveBtn.addEventListener("click", function () {
    const sudokuValues = getSudokuValues();
    if (isValidSudoku(sudokuValues)) {
      solveSudoku(sudokuValues);
    } else {
      alert("Invalid Sudoku puzzle! Please check your input.");
    }
  });

  // Event listener for clear button
  clearBtn.addEventListener("click", function () {
    const cells = sudokuGrid.querySelectorAll(".sudoku-cell");
    cells.forEach((cell) => {
      cell.value = "";
    });
  });

  // Function to get current Sudoku values from input cells
  function getSudokuValues() {
    const cells = sudokuGrid.querySelectorAll(".sudoku-cell");
    const sudokuValues = [];
    cells.forEach((cell) => {
      sudokuValues.push(parseInt(cell.value) || 0); // Convert value to integer, default to 0 if NaN
    });
    return sudokuValues;
  }

  // Function to check if Sudoku values are valid
  function isValidSudoku(values) {
    for (let i = 0; i < 9; i++) {
      const row = [];
      const col = [];
      const block = [];

      for (let j = 0; j < 9; j++) {
        const rowIndex = i * 9 + j;
        const colIndex = i + 9 * j;
        const blockIndex = 3 * Math.floor(i / 3) + j % 3 + 9 * Math.floor(j / 3);

        if (values[rowIndex] !== 0 && row.includes(values[rowIndex])) return false;
        if (values[colIndex] !== 0 && col.includes(values[colIndex])) return false;
        if (values[blockIndex] !== 0 && block.includes(values[blockIndex])) return false;

        row.push(values[rowIndex]);
        col.push(values[colIndex]);
        block.push(values[blockIndex]);
      }
    }
    return true;
  }

  // Function to solve Sudoku puzzle
  function solveSudoku(values) {
    if (backtrackSudoku(values)) {
      updateGrid(values);
      alert("Sudoku solved!");
    } else {
      alert("No solution found for this Sudoku puzzle.");
    }
  }

  // Backtracking algorithm to solve Sudoku
  function backtrackSudoku(values) {
    const emptyCell = findEmptyCell(values);
    if (!emptyCell) {
      return true; // Puzzle solved
    }

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(values, row, col, num)) {
        values[row * 9 + col] = num;

        if (backtrackSudoku(values)) {
          return true; // Puzzle solved recursively
        }

        values[row * 9 + col] = 0; // Backtrack if solution not found
      }
    }

    return false; // No solution found for this path
  }

  // Function to find an empty cell in the Sudoku grid
  function findEmptyCell(values) {
    for (let i = 0; i < 81; i++) {
      if (values[i] === 0) {
        return [Math.floor(i / 9), i % 9]; // Return row and column of empty cell
      }
    }
    return null; // No empty cell found
  }

  // Function to update the Sudoku grid with solved values
  function updateGrid(values) {
    const cells = sudokuGrid.querySelectorAll(".sudoku-cell");
    cells.forEach((cell, index) => {
      cell.value = values[index];
    });
  }

  // Function to check if a move is valid in Sudoku
  function isValidMove(values, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (values[row * 9 + i] === num || values[i * 9 + col] === num) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (values[i * 9 + j] === num) {
          return false;
        }
      }
    }

    return true; // Valid move
  }

});
