import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'

const ReferralForm = ({ userId }) => {
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost:8000/referral/${userId}/yourapp`,
        { appname_code: referralCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Referral Uploaded!");
      setReferralCode('');
    } catch (err) {
      toast.error(err.response.data?.message || `Failed to save referral`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="referral-form">
      <input
        type="text"
        placeholder={`Appname: Your code/link`}
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
        required
        className="input-field"
      />
      <button type="submit" className="btn-referral-submit">
        Submit
      </button>
    </form>
  );
};

export default ReferralForm;
