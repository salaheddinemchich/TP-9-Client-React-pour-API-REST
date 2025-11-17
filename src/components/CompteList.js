import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import './CompteList.css';

function CompteList() {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${API_BASE_URL}/comptes`)
      .then(response => {
        setAccounts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getAccountTypeIcon = (type) => {
    return type === 'COURANT' ? '💳' : '💰';
  };

  const getAccountTypeLabel = (type) => {
    return type === 'COURANT' ? 'Courant' : 'Épargne';
  };

  if (isLoading) {
    return (
      <div className="accounts-container">
        <div className="section-header">
          <h2 className="section-title">📋 Mes Comptes</h2>
          <p className="section-subtitle">Vue d'ensemble de vos comptes bancaires</p>
        </div>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Chargement des comptes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="accounts-container">
      <div className="section-header">
        <h2 className="section-title">📋 Mes Comptes</h2>
        <p className="section-subtitle">
          {accounts.length} {accounts.length === 1 ? 'compte trouvé' : 'comptes trouvés'}
        </p>
      </div>
      
      {accounts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>Aucun compte</h3>
          <p>Commencez par créer votre premier compte</p>
        </div>
      ) : (
        <div className="accounts-grid">
          {accounts.map(account => (
            <div key={account.id} className="account-card">
              <div className="account-card-header">
                <div className="account-icon">{getAccountTypeIcon(account.type)}</div>
                <div className="account-id">#{account.id}</div>
              </div>
              <div className="account-balance">
                <span className="balance-label">Solde</span>
                <span className="balance-amount">{formatCurrency(account.solde)}</span>
              </div>
              <div className="account-details">
                <div className="detail-item">
                  <span className="detail-label">📅 Date</span>
                  <span className="detail-value">{formatDate(account.dateCreation)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">🏦 Type</span>
                  <span className="detail-value type-badge">{getAccountTypeLabel(account.type)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompteList;