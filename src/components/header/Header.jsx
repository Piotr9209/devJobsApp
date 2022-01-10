import React from "react";
import { setToggleTheme } from "../../features/devJobsSlice/devJobsSlice";
import "./header.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div>
          <p>devjobs</p>
        </div>
        <div>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </header>
  );
};
