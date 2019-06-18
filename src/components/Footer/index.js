import React from 'react';
import { Link } from 'react-router-dom'

import './index.css'

export default function Header() {
  return (
      <header id="main-header">
          <div className="header-content">
              Segware Challenge
              <Link to="/create">
              </Link>
          </div>
      </header>
  );
}
