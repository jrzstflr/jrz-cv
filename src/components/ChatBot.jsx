"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Jrz, your virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      options: [
        { label: "Pricing & Quotes", next: "quotes" },
        { label: "Schedule a Meeting", next: "meeting" },
        { label: "Learn About Services", next: "services" },
        { label: "Talk to a Live Agent", next: "escalate" },
      ],
    },
  ])
  const [currentStep, setCurrentStep] = useState("start")

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const whatsappConfig = {
    phoneNumber: "+639693134738",
    defaultMessage: "Hi! I'm interested in your services.",
  }

  const messengerConfig = {
    pageId: "JrzStflrFB",
    defaultMessage: "Hi! I'm interested in your services.",
  }

  // --- Decision Tree Flows ---
  const inquiryFlows = {
    quotes: {
      text: "Great! Do you need a quote for Web Development, Mobile Apps, or Digital Solutions?",
      options: [
        { label: "Web Development", next: "escalate" },
        { label: "Mobile Apps", next: "escalate" },
        { label: "Digital Solutions", next: "escalate" },
      ],
    },
    meeting: {
      text: "Would you like to meet via WhatsApp or Messenger?",
      options: [
        { label: "WhatsApp", action: "whatsapp" },
        { label: "Messenger", action: "messenger" },
      ],
    },
    services: {
      text: "We offer Web Development, Mobile Apps, and Digital Solutions. Would you like to see more details or talk to an agent?",
      options: [
        { label: "See More Details", next: "escalate" },
        { label: "Talk to Agent", next: "escalate" },
      ],
    },
    escalate: {
      text: "I’ll connect you with a live support agent. Please choose your preferred channel:",
      options: [
        { label: "WhatsApp", action: "whatsapp" },
        { label: "Messenger", action: "messenger" },
      ],
    },
  }

  // --- Handle Option Clicks ---
  const handleOptionClick = (option) => {
    const userMsg = {
      id: messages.length + 1,
      text: option.label,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])

    if (option.next) {
      const step = inquiryFlows[option.next]
      const botMsg = {
        id: messages.length + 2,
        text: step.text,
        sender: "bot",
        timestamp: new Date(),
        options: step.options,
      }
      setMessages((prev) => [...prev, botMsg])
      setCurrentStep(option.next)
    } else if (option.action === "whatsapp") {
      const botMsg = {
        id: messages.length + 2,
        text: "Click below to open WhatsApp with all your previous chat history forwarded:",
        sender: "bot",
        timestamp: new Date(),
        options: [{ label: "Open WhatsApp", action: "whatsappDirect" }],
      }
      setMessages((prev) => [...prev, botMsg])
    } else if (option.action === "messenger") {
      const botMsg = {
        id: messages.length + 2,
        text: "Click below to continue with Messenger:",
        sender: "bot",
        timestamp: new Date(),
        options: [{ label: "Open Messenger", action: "messengerDirect" }],
      }
      setMessages((prev) => [...prev, botMsg])
    } else if (option.action === "whatsappDirect") {
      openWhatsAppChat()
    } else if (option.action === "messengerDirect") {
      openMessengerChat()
    }
  }

  // --- WhatsApp / Messenger ---
  const openWhatsAppChat = (customMessage = "") => {
    const messageText = customMessage || message || whatsappConfig.defaultMessage
    const encodedMessage = encodeURIComponent(messageText)
    const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber.replace("+", "")}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const openMessengerChat = (customMessage = "") => {
    const messageText = customMessage || message || messengerConfig.defaultMessage
    const encodedMessage = encodeURIComponent(messageText)
    const messengerUrl = `https://m.me/${messengerConfig.pageId}?text=${encodedMessage}`
    window.open(messengerUrl, "_blank")
  }

  // --- Manual Typing / Quick Actions still work ---
  const quickActions = [
    { text: "Get a Quote", message: "Hi! I'd like to get a quote for your services.", icon: "💰" },
    { text: "Schedule Meeting", message: "Hi! I'd like to schedule a meeting to discuss my project.", icon: "📅" },
    { text: "WhatsApp Support", message: "whatsapp", icon: "📱" },
    { text: "Messenger Support", message: "messenger", icon: "💬" },
  ]

  const sendMessage = () => {
    if (!message.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsTyping(true)

    // Default response: guide user back to flow
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! Please choose an option below to continue:",
        sender: "bot",
        timestamp: new Date(),
        options: inquiryFlows[currentStep]?.options || inquiryFlows["quotes"].options,
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1200)
  }

  const handleQuickAction = (actionMessage) => {
    setMessage(actionMessage)
    setTimeout(() => {
      sendMessage()
    }, 100)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)} />
          <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-4 slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white flex justify-between items-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 animate-pulse"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <Bot size={18} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Jrz Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs opacity-90">Online now</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-110 relative z-10"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-2xl relative ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                          : "bg-white text-gray-800 shadow-md border border-gray-100"
                      }`}
                    >
                      <div
                        className={`absolute top-3 ${
                          msg.sender === "user"
                            ? "-right-1 w-3 h-3 bg-gradient-to-br from-purple-600 to-indigo-600 rotate-45"
                            : "-left-1 w-3 h-3 bg-white border-l border-b border-gray-100 rotate-45"
                        }`}
                      ></div>

                      <p className="text-sm leading-relaxed relative z-10">{msg.text}</p>

                      {/* Render options if present */}
                      {msg.options && (
                        <div className="flex flex-col gap-2 mt-3 relative z-10">
                          {msg.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleOptionClick(opt)}
                              className="px-3 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg text-sm text-purple-700 text-left transition"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}

                      <p
                        className={`text-xs mt-2 ${msg.sender === "user" ? "text-purple-200" : "text-gray-500"} relative z-10`}
                      >
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-white text-gray-800 shadow-md border border-gray-100 p-3 rounded-2xl relative">
                      <div className="absolute top-3 -left-1 w-3 h-3 bg-white border-l border-b border-gray-100 rotate-45"></div>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">Jrz is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input + Quick Actions */}
            <div className="p-4 border-t bg-white/80 backdrop-blur-sm">
              <div className="flex gap-2 mb-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 bg-white/90 backdrop-blur-sm"
                    disabled={isTyping}
                  />
                  {message && (
                    <button
                      onClick={() => setMessage("")}
                      className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Clear message"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!message.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-xl text-sm hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.message)}
                    disabled={isTyping}
                    className="text-left p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-purple-300 hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 text-xs shadow-sm hover:shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base group-hover:scale-110 transition-transform duration-200">
                        {action.icon}
                      </span>
                      <span className="text-gray-700 font-medium">{action.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 relative group animate-bounce"
          style={{ animationDuration: "3s", animationIterationCount: "infinite" }}
          aria-label="Open chat"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg">
            <div className="absolute inset-0 bg-red-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 rounded-full animate-pulse"></div>
        </button>
      )}
    </div>
  )
}

export default ChatBot
