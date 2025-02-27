# Habit Tracker Chatbot

A **React** application that combines a simple **Habit Tracker** with a **Chatbot** powered by the OpenAI API (GPT). The project aims to help you organize your daily habits while also providing an intelligent assistant to chat with.

---

## Features

1. **Habit Tracking**
   - Add and remove habits.
   - Keep track of how many days you’ve completed each habit.
   - Data is stored in the browser’s local storage.

2. **AI Chatbot**
   - Built with OpenAI’s GPT (e.g., `gpt-3.5-turbo`) for intelligent conversations.
   - Displays a “Thinking...” placeholder while waiting for the AI to respond.

3. **Tabbed Interface**
   - **Chat** tab: Chat with the AI assistant about any topic.
   - **Habits** tab: Manage your list of daily habits (add new habits, mark as completed, or remove them).

4. **Responsive UI**
   - A floating toggle button (💬) in the corner to open and close the chatbot.
   - Simple, intuitive layout.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm or yarn

### Installation

1. **Clone** this repository or [download the ZIP](https://github.com/YourUsername/habit-tracker-chatbot/archive/refs/heads/main.zip):
   ```bash
   git clone https://github.com/YourUsername/habit-tracker-chatbot.git
   cd habit-tracker-chatbot
Install dependencies:

bash
Kopieren
Bearbeiten
npm install
or

bash
Kopieren
Bearbeiten
yarn
Create a .env file in the project root (same level as package.json) and add your OpenAI API key:

bash
Kopieren
Bearbeiten
REACT_APP_OPENAI_API_KEY=sk-XXXXXXXXXXXX
Make sure to list .env in your .gitignore so it won’t be committed to GitHub.

Start the development server:

bash
Kopieren
Bearbeiten
npm start
or

bash
Kopieren
Bearbeiten
yarn start