// src/components/LayoutWithNavBar.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav'; // Import the Nav component


const LayoutWithNavBar = () => {
    return (
        <div>
            <Nav title="Admin Dashboard" /> {/* Pass the title as a prop */}
            <div className="content">
                <Outlet /> {/* Render child routes here */}
            </div>
        </div>
    );
};

export default LayoutWithNavBar;
