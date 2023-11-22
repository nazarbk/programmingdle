import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Desplázate hacia arriba cuando cambie el pathname
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;