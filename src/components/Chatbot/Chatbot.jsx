// Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
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
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');

    // Mesaj de "Thinking..." al bot-ului
    const botMessage = { role: 'bot', content: 'Se gandeste...' };
    setMessages((prev) => [...prev, botMessage]);

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
      setMessages((prev) => [...prev.slice(0, -1), { role: 'bot', content: botResponse }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'bot', content: 'Oops! Something went wrong. Please try again.' },
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
    setHabits((prev) => [...prev, newHabit]);
    setHabitInput('');
  };

  const markHabitAsCompleted = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completedDays: habit.completedDays + 1 } : habit
      )
    );
  };

  const removeHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
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
        {isOpen ? '✖' : '💬'}
      </button>

      {/* Chatbot-ul (cu tab-uri: Chat & Habits) */}
      {isOpen && (
        <div className={styles.chatbot}>
          <header className={styles.header}>
            <h2 className={styles.title}>Habit App</h2>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ✖
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
                  <li
                    key={index}
                    className={msg.role === 'user' ? styles.outgoing : styles.incoming}
                  >
                    {msg.role === 'bot' && <span className={styles.botIcon}>🤖</span>}
                    <p>{msg.content}</p>
                  </li>
                ))}
              </ul>
              <div className={styles.chatInput}>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  rows={1} // Setăm un număr fix de rânduri
                  onKeyPress={handleKeyPress}
                />
                <button onClick={handleSendMessage} className={styles.sendButton} aria-label="Send">
                  ➤
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
        </div>
      )}
    </div>
  );
};

export default Chatbot;
