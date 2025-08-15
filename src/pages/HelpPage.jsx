import React from 'react'
import Footer from '../components/Footer'

const HelpPage = () => {
  return (
    <div className='helppage'>
      {/* <strong className='help-title'>How to Use Referly</strong> */}
      {/* <p className='help-subtitle'>Welcome to the help page! Here you’ll find simple, step-by-step instructions on how to find and share referral codes.</p> */}
      <strong className="help-title2">How to Get a Referral Code</strong>
      <p className="help-subtitle2">
         <ol className='help-list'>
          <li>Select the relavant Application or Service Category </li>
          <li>You will be directed to Referral Form Page</li>
          <li>In the text box labeled "Enter Application Name," type the name of the service or app you're looking for.</li>
          <li>Click the "Get Referral Code" button.</li>
          <li>You will be shown a referral code or link. Simply copy and use it to enjoy your reward!</li>
         </ol>
      </p>
      <strong className="help-title2">How to Upload Your Referral Code</strong>
      <p className="help-subtitle2">
         <ol className='help-list'>
          <li>Select the relavant Application or Service Category </li>
          <li>You will be directed to Referral Form Page</li>
          <li>In the text box labeled "AppName: Referral Code," type the name of the app, followed by a colon (:), and then paste your referral code or link.</li>
            <ul>
              <li>Example 1: YourApplicationName: heregoesyourcodeorlink</li>
            </ul>
          <li>Click the "Submit" button. That's it! Your code is now live and ready to help others in the community.</li>
         </ol>
      </p>
      {/* <Footer/> */}
    </div>
  )
}

export default HelpPage