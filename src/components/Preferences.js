import React from "react";
import { Link } from "react-router-dom";

export default function Preferences() {
    return (
        <div>
            <h2>Preferences</h2>
            <Link to={'/'}>Main </Link>
            <Link to={'/dashboard'}>Dashboard</Link>
        </div>
    );
}