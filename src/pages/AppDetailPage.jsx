import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReferralForm from '../components/ReferralForm';
import ReferralList from '../components/ReferralList'; 
import axios from 'axios';
import LoadingButton from '../components/LoadingButton';
import CircularColor from '../components/CircularLoad';
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import HelpPage from './HelpPage';


const AppDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [referralCode,setReferralCode]=useState('');
  const [sendData,setSendData]=useState('');
  const [errMessage, setErrMessage]=useState('');
  const [loading,setLoading]=useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setUser(data);
      } catch (err) {
        localStorage.clear();
        navigate('/signin');
      }
    };

    verifyUser();
  }, [id]);


  const help=()=>{
    navigate('/help');
  }

  const fetchReferral=async()=>{
    try{
      const res=await axios.post(`${process.env.REACT_APP_API_URL}/referral/yourapp`,
      {
        appname:sendData.toLowerCase().trim()
      },
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      setReferralCode(res.data.mainCode || 'Referral Code Not Available');
      // toast.success('');
    }
    catch(err){
      const message = err.response?.data?.message || "Failed to Find Code";
      toast.error(message);
    }
  }

  if (!user) return <CircularColor/>;

  return (
    <div className="app-detail-container">
      {/* <h1>{appname.toUpperCase()} Referral</h1> */}
      {/* <p>Welcome {user.name}, manage your {appname} referral below:</p> */}
      <ReferralForm userId={id}/>
      <input
        type="text"
        placeholder={`  Enter Application Name`}
        value={sendData}
        onChange={(e) => setSendData(e.target.value)}
        required
        className="fetch-referral-input"
      />
      <button className="btn-getreferral" onClick={fetchReferral}>
          Get Referral Code
      </button>
      {/* {referralCode && (
        <div className="referral-result">
          <p><strong>Referral Code:</strong> {referralCode}</p>
        </div>
      )} */}

      {/* {errMessage && (
        <p>{errMessage}</p>
      )} */}
      {referralCode && (
      <div
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1rem",
          border: "2px dashed #4cafef",
          borderRadius: "8px",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "#f8fbff",
        }}
      >
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          {referralCode}
        </span>

        <Tooltip title="Copy to clipboard">
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(referralCode);
              toast.success("Referral code copied!");
            }}
            size="small"
          >
            <ContentCopyTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    )}
    <div className="help">
      How to Upload or Get Referral Code? <a onClick={help} className='help-link' >Click Here</a>
    </div>
    </div>
  );
};

export default AppDetailPage;
