import { useState, useEffect } from 'react';

/**
 * Medya sorgusu için özel hook
 * @param query Medya sorgusu (örn. '(max-width: 768px)')
 * @returns Sorgunun eşleşip eşleşmediği
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    // Medya sorgusu değiştiğinde state'i güncelle
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Event listener ekle
    mediaQuery.addEventListener('change', handler);

    // Temizleme fonksiyonu
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}
