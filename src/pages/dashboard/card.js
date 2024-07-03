import React from "react";
import { BiLogoFacebook, BiLogoInstagram, BiLogoLinkedin } from "react-icons/bi";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const media = [
    {
        title: 'Facebook',
        icon: <BiLogoFacebook />,
        value: <CircularProgressbar value={70} text={`${70}%`} />,
    },
    {
        title: 'Instagram',
        icon: <BiLogoInstagram />,
        value: <CircularProgressbar value={50} text={`${50}%`} />,
    },
    {
        title: 'LinkedIn', 
        icon: <BiLogoLinkedin />,
        value: <CircularProgressbar value={90} text={`${90}%`} />,
    },
];

const Card = () => {
    return (
        <div className="card--container">
            {media.map((item, index) => (
                <div className="card" key={index}>
                    <div className="cardd">
                        <div className="card--cover">{item.icon}</div>
                        <div className="card--title">
                            <h2>{item.title}</h2>
                        </div>

                    </div>
                    
                    <div className="card--value">{item.value}</div>
                </div>
            ))}
        </div>
    );
};

export default Card;
