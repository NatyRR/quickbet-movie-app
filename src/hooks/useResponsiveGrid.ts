'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface ResponsiveGridOptions {
  minCardWidth: number;
  maxCardWidth: number;
  gap: number;
  minColumns: number;
  maxColumns: number;
}

const defaultOptions: ResponsiveGridOptions = {
  minCardWidth: 130,
  maxCardWidth: 200,
  gap: 24,
  minColumns: 2,
  maxColumns: 8,
};

export const useResponsiveGrid = (
  options: Partial<ResponsiveGridOptions> = {}
) => {
  const config = { ...defaultOptions, ...options };
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridColumns, setGridColumns] = useState<number>(config.minColumns);
  const [isReady, setIsReady] = useState(true); // Empezar como true para evitar bloqueo

  const calculateOptimalColumns = useCallback(
    (containerWidth: number) => {
      if (containerWidth <= 0) return config.minColumns;

      // Añadir margen de seguridad para evitar columnas cortadas
      const safetyMargin = 40; // 20px de cada lado
      const availableWidth = Math.max(containerWidth - safetyMargin, 200);

      // Breakpoints inteligentes basados en el ancho del contenedor
      const getBreakpointColumns = (
        width: number
      ): { min: number; max: number; ideal: number } => {
        if (width < 480) {
          // Mobile pequeño - 2 columnas siempre
          return { min: 2, max: 2, ideal: 2 };
        } else if (width < 640) {
          // Mobile grande - 2-3 columnas
          return { min: 2, max: 3, ideal: 2 };
        } else if (width < 768) {
          // Tablet pequeño - máximo 3 columnas
          return { min: 3, max: 3, ideal: 3 };
        } else if (width < 1024) {
          // Tablet grande - máximo 3 columnas para evitar cortes
          return { min: 3, max: 3, ideal: 3 };
        } else if (width < 1280) {
          // Desktop pequeño - 4-5 columnas
          return { min: 4, max: 5, ideal: 4 };
        } else if (width < 1536) {
          // Desktop grande - 5-6 columnas
          return { min: 5, max: 6, ideal: 5 };
        } else {
          // Ultra-wide - máximo 6 columnas
          return { min: 6, max: 6, ideal: 6 };
        }
      };

      const breakpoint = getBreakpointColumns(availableWidth);

      // Calcular el número óptimo de columnas dentro del rango del breakpoint
      let bestColumns = breakpoint.ideal;
      let bestScore = Infinity;

      for (
        let columns = breakpoint.min;
        columns <= Math.min(breakpoint.max, config.maxColumns);
        columns++
      ) {
        const gapWidth = config.gap * (columns - 1);
        const columnWidth = (availableWidth - gapWidth) / columns;

        // Verificar si el ancho está en el rango aceptable
        if (
          columnWidth >= config.minCardWidth &&
          columnWidth <= config.maxCardWidth
        ) {
          // Preferir columnas que den un ancho más cercano al ideal (150px)
          const idealWidth = 150;
          const score = Math.abs(columnWidth - idealWidth);

          if (score < bestScore) {
            bestScore = score;
            bestColumns = columns;
          }
        }
      }

      // Si no encontramos una opción ideal, usar la que maximice el uso del espacio de forma conservadora
      if (bestScore === Infinity) {
        const maxPossibleColumns = Math.floor(
          availableWidth / (config.minCardWidth + config.gap)
        );
        bestColumns = Math.max(
          breakpoint.min,
          Math.min(maxPossibleColumns, breakpoint.max, config.maxColumns)
        );
      }

      return bestColumns;
    },
    [config]
  );

  const updateGrid = useCallback(() => {
    if (!containerRef.current) {
      // Si no hay contenedor, usar valores por defecto basados en viewport
      const viewportWidth =
        typeof window !== 'undefined' ? window.innerWidth : 1024;
      const fallbackColumns = calculateOptimalColumns(viewportWidth * 0.7); // Asumir 70% del viewport
      setGridColumns(fallbackColumns);
      return;
    }

    const containerWidth = containerRef.current.offsetWidth;
    if (containerWidth > 0) {
      const optimalColumns = calculateOptimalColumns(containerWidth);
      setGridColumns(optimalColumns);
    }
  }, [calculateOptimalColumns]);

  useEffect(() => {
    // Calcular inmediatamente al montar
    updateGrid();

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        updateGrid();
      }
    });

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      observer.disconnect();
    };
  }, [updateGrid]);

  // Effect separado para actualizar cuando el ref cambie
  useEffect(() => {
    if (containerRef.current) {
      updateGrid();
    }
  }, [updateGrid]);

  // Manejar cambios de ventana
  useEffect(() => {
    const handleResize = () => {
      updateGrid();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateGrid]);

  const getGridStyle = (): React.CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
    gap: `${config.gap}px`,
    width: '100%',
  });

  const getFallbackClasses = (): string => {
    // Clases de fallback si JavaScript falla
    return 'grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
  };

  return {
    containerRef,
    gridColumns,
    gridStyle: getGridStyle(),
    fallbackClasses: getFallbackClasses(),
    isReady,
  };
};
