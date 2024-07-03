import React from "react";
import ContentHeader from "./contentHeader";
import "../styles/content.css";
import Card from "./card";
import Crud from "./crud";


const Content = ()=>{
    return (
        <div className="content">
            <ContentHeader />
            <Card />
            <Crud/>
            
        </div>
    );
};

export default Content;