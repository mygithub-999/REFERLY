import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  // Styles object to keep the JSX clean and match the provided image's aesthetic
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      textAlign: 'center',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      color: '#6c757d', // Body text color
    },
    errorCode: {
      fontSize: '120px',
      fontWeight: 'bold',
      fontFamily: '"Georgia", serif', // Matching the serif headline font from the image
      color: '#5A5353', // Primary dark text color
      margin: '0',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'normal',
      fontFamily: '"Georgia", serif', // Matching the serif headline font
      color: '#5A5353',
      margin: '10px 0',
    },
    message: {
      fontSize: '18px',
      marginBottom: '30px',
    },
    link: {
      textDecoration: 'none',
      fontSize: '16px',
      color: '#5A5353',
      border: '1px solid #ced4da', // Button border color
      padding: '10px 25px',
      borderRadius: '5px',
      backgroundColor: '#FFFFFF',
      transition: 'all 0.3s ease',
    },
    // Adding a hover effect for the link to mimic button interactivity
    linkHover: {
      backgroundColor: '#f8f9fa',
      borderColor: '#adb5bd',
    },
  };
  
  // State for handling hover effect on the link
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.message}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        style={isHovered ? {...styles.link, ...styles.linkHover} : styles.link}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;