import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Mail, Trash2, CheckCircle, Clock, RefreshCw, Inbox, AlertCircle } from 'lucide-react';
import api from '../../../services/api';

const MessagesTab = () => {
  const { showToast } = usePortfolio();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMessages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.fetchMessages();
      if (res.success && res.data) {
        setMessages(res.data);
      }
    } catch (err) {
      setError('Could not connect to MongoDB backend to fetch messages.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await api.deleteMessageById(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      showToast('Message deleted');
    } catch (err) {
      showToast('Failed to delete message', 'error');
    }
  };

  const handleToggleRead = async (id) => {
    try {
      const res = await api.toggleMessageReadStatus(id);
      if (res.success && res.data) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, read: res.data.read } : m))
        );
        showToast(`Marked as ${res.data.read ? 'read' : 'unread'}`);
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-sm">
      <div className="flex items-center justify-between border-b border-border-color pb-4">
        <div>
          <h3 className="text-base font-bold text-text-main flex items-center gap-2">
            <Inbox className="w-5 h-5 text-primary" />
            <span>Contact Inbox ({messages.length})</span>
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Real-time contact form submissions stored in your MongoDB database.
          </p>
        </div>

        <button
          onClick={loadMessages}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-base border border-border-color hover:border-primary text-xs font-semibold text-text-main transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div>
            <div className="font-bold">Backend Connection Notice</div>
            <div className="text-xs text-amber-500/80 mt-0.5">{error} Make sure your Node server (`npm run dev` in `/backend`) is running on port 5000.</div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="py-16 text-center text-text-muted flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span>Loading messages from MongoDB...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="py-16 text-center bg-bg-base/40 rounded-3xl border border-dashed border-border-color p-8 flex flex-col items-center justify-center gap-3">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <Mail className="w-8 h-8" />
          </div>
          <div className="font-bold text-base text-text-main">Your Inbox is Empty</div>
          <p className="text-xs text-text-muted max-w-md">
            When visitors submit the contact form on your portfolio website, their messages will appear here instantly!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-5 rounded-2xl border transition-all ${
                msg.read
                  ? 'bg-bg-base/40 border-border-color opacity-75'
                  : 'bg-bg-card border-primary/40 shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-color/50 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${msg.read ? 'bg-text-muted' : 'bg-primary animate-pulse'}`} />
                  <div>
                    <h4 className="font-bold text-text-main text-base">{msg.name}</h4>
                    <a href={`mailto:${msg.email}`} className="text-xs text-primary hover:underline font-mono">
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-[11px] text-text-muted font-mono flex items-center gap-1 bg-bg-base px-2.5 py-1 rounded-lg border border-border-color">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </span>

                  <button
                    onClick={() => handleToggleRead(msg._id)}
                    title={msg.read ? "Mark Unread" : "Mark Read"}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      msg.read
                        ? 'bg-bg-base border-border-color text-text-muted hover:text-primary'
                        : 'bg-primary/10 border-primary/30 text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    title="Delete Message"
                    className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                {msg.subject && (
                  <div className="text-xs font-semibold text-text-main uppercase tracking-wider">
                    Subject: <span className="text-primary font-normal">{msg.subject}</span>
                  </div>
                )}
                <p className="text-sm text-text-main leading-relaxed whitespace-pre-wrap bg-bg-base/60 p-3.5 rounded-xl border border-border-color/60 mt-2">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesTab;
