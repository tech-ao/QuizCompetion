import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';
import logo from "../../images/Logo.png"

const RegisterHeader = () => {
  const styles = {
    headerTitle: {
      fontSize: 'calc(18px + 1vw)', // Responsive size
      fontWeight: 'bold',
      color: '#28a745', // Success green color
    },
    headerSubtitle: {
      fontSize: 'calc(14px + 0.5vw)', // Smaller than Math Gym
      fontWeight: 500,
      color: '#6c757d', // Muted gray
    },
    largeScreen: {
      '@media (min-width: 992px)': {
        headerTitle: { fontSize: '36px' },
        headerSubtitle: { fontSize: '22px' },
      }
    }
  };

  return (
    <Navbar expand="lg" className="header py-2 fixed-header">
      <Container className="d-flex align-items-center w-100">
        {/* Left: Logo */}
        <div className="d-flex align-items-center">
          <Link to="/" className="d-flex align-items-center">
            <img
              className="logo1 me-2 border-dark-green"
              src={logo}
              alt="Logo"
              style={{ 
                cursor: 'pointer', 
                maxWidth: '80px', 
                border: '1px solid #000', 
                borderRadius: '5px' 
              }}
            />
          </Link>
        </div>
        
        {/* Center: Math Gym and Flex Your Brain */}
        <div className="flex-grow-1 text-center">
          <span style={styles.headerTitle}>Math Gym</span>
          <br />
          <span style={styles.headerSubtitle}>Flex Your Brain</span>
        </div>

        {/* Right: Web Icon */}
        <div className="d-flex align-items-center">
          <a 
            href="https://mathgymint.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
          >
            <FaGlobe size={24} color="#198754" />
          </a>
        </div>
      </Container>
    </Navbar>
  );
};

export default RegisterHeader;
