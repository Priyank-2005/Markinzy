'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBotWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'Hi! How can I help you?', sender: 'bot' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const userMessage = { text: input, sender: 'user' };
        const botMessage = { text: "I'm just a simple bot!", sender: 'bot' };
        setMessages((prev) => [...prev, userMessage, botMessage]);
        setInput('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.3 }}
                        className="w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border border-gray-200 mb-4"
                    >
                        <div className="flex-1 p-4 overflow-y-auto space-y-2">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`text-sm px-4 py-2 rounded-lg max-w-[75%] ${msg.sender === 'user'
                                            ? 'bg-indigo-100 ml-auto text-right text-gray-800'
                                            : 'bg-gray-200 text-left text-gray-900'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center border-t border-gray-200 px-3 py-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="flex-1 text-sm px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                onClick={handleSend}
                                className="ml-2 bg-indigo-600 text-white px-4 py-2 text-sm rounded-md hover:bg-indigo-700"
                            >
                                Send
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl"
                aria-label="Chatbot Toggle"
            >
                💬
            </button>
        </div>
    );
}
