/**
 * Resim yollarını Vite için uygun formata dönüştüren yardımcı fonksiyon
 * Bu fonksiyon, /src/ ile başlayan yolları düzeltir ve /assets/ yollarını doğrudan döndürür
 */
export const resolveImagePath = (path: string): string => {
  if (!path) return '';
  
  // Eğer path /src/ ile başlıyorsa, yolu düzelt
  if (path.startsWith('/src/')) {
    // /src/ kısmını kaldır
    return path.replace('/src/', '/');
  }
  
  // /assets/ ile başlayan yollar public klasöründen gelir, doğrudan döndür
  if (path.startsWith('/assets/')) {
    return path;
  }
  
  return path;
};
