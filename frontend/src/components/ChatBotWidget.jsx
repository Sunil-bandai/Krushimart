import { useState, useRef, useEffect } from 'react';
import useAuthStore from '../store/authStore';

const quickReplies = [
    'How do I place an order?',
    'How do I add a product?',
    'How do I track my orders?',
];

const ChatBotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'Hello! I am KrushiMart Assistant. How can I help you today?', sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const { token, user } = useAuthStore();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (text) => {
        const msg = text || input.trim();
        if (!msg) return;

        setMessages(prev => [...prev, { text: msg, sender: 'user' }]);
        setInput('');
        setIsTyping(true);

        try {
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const apiBase = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${apiBase}/api/chatbot`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ message: msg, role: user?.role || 'default' })
            });

            const data = await response.json();
            setMessages(prev => [...prev, { text: data.answer || data.error || 'Something went wrong.', sender: 'bot' }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 ${
                    isOpen ? 'bg-red-500 hover:bg-red-600 rotate-90' : 'bg-primary hover:bg-primary/90'
                }`}
                title="KrushiMart Assistant"
            >
                <span className="material-symbols-outlined text-white text-2xl">
                    {isOpen ? 'close' : 'chat'}
                </span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] bg-surface-container rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-white/10">
                    {/* Header */}
                    <div className="bg-primary px-5 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-on-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-primary">smart_toy</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-on-primary font-bold text-sm">KrushiMart Assistant</h3>
                            <p className="text-on-primary/70 text-xs">Always here to help</p>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 h-80 bg-surface">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'bot' && (
                                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                        <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                                    </div>
                                )}
                                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                    msg.sender === 'user'
                                        ? 'bg-primary text-on-primary rounded-br-md'
                                        : 'bg-surface-container border border-white/10 text-on-surface rounded-bl-md'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                    <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                                </div>
                                <div className="bg-surface-container border border-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    {messages.length <= 1 && (
                        <div className="px-4 pb-2 flex flex-wrap gap-2">
                            {quickReplies.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => sendMessage(q)}
                                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-3 border-t border-white/10 bg-surface-container">
                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Ask about KrushiMart..."
                                className="flex-1 bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder-slate-500 focus:outline-none focus:border-primary/50"
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!input.trim() || isTyping}
                                className="w-10 h-10 bg-primary text-on-primary rounded-xl flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
                            >
                                <span className="material-symbols-outlined text-lg">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBotWidget;
