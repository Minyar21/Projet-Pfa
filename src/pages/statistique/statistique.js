import React from 'react';

const Statistics = ({ username, followers, posts, avgLikes }) => {
  return (
    <div className="statistics">
      <h2>Statistics for {username}</h2>
      <p>Followers: {followers}</p>
      <p>Posts: {posts}</p>
      <p>Average Likes per Post: {avgLikes}</p>
      {/* Ajoutez d'autres statistiques comme le taux d'engagement, etc. */}
    </div>
  );
};

export default Statistics;






useEffect(() => {
  document.body.classList.add('login-page');
  document.body.style.backgroundImage = `url(${background})`; // Apply background image
  document.body.style.backgroundSize = 'cover';

  return () => {
      document.body.classList.remove('login-page');
      document.body.style.backgroundImage = '';
  };
}, []);