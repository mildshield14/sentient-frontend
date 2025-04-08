// ChatBot.tsx
import React, { useState } from 'react';

export default function ChatBot() {
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot'; mood?: string }[]>([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = input;
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setInput('');

        const res = await fetch('http://localhost:3001/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await res.json();
        setMessages(prev => [...prev, { text: data.reply, sender: 'bot', mood: data.mood }]);
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender}`}>
                        <span>{msg.text}</span>
                        {msg.sender === 'bot' && msg.mood && <div className={`mood-tag mood-${msg.mood}`}>{msg.mood}</div>}
                    </div>
                ))}
            </div>
            <div className="input-box">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}