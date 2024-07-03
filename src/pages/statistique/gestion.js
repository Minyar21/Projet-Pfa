import React, { useState, useEffect } from 'react';
import Statistics from './Statistics';

const InstagramStats = () => {
  const [username, setUsername] = useState('');
  const [followers, setFollowers] = useState(0);
  const [posts, setPosts] = useState(0);
  const [avgLikes, setAvgLikes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.instagram.com/v1/users/self/?access_token=YOUR_ACCESS_TOKEN`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Exemple de récupération de données (à adapter selon l'API Instagram)
        setUsername(data.username);
        setFollowers(data.followers.count);
        setPosts(data.media.count);
        setAvgLikes(data.likes.average);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="instagram-stats">
      <h1>Instagram Statistics</h1>
      <Statistics username={username} followers={followers} posts={posts} avgLikes={avgLikes} />
    </div>
  );
};

export default InstagramStats;
