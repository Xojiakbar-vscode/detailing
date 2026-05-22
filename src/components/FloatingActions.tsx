"use client";

import React, { useState } from "react";
import { MessageSquare, Send, X, Phone, User, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const compiledMessage = `✉️ Yangi Taklif va Shikoyat ✉️\n\n` +
                            `👤 Kimdan: ${name || "Ko'rsatilmagan"}\n` +
                            `📞 Telefon: ${phone || "Ko'rsatilmagan"}\n\n` +
                            `📝 Xabar mazmuni:\n${message}\n\n` +
                            `Taklif va shikoyatlar admin botiga taqdim etildi.`;

    const encoded = encodeURIComponent(compiledMessage);
    window.open(`https://t.me/elegant_auto_admin?text=${encoded}`, "_blank");
    
    // Clear form and close modal
    setName("");
    setPhone("");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3.5">
        {/* Feedback / Complaint Floating Button (Green) */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-blue-400 hover:from-blue-500 hover:to-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_30px_rgba(52,211,153,0.5)] transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 border border-white/10 group cursor-pointer"
          title="Taklif va shikoyat yuborish"
          id="feedback-floating-btn"
        >
          <MessageSquare className="w-5.5 h-5.5 transition-transform duration-300 group-hover:rotate-12" />
        </button>

        {/* Telegram Direct Floating Button (Blue) */}
        <a
          href="https://t.me/elegant_auto_admin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-sky-600 to-[#00c2ff] hover:from-[#00c2ff] hover:to-sky-500 text-white shadow-[0_4px_20px_rgba(0,112,243,0.3)] hover:shadow-[0_4px_30px_rgba(0,194,255,0.5)] transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 border border-white/10 group"
          title="Chat via Telegram"
          id="telegram-floating-btn"
        >
          <Send className="w-5.5 h-5.5 -translate-x-[1px] translate-y-[1px] transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
        </a>
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-3xl border border-gray-200/50 shadow-2xl p-6 sm:p-8 pointer-events-auto overflow-hidden relative"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-blue-400" />

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 rounded-full bg-gray-50 border border-gray-200/50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="space-y-2 mb-6">
                  <div className="inline-flex items-center space-x-2 text-emerald-600">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Murojaat va takliflar</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">Taklif va Shikoyatlar</h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    Bizning xizmatlarimizni yanada yaxshilash uchun o'z fikr, taklif yoki shikoyatingizni yozib qoldiring. Xabaringiz to'g'ridan-to'g'ri adminga yetkaziladi.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-name" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Ismingiz</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        id="modal-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sanjarbek"
                        className="w-full bg-white border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 text-gray-900 pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-phone" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Telefon raqamingiz</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        id="modal-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+998 (90) 123-45-67"
                        className="w-full bg-white border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 text-gray-900 pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-message" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Xabar matni</label>
                    <textarea
                      id="modal-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Fikr, taklif yoki shikoyatingizni batafsil yozib qoldiring..."
                      className="w-full bg-white border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 text-gray-900 p-4 rounded-xl text-sm focus:outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-blue-500 hover:from-blue-500 hover:to-emerald-600 text-white font-bold py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegram orqali yuborish</span>
                  </button>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
