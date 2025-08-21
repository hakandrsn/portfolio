import { useState, useEffect, useCallback, useRef } from 'react';
import { FaClock, FaCheck, FaEraser, FaUndo, FaLightbulb } from 'react-icons/fa';
import '../styles/Home.css';
import { generateSudoku, isSameDay } from '../utils/sudokuGenerator';
import { useMediaQuery } from '../hooks/useMediaQuery';

// Tip tanımlamaları
type SudokuGrid = number[][];

interface SudokuPuzzle {
  initial: SudokuGrid;
  solution: SudokuGrid;
}

interface CellPosition {
  row: number;
  col: number;
}

type ErrorsMap = Record<string, boolean>;

function Home() {
  // State tanımlamaları
  const [sudoku, setSudoku] = useState<SudokuPuzzle | null>(null);
  const [userGrid, setUserGrid] = useState<SudokuGrid | null>(null);
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const confettiRef = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsMap>({});
  
  // Mobil cihaz kontrolü için medya sorgusu
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 480px)');
  
  // Günlük sudoku oluştur
  const createDailySudoku = useCallback(() => {
    const today = new Date();
    const storedDate = localStorage.getItem('sudokuDate');
    const storedSudoku = localStorage.getItem('dailySudoku');
    const storedUserGrid = localStorage.getItem('userSudoku');
    const storedTimer = localStorage.getItem('sudokuTimer');
    
    // Tarih kontrolü yap
    if (storedDate && storedSudoku) {
      const savedDate = new Date(storedDate);
      
      // Aynı gün içindeyse kaydedilmiş sudoku'yu kullan
      if (isSameDay(savedDate, today)) {
        const parsedSudoku = JSON.parse(storedSudoku) as SudokuPuzzle;
        setSudoku(parsedSudoku);
        
        // Kullanıcının kaydedilmiş ilerlemesi varsa yükle
        if (storedUserGrid) {
          setUserGrid(JSON.parse(storedUserGrid) as SudokuGrid);
        } else {
          setUserGrid(JSON.parse(JSON.stringify(parsedSudoku.initial)) as SudokuGrid);
        }
        
        // Kaydedilmiş süre varsa yükle
        if (storedTimer) {
          setTimer(parseInt(storedTimer, 10));
        }
        
        return;
      }
    }
    
    // Yeni gün için yeni sudoku oluştur
    const newSudoku = generateSudoku();
    setSudoku(newSudoku);
    setUserGrid(JSON.parse(JSON.stringify(newSudoku.initial)) as SudokuGrid);
    setTimer(0);
    
    // LocalStorage'a kaydet
    localStorage.setItem('sudokuDate', today.toISOString());
    localStorage.setItem('dailySudoku', JSON.stringify(newSudoku));
    localStorage.setItem('userSudoku', JSON.stringify(JSON.parse(JSON.stringify(newSudoku.initial))));
    localStorage.setItem('sudokuTimer', '0');
  }, []);
  
  // Sayfa yüklenirken sudoku oluştur
  useEffect(() => {
    createDailySudoku();
  }, [createDailySudoku]);
  
  // Konfeti oluşturma fonksiyonu
  const createConfetti = useCallback(() => {
    if (!confettiRef.current) return;
    
    // Konfeti parçacıklarını oluştur
    const container = confettiRef.current;
    container.innerHTML = '';
    
    // 100 adet konfeti parçacığı oluştur
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      // Rastgele pozisyon
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 1.5}s`;
      
      container.appendChild(confetti);
    }
  }, []);
  
  // Konfeti animasyonunu göster
  useEffect(() => {
    if (showConfetti) {
      createConfetti();
    }
  }, [showConfetti, createConfetti]);
  
  // Zamanlayıcı
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive && !isComplete) {
      interval = setInterval(() => {
        setTimer(timer => {
          const newTimer = timer + 1;
          localStorage.setItem('sudokuTimer', newTimer.toString());
          return newTimer;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isComplete]);
  
  // Oyun başladığında zamanlayıcıyı başlat
  useEffect(() => {
    if (userGrid && !isActive && !isComplete) {
      setIsActive(true);
    }
  }, [userGrid, isActive, isComplete]);
  
  // Klavye girişi için event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Sayı tuşları (1-9)
      if (e.key >= '1' && e.key <= '9' && selectedCell && !isComplete) {
        handleNumberInput(parseInt(e.key, 10));
      }
      // Silme tuşları (Delete, Backspace)
      else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedCell && !isComplete) {
        handleErase();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, isComplete]);
  
  // Dokunmatik cihazlar için dokunma olaylarını önleme
  useEffect(() => {
    // Çift dokunma ile yakınlaştırmayı önle
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchstart', preventZoom, { passive: false });
    return () => document.removeEventListener('touchstart', preventZoom);
  }, []);
  
  // Hücre seçme işlemi
  const handleCellSelect = (row: number, col: number): void => {
    // Sabit hücreleri seçemezsin
    if (sudoku && sudoku.initial[row][col] !== 0) {
      return;
    }
    
    setSelectedCell({ row, col });
  };
  
  // Sayı girme işlemi
  const handleNumberInput = (num: number): void => {
    if (!selectedCell || isComplete || !userGrid || !sudoku) return;
    
    const { row, col } = selectedCell;
    const newGrid = [...userGrid];
    
    // Sayıyı gir
    newGrid[row][col] = num;
    setUserGrid(newGrid);
    
    // LocalStorage'a kaydet
    localStorage.setItem('userSudoku', JSON.stringify(newGrid));
    
    // Hata kontrolü
    const newErrors = { ...errors };
    if (num !== 0 && sudoku.solution[row][col] !== num) {
      newErrors[`${row}-${col}`] = true;
    } else {
      delete newErrors[`${row}-${col}`];
    }
    setErrors(newErrors);
    
    // Tamamlandı mı kontrol et
    checkCompletion(newGrid);
  };
  
  // Silme işlemi
  const handleErase = (): void => {
    if (!selectedCell || isComplete || !userGrid) return;
    
    const { row, col } = selectedCell;
    const newGrid = [...userGrid];
    
    // Hücreyi boşalt
    newGrid[row][col] = 0;
    setUserGrid(newGrid);
    
    // LocalStorage'a kaydet
    localStorage.setItem('userSudoku', JSON.stringify(newGrid));
    
    // Hata varsa kaldır
    const newErrors = { ...errors };
    delete newErrors[`${row}-${col}`];
    setErrors(newErrors);
  };
  
  // Geri alma işlemi
  const handleReset = (): void => {
    if (!sudoku || isComplete) return;
    
    // Başlangıç durumuna sıfırla
    setUserGrid(JSON.parse(JSON.stringify(sudoku.initial)) as SudokuGrid);
    setErrors({});
    setSelectedCell(null);
    
    // LocalStorage'a kaydet
    localStorage.setItem('userSudoku', JSON.stringify(JSON.parse(JSON.stringify(sudoku.initial))));
  };
  
  // İpucu gösterme
  const handleHint = (): void => {
    if (!selectedCell || isComplete || !userGrid || !sudoku) return;
    
    const { row, col } = selectedCell;
    const newGrid = [...userGrid];
    
    // Doğru sayıyı göster
    newGrid[row][col] = sudoku.solution[row][col];
    setUserGrid(newGrid);
    
    // LocalStorage'a kaydet
    localStorage.setItem('userSudoku', JSON.stringify(newGrid));
    
    // Hata varsa kaldır
    const newErrors = { ...errors };
    delete newErrors[`${row}-${col}`];
    setErrors(newErrors);
    
    // Tamamlandı mı kontrol et
    checkCompletion(newGrid);
  };
  
  // Tamamlanma kontrolü
  const checkCompletion = useCallback((grid: SudokuGrid) => {
    // Tüm hücreler dolu mu kontrol et
    let isValid = true;
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) {
          isValid = false;
          break;
        }
      }
      if (!isValid) break;
    }
    
    if (isValid) {
      // Tüm hücrelerin doğru olup olmadığını kontrol et
      const hasErrors = Object.keys(errors).length > 0;
      
      if (!hasErrors) {
        setIsComplete(true);
        setShowConfetti(true);
        
        // 3 saniye sonra konfeti animasyonunu kaldır
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);
      }
    }
  }, [errors]);
  
  // Zaman formatı
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Hücre sınıfı belirleme
  const getCellClass = (row: number, col: number): string => {
    let className = 'sudoku-cell';
    
    // Sabit hücre mi?
    if (sudoku && sudoku.initial[row][col] !== 0) {
      className += ' fixed';
    }
    
    // Seçili hücre mi?
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      className += ' selected';
    }
    
    // Hata var mı? (Sadece yanlış girilen hücreler için)
    if (errors[`${row}-${col}`]) {
      className += ' error';
    }
    
    // Seçili hücreyle aynı değere sahip mi?
    if (selectedCell && userGrid && userGrid[selectedCell.row][selectedCell.col] !== 0 && 
        userGrid[selectedCell.row][selectedCell.col] === userGrid[row][col] && 
        userGrid[row][col] !== 0) {
      className += ' same-value';
    }
    
    return className;
  };
  
  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Hoş Geldiniz</h1>
        <p className="home-subtitle">
          Biraz zihin pratiği iyi olur.
        </p>
      </div>
      
      {sudoku && userGrid ? (
        <div className="sudoku-container">
          <div className="sudoku-header">
            <h2 className="sudoku-title">Bu günün sudoku'su</h2>
            <div className="sudoku-timer">
              <FaClock /> {formatTime(timer)}
            </div>
          </div>
          
          <div className="sudoku-grid">
            {userGrid.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <div 
                  key={`${rowIndex}-${colIndex}`}
                  className={getCellClass(rowIndex, colIndex)}
                  onClick={() => handleCellSelect(rowIndex, colIndex)}
                  onTouchStart={() => handleCellSelect(rowIndex, colIndex)}
                  aria-label={`Hücre ${rowIndex+1}-${colIndex+1}, değer: ${cell !== 0 ? cell : 'boş'}`}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              ))
            ))}
          </div>
          
          <div className="sudoku-numbers">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <div 
                key={num}
                className="sudoku-number"
                onClick={() => handleNumberInput(num)}
                onTouchStart={() => handleNumberInput(num)}
                aria-label={`Sayı ${num}`}
                role="button"
              >
                {num}
              </div>
            ))}
          </div>
          
          <div className="sudoku-actions">
            <button 
              className="sudoku-button" 
              onClick={handleErase}
              aria-label="Sil"
            >
              <FaEraser /> {!isSmallMobile && 'Sil'}
            </button>
            <button 
              className="sudoku-button" 
              onClick={handleReset}
              aria-label="Sıfırla"
            >
              <FaUndo /> {!isSmallMobile && 'Sıfırla'}
            </button>
            <button 
              className="sudoku-button" 
              onClick={handleHint}
              aria-label="İpucu"
            >
              <FaLightbulb /> {!isSmallMobile && 'İpucu'}
            </button>
          </div>
          
          {showConfetti && (
            <div className="celebration-animation" ref={confettiRef}></div>
          )}
          
          {isComplete && (
            <div className="sudoku-status success">
              <FaCheck /> 
              {isMobile ? (
                <>
                  <span>Tebrikler!</span>
                  <span>Süreniz: {formatTime(timer)}</span>
                </>
              ) : (
                <>Tebrikler! Bugün zihnindesiniz. Süreniz: {formatTime(timer)}</>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Sudoku yükleniyor...</p>
        </div>
      )}
      
    </div>
  );
}

export default Home;
