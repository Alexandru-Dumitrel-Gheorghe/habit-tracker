// src/App.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Chatbot from './components/Chatbot/Chatbot';
import Switch from 'react-switch';
import { FaMoon, FaSun } from 'react-icons/fa';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      {/* Dark Mode Toggle */}
      <div className="toggle-container" onClick={toggleDarkMode}>
        <FaSun color="#FFA500" />
        <Switch
          onChange={toggleDarkMode}
          checked={darkMode}
          offColor="#bbb"
          onColor="#6a11cb"
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={48}
          handleDiameter={24}
          aria-label="Toggle Dark Mode"
        />
        <FaMoon color="#4B0082" />
      </div>

      {/* Banner cu gradient animat, parallax și efect 3D */}
      <motion.div
        className="welcomeBanner"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Salut! Bine ai venit la Habit Tracker Chatbot</h1>
        <p>Organizează-ți viața și obiceiurile cu ajutorul unui asistent inteligent.</p>
      </motion.div>

      {/* Secțiune cu Beneficii */}
      <motion.div
        className="benefitsSection"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>De ce să folosești Habit Tracker?</h2>
        <div className="benefitsContainer">
          <motion.div
            className="benefitCard"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <i className="fas fa-check-circle"></i>
            <h3>Ușor de Folosit</h3>
            <p>Interfață intuitivă care îți permite să începi rapid.</p>
          </motion.div>
          <motion.div
            className="benefitCard"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <i className="fas fa-chart-line"></i>
            <h3>Monitorizare Progres</h3>
            <p>Urmărește-ți obiceiurile și vezi cum progresezi în timp.</p>
          </motion.div>
          <motion.div
            className="benefitCard"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <i className="fas fa-comments"></i>
            <h3>Asistent Inteligent</h3>
            <p>Primește sfaturi și suport din partea chatbot-ului nostru.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Secțiune cu Instrucțiuni */}
      <motion.div
        className="infoBox"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Instrucțiuni Rapide</h2>
        <p>
          Apasă pe butonul rotund din colțul dreapta-jos pentru a deschide Chatbot-ul.  
          În secțiunea <strong>“Habits”</strong> poți adăuga și gestiona obiceiurile tale zilnice.  
          Apoi, revino la <strong>“Chat”</strong> pentru a discuta cu asistentul despre orice altceva dorești!
        </p>
      </motion.div>

      {/* Chatbot-ul propriu-zis */}
      <Chatbot />
    </div>
  );
}

export default App;
