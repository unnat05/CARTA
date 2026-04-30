'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, Sparkles, RotateCcw, Bot, User as UserIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleChat, setSearchQuery } from '@/lib/features/ui-slice';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'init',
    role: 'assistant',
    content: "Hi! I'm Carta AI. Ask me anything about products — I can help you find the best deals, compare options, or decide if something is worth buying.\n\nTry asking:\n• Compare iPhone 15 Pro vs Samsung Galaxy S24 Ultra\n• Find the best noise-cancelling headphones\n• Is the Apple Watch Series 9 worth buying?",
  },
];

export const AiAssistant = () => {
  const dispatch = useDispatch();
  const isChatOpen = useSelector((state: RootState) => state.ui.isChatOpen);
  const globalSearchQuery = useSelector((state: RootState) => state.ui.searchQuery);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [lastProcessed, setLastProcessed] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isChatOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isChatOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // Check for error in response
      if (data.error) {
        throw new Error(data.error);
      }

      let content = data.response;

      // Provide helpful fallback if no API key
      if (!content || content.includes('demo mode') || content.includes('API Key')) {
        content = `I understand you're asking about: "${text}"\n\nI'm currently in demo mode without a Gemini API key configured. Here's what I can tell you:\n\n• Use the Search feature to find products across stores\n• Use Compare to see side-by-side product analysis\n• Set up price alerts to track deals\n\nExample prompts you can try:\n• Compare iPhone 15 Pro vs Samsung Galaxy S24 Ultra\n• Best headphones under ₹20,000\n• Is the Apple Watch Series 9 worth buying?\n\nTo enable full AI responses, add your Gemini API key to the .env.local file as GEMINI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY.`;
      }

      setMessages((prev) => [...prev, {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content,
      }]);
    } catch (error) {
      console.error('AI chat error:', error);
      setMessages((prev) => [...prev, {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "I'm having trouble connecting right now. This could be because:\n\n• The Gemini API key isn't configured\n• There's a network issue\n• The API service is temporarily unavailable\n\nTry using the Search or Compare features in the dashboard instead!",
      }]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  useEffect(() => {
    if (globalSearchQuery && globalSearchQuery !== lastProcessed) {
      if (!isChatOpen) dispatch(toggleChat());
      // eslint-disable-next-line react-hooks/set-state-in-effect
      sendMessage(globalSearchQuery);
      dispatch(setSearchQuery(''));
      setLastProcessed(globalSearchQuery);
    }
  }, [globalSearchQuery, lastProcessed, isChatOpen, dispatch, sendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="mb-4 w-[380px] h-[560px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Sparkles size={18} />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-card rounded-full" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Carta AI</p>
                  <p className="text-xs text-muted-foreground">Shopping assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => setMessages(INITIAL_MESSAGES)} className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground">
                  <RotateCcw size={14} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => dispatch(toggleChat())} className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground">
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-4 py-4">
              <div className="space-y-4">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn('flex gap-2.5', m.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    {m.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                        <Bot size={13} />
                      </div>
                    )}
                    <div className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-muted text-foreground rounded-tl-sm'
                    )}>
                      {m.content}
                    </div>
                    {m.role === 'user' && (
                      <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
                        <UserIcon size={13} />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Bot size={13} />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5">
                      {[0, 0.15, 0.3].map((delay, i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay }}
                          className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="px-4 py-4 border-t border-border shrink-0">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about any product..."
                  disabled={isTyping}
                  className="flex-1 rounded-xl h-10 text-sm border-border bg-muted/30 focus-visible:ring-1 focus-visible:ring-primary/30"
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isTyping} className="w-10 h-10 rounded-xl shrink-0">
                  <Send size={16} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => dispatch(toggleChat())}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-colors relative',
          isChatOpen ? 'bg-foreground text-background' : 'bg-primary text-primary-foreground'
        )}
      >
        <AnimatePresence mode="wait">
          {isChatOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }}>
              <MessageSquare size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isChatOpen && (
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full" />
        )}
      </motion.button>
    </div>
  );
};
