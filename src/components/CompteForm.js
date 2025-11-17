import API_BASE_URL from '../config';
import React, { useState } from 'react';
import axios from 'axios';
import './CompteForm.css';

function CompteForm() {
  const [formData, setFormData] = useState({
    solde: '',
    dateCreation: '',
    type: 'COURANT',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const payload = {
      solde: parseFloat(formData.solde),
      dateCreation: formData.dateCreation,
      type: formData.type.toUpperCase(),
    };

    axios
      .post(`${API_BASE_URL}/comptes`, payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        alert('✅ Compte ajouté avec succès !');
        window.location.reload();
      })
      .catch((error) => {
        console.error("❌ Erreur lors de l'ajout du compte :", error);
        alert("Erreur : impossible d'ajouter le compte");
      });
  };

  return (
    <div className="form-card">
      <div className="form-card-header">
        <h2 className="form-title">✨ Nouveau Compte</h2>
        <p className="form-description">Créer un nouveau compte bancaire</p>
      </div>
      <form onSubmit={handleFormSubmit} className="account-form">
        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">💰</span>
            Montant du Solde
          </label>
          <input
            type="number"
            name="solde"
            className="form-input"
            onChange={handleInputChange}
            placeholder="Entrez le montant"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">📅</span>
            Date de Création
          </label>
          <input
            type="date"
            name="dateCreation"
            className="form-input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">🏦</span>
            Type de Compte
          </label>
          <select
            name="type"
            className="form-select"
            onChange={handleInputChange}
            required
          >
            <option value="COURANT">Compte Courant</option>
            <option value="EPARGNE">Compte Épargne</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          <span className="button-text">Créer le Compte</span>
          <span className="button-icon">→</span>
        </button>
      </form>
    </div>
  );
}

export default CompteForm;
