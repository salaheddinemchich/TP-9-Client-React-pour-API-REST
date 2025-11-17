import React from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">💳 Gestion Bancaire</h1>
          <p className="app-subtitle">Système de gestion des comptes</p>
        </div>
      </header>
      <main className="app-main">
        <div className="content-grid">
          <section className="form-section">
            <CompteForm />
          </section>
          <section className="list-section">
            <CompteList />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;