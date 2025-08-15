import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import food from '../assets/img-resources/food.png';
import cab from '../assets/img-resources/cab.png';
import payment from '../assets/img-resources/payment.png';
import shopping from '../assets/img-resources/shopping.png';
import { useAuth } from '../context/AuthContext';


const AppList = () => {
  const { isLoggedIn, userId } = useAuth();
  const navigate = useNavigate();

  const apps = [
    { name: 'food', img: food, boxId: 'box1' },
    { name: 'cab', img: cab, boxId: 'box2' },
    { name: 'payment', img: payment, boxId: 'box3' },
    { name: 'shopping', img: shopping, boxId: 'box4' },
  ];

  const handleGuestClick = () => {
    navigate('/signup');
  };

  return (
    <div className="app-container">
      {apps.map((app) =>
        isLoggedIn && userId? (
          <Link key={app.name} to={`/user/${userId}/${app.name}`}>
            <div className="box" id={app.boxId}>
              <img src={app.img} alt={app.name} />
            </div>
          </Link>
        ) : (
          <div
            key={app.name}
            className="box"
            id={app.boxId}
            onClick={handleGuestClick}
            style={{ cursor: 'pointer' }}
          >
            <img src={app.img} alt={app.name} />
          </div>
        )
      )}
    </div>
  );
};

export default AppList;
