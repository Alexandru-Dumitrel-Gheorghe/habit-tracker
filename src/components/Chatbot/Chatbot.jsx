// src/components/Chatbot/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Chatbot.module.css';
import { FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bună! Cum te pot ajuta astăzi?' }
  ]);
  const [input, setInput] = useState('');
  const chatboxRef = useRef(null);

  // Citești cheia din .env
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  // Verifică în consolă dacă cheia e definită (nu e undefined).
  // După ce pornești aplicația, mergi în browser, F12 -> Console.
  console.log('API KEY from .env:', API_KEY);

  // Stări pentru Habit Tracker
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState('');
  const [activeTab, setActiveTab] = useState('chat'); // "chat" sau "habits"

  // Salvare și încărcare din localStorage pentru Habits
  useEffect(() => {
    const storedHabits = localStorage.getItem('myHabits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('myHabits', JSON.stringify(habits));
  }, [habits]);

  // Funcție pentru a trimite mesajul utilizatorului la ChatGPT
  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    const userMessage = input.trim();
    setMessages([...messages, { sender: 'user', text: userMessage }]);
    setInput('');
    // Mesaj de "Thinking..." al bot-ului
    setMessages(prev => [...prev, { sender: 'bot', text: 'Se gândește...' }]);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userMessage }],
        }),
      });

      const data = await response.json();
      const botResponse = data.choices?.[0]?.message?.content || 'Error in response.';
      setMessages(prev => [...prev.slice(0, -1), { sender: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: 'Oops! Ceva a mers greșit. Te rog să încerci din nou.' },
      ]);
    } finally {
      chatboxRef.current?.scrollTo(0, chatboxRef.current.scrollHeight);
    }
  };

  // Funcții pentru Habit Tracker
  const addHabit = () => {
    if (!habitInput.trim()) return;
    const newHabit = {
      id: Date.now(),
      name: habitInput.trim(),
      completedDays: 0,
    };
    setHabits([...habits, newHabit]);
    setHabitInput('');
  };

  const markHabitAsCompleted = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completedDays: habit.completedDays + 1 } : habit
      )
    );
  };

  const removeHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  // Handle Enter key for sending messages
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      {/* Buton pentru a deschide/inchide chatbot-ul */}
      <button
        className={`${styles.chatbotToggler} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close Chatbot' : 'Open Chatbot'}
      >
        <FaRobot />
      </button>

      {/* Chatbot-ul (cu tab-uri: Chat & Habits) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className={styles.chatbot}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <header className={styles.header}>
                <h2 className={styles.title}>Habit Tracker</h2>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Chatbot"
                >
                  <FaTimes />
                </button>
              </header>

              {/* Butoane de tab */}
              <div className={styles.tabButtons}>
                <button
                  className={`${styles.tabButton} ${activeTab === 'chat' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('chat')}
                >
                  Chat
                </button>
                <button
                  className={`${styles.tabButton} ${activeTab === 'habits' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('habits')}
                >
                  Habits
                </button>
              </div>

              {/* Afișare conținut în funcție de tab-ul activ */}
              {activeTab === 'chat' && (
                <>
                  <ul ref={chatboxRef} className={styles.chatbox}>
                    {messages.map((msg, index) => (
                      <motion.li
                        key={index}
                        className={msg.sender === 'user' ? styles.outgoing : styles.incoming}
                        initial={{ opacity: 0, x: msg.sender === 'user' ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {msg.sender === 'bot' && <span className={styles.botIcon}>🤖</span>}
                        <p>{msg.text}</p>
                      </motion.li>
                    ))}
                  </ul>
                  <div className={styles.chatInput}>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Scrie un mesaj..."
                      rows={1}
                      onKeyPress={handleKeyPress}
                      aria-label="Message input"
                    />
                    <button onClick={handleSendMessage} className={styles.sendButton} aria-label="Send Message">
                      <FaPaperPlane />
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'habits' && (
                <div className={styles.habitTracker}>
                  <h3 className={styles.subtitle}>Habit Tracker</h3>
                  <div className={styles.addHabit}>
                    <input
                      type="text"
                      placeholder="Adaugă un nou obicei..."
                      value={habitInput}
                      onChange={(e) => setHabitInput(e.target.value)}
                      aria-label="Add new habit"
                    />
                    <button onClick={addHabit} className={styles.addHabitBtn} aria-label="Add Habit">
                      Adaugă
                    </button>
                  </div>
                  <ul className={styles.habitList}>
                    {habits.map((habit) => (
                      <li key={habit.id} className={styles.habitItem}>
                        <div>
                          <span className={styles.habitName}>{habit.name}</span> <br />
                          <small>
                            Zile completate: <strong>{habit.completedDays}</strong>
                          </small>
                        </div>
                        <div className={styles.habitActions}>
                          <button
                            className={styles.completeBtn}
                            onClick={() => markHabitAsCompleted(habit.id)}
                            title="Marchează finalizat"
                            aria-label="Mark as completed"
                          >
                            ✅
                          </button>
                          <button
                            className={styles.removeBtn}
                            onClick={() => removeHabit(habit.id)}
                            title="Șterge habit"
                            aria-label="Remove habit"
                          >
                            🗑
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
