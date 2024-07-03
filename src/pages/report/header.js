import React from "react";
import { BiSearch,BiNotification } from "react-icons/bi";
import './report.css'
const ContentHeader = ()=>{
    return <div className="content--header">
        <h1 className="header--title">Report</h1>
        <div className="header--activity">
            <div className="search--box">
                <input type="text" placeholder="search anything here..." />
                <BiSearch className="icon"/>
            </div>

            <div className="notify">
                <BiNotification className="icon"/>

            </div>
        </div>
    </div>
};

export default ContentHeader;