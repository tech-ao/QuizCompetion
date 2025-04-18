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
    <Navbar expand="lg" className="header fixed-header py-2" style={{ background: '#a2f8c2', minHeight: '60px' }}>
  <Container
    className="d-flex flex-column flex-md-row align-items-center justify-content-between w-100"
    style={{
      backgroundImage: 'linear-gradient(to right, #a2f8c2, #ccffcc, #a2f8c2)',
      padding: '0.3rem 1rem', // Minimal padding for compact height
      borderRadius: '8px',
    }}
  >
    {/* Left: Logo */}
    <div className="mb-2 mb-md-0">
      <Link to="/" className="d-flex align-items-center">
        <img
          src={logo}
          alt="Logo"
          className="me-2"
          style={{
            cursor: 'pointer',
            maxWidth: '60px', // Slightly smaller logo for compact look
            border: '1px solid #000',
            borderRadius: '5px',
          }}
        />
      </Link>
    </div>

    {/* Center: Titles */}
    <div className="text-center mb-2 mb-md-0">
      <span style={{
        fontSize: 'calc(14px + 0.8vw)',
        fontWeight: 'bold',
        color: '#28a745',
      }}>Math Gym</span>
      <br />
      <span style={{
        fontSize: 'calc(10px + 0.5vw)',
        fontWeight: 500,
        color: '#6c757d',
      }}>Flex Your Brain</span>
    </div>

    {/* Right: Icon */}
    <div className="mb-1 mb-md-0">
      <a
        href="https://mathgymint.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGlobe size={20} color="#198754" /> {/* Slightly smaller icon */}
      </a>
    </div>
  </Container>
</Navbar>

  );
};

export default RegisterHeader;
