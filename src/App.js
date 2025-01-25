// src/App.js
import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  return (
    <div className="App">
      {/* Banner cu gradient animat și efect 3D */}
      <div className="welcomeBanner">
        <h1>Salut! Bine ai venit la Habit Tracker Chatbot</h1>
        <p>Organizează-ți viața și obiceiurile cu ajutorul unui asistent inteligent.</p>
      </div>

      {/* Secțiune cu Beneficii */}
      <div className="benefitsSection">
        <h2>De ce să folosești Habit Tracker?</h2>
        <div className="benefitsContainer">
          <div className="benefitCard">
            <i className="fas fa-check-circle"></i>
            <h3>Ușor de Folosit</h3>
            <p>Interfață intuitivă care îți permite să începi rapid.</p>
          </div>
          <div className="benefitCard">
            <i className="fas fa-chart-line"></i>
            <h3>Monitorizare Progres</h3>
            <p>Urmărește-ți obiceiurile și vezi cum progresezi în timp.</p>
          </div>
          <div className="benefitCard">
            <i className="fas fa-comments"></i>
            <h3>Asistent Inteligent</h3>
            <p>Primește sfaturi și suport din partea chatbot-ului nostru.</p>
          </div>
        </div>
      </div>

      {/* Secțiune cu Instrucțiuni */}
      <div className="infoBox">
        <h2>Instrucțiuni Rapide</h2>
        <p>
          Apasă pe butonul rotund din colțul dreapta-jos pentru a deschide Chatbot-ul.  
          În secțiunea <strong>“Habits”</strong> poți adăuga și gestiona obiceiurile tale zilnice.  
          Apoi, revino la <strong>“Chat”</strong> pentru a discuta cu asistentul despre orice altceva dorești!
        </p>
      </div>

      {/* Chatbot-ul propriu-zis */}
      <Chatbot />
      
      
    </div>
  );
}

export default App;
