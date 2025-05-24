// Sudoku oluşturucu ve çözücü fonksiyonlar
type SudokuGrid = number[][];
type SudokuPuzzle = {
  initial: SudokuGrid;
  solution: SudokuGrid;
};

// Boş 9x9 sudoku tablosu oluştur
export const createEmptyGrid = (): SudokuGrid => {
  return Array(9).fill(null).map(() => Array(9).fill(0));
};

// Köşegen blokları doldur
export const fillDiagonal = (grid: SudokuGrid): void => {
  for (let i = 0; i < 9; i += 3) {
    fillBox(grid, i, i);
  }
};

// 3x3 kutuyu doldur
export const fillBox = (grid: SudokuGrid, row: number, col: number): void => {
  let num: number;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      do {
        num = Math.floor(Math.random() * 9) + 1;
      } while (!isSafe(grid, row + i, col + j, num));
      
      grid[row + i][col + j] = num;
    }
  }
};

// Sayının güvenli olup olmadığını kontrol et
export const isSafe = (grid: SudokuGrid, row: number, col: number, num: number): boolean => {
  // Satır kontrolü
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) {
      return false;
    }
  }
  
  // Sütun kontrolü
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) {
      return false;
    }
  }
  
  // 3x3 kutu kontrolü
  let startRow = row - row % 3;
  let startCol = col - col % 3;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }
  
  return true;
};

// Sudoku çözücü
export const solveSudoku = (grid: SudokuGrid): boolean => {
  let row = -1;
  let col = -1;
  let isEmpty = true;
  
  // Boş hücre bul
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        row = i;
        col = j;
        isEmpty = false;
        break;
      }
    }
    if (!isEmpty) {
      break;
    }
  }
  
  // Boş hücre yoksa çözülmüş demektir
  if (isEmpty) {
    return true;
  }
  
  // Sayıları dene
  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;
      
      if (solveSudoku(grid)) {
        return true;
      }
      
      grid[row][col] = 0;
    }
  }
  
  return false;
};

// Belirli sayıda hücreyi boşalt
export const removeDigits = (grid: SudokuGrid, count: number): void => {
  let removed = 0;
  while (removed < count) {
    let cellId = Math.floor(Math.random() * 81);
    let row = Math.floor(cellId / 9);
    let col = cellId % 9;
    
    if (grid[row][col] !== 0) {
      grid[row][col] = 0;
      removed++;
    }
  }
};

// Sudoku oluştur
export const generateSudoku = (): SudokuPuzzle => {
  // Boş 9x9 sudoku tablosu oluştur
  const grid = createEmptyGrid();
  
  // Rastgele sayılarla doldur
  fillDiagonal(grid);
  solveSudoku(grid);
  
  // Çözülmüş sudoku'yu saklayacağız
  const solution = JSON.parse(JSON.stringify(grid));
  
  // Kolay seviye için bazı hücreleri boşalt
  removeDigits(grid, 45); // 45 hücre boşaltılıyor (kolay seviye)
  
  // Oyun tablosu ve çözümü döndür
  return {
    initial: grid,
    solution: solution
  };
};

// Tarih kontrolü için yardımcı fonksiyon
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};
