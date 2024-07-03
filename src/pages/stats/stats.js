import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './stats.css';
import ContentHeader from '../services/header';

const data = [
  {
    name: 'Jan',
    followers: 4000,
    likes: 2400,
    comments: 2400,
    shares: 1400,
  },
  {
    name: 'Feb',
    followers: 3000,
    likes: 1398,
    comments: 2210,
    shares: 1280,
  },
  {
    name: 'Mar',
    followers: 2000,
    likes: 9800,
    comments: 2290,
    shares: 1700,
  },
  {
    name: 'Apr',
    followers: 2780,
    likes: 3908,
    comments: 2000,
    shares: 1500,
  },
  {
    name: 'May',
    followers: 1890,
    likes: 4800,
    comments: 2181,
    shares: 1200,
  },
  {
    name: 'Jun',
    followers: 2390,
    likes: 3800,
    comments: 2500,
    shares: 1400,
  },
  {
    name: 'Jul',
    followers: 3490,
    likes: 4300,
    comments: 2100,
    shares: 1600,
  },
];

const Stats = () => {
  return (
    <div className='head'>
      <ContentHeader />
      <div className="stats">
        <h2>Social Media Statistics</h2>
        <ResponsiveContainer width="100%" height={400}>

          <LineChart

            data={data}
            margin={{
            top: 5, right: 30, left: 20, bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="followers" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="likes" stroke="#82ca9d" />
            <Line type="monotone" dataKey="comments" stroke="#ffc658" />
            <Line type="monotone" dataKey="shares" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    
  );
};

export default Stats;
