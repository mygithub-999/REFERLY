import React from 'react';
import Footer from '../components/Footer';
import search from '../assets/img-resources/search.svg'
const AboutPage = () => {
  return (
    <div className="about-container">
      <h1 className="about-header">Built for Savers, by Savers.</h1>
      <p className="about-intro">
        At Referly, we believe sharing should be simple and rewarding. We were tired of endlessly searching for referral codes only to find expired links. We knew there had to be a better way—a single, trusted place for people to share their codes and help others save.
      </p>

      <div className="about-section">
        <h2 className="section-title">How It Works</h2>
        <div className="how-it-works-container">
          <div className="step">
            <div className="step-icon">⇧</div>
            <h3 className="step-title">Share a Code</h3>
            <p className="step-text">Post a referral code you want to share with the community.</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.098zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </div>
            <h3 className="step-title">Find Referral Codes</h3>
            <p className="step-text">Search for codes for your favorite apps and services.</p>
          </div>
          <div className="step">
            <div className="step-icon">$</div>
            <h3 className="step-title">Save & Earn</h3>
            <p className="step-text">Use a code to get a discount and help the sharer earn rewards.</p>
          </div>
        </div>
      </div>
      
      <p className="disclaimer">
        A Community You Can Trust: Every code on Referly is uploaded by a real person. 
      </p>
      <p className="disclaimer2">
        DISCLAIMER: We are an independent platform and not affiliated or endorsed by any brand names you may across the platform.<br/>All Content is User Generated.
      </p>
    </div>
  );
};

export default AboutPage;