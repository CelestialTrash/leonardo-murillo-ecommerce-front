// ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScrollToTop = () => {
  const { hash, pathname } = useLocation(); // Extract hash and pathname
  const navigate = useNavigate(); // To reset the URL

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });

        // Reset the URL after scrolling
        const resetUrl = () => navigate(pathname, { replace: true });
        setTimeout(resetUrl, 300); // Wait for scroll animation to complete
      }
    }
  }, [hash, pathname, navigate]);

  return null;
};

export default ScrollToTop;

