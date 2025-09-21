"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Jrz, your virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])

  const whatsappConfig = {
    phoneNumber: "+639693134738",
    businessName: "Jeruz Abiera",
    defaultMessage: "Hi! I'm interested in your services.",
  }

  const messengerConfig = {
    pageId: "JrzStflrFB",
    businessName: "Jeruz Abiera",
    defaultMessage: "Hi! I'm interested in your services.",
  }

  const getInternalResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()

    // Auto-trigger WhatsApp
    if (msg.includes("whatsapp") || msg.includes("whats app")) {
      setTimeout(() => openWhatsAppChat(userMessage), 1500)
      return "Great! I'm opening WhatsApp for you now so you can continue our conversation there..."
    }

    // Auto-trigger Messenger
    if (msg.includes("messenger") || msg.includes("facebook")) {
      setTimeout(() => openMessengerChat(userMessage), 1500)
      return "Perfect! I'm opening Facebook Messenger for you now so we can chat there..."
    }

    if (msg.includes("quote") || msg.includes("price") || msg.includes("cost")) {
      return {
        text: "I'd be happy to help you with pricing! For a detailed quote, I can connect you with our team. Click on your preferred platform:",
        hasClickableLinks: true,
      }
    }

    if (msg.includes("meeting") || msg.includes("schedule") || msg.includes("appointment")) {
      return {
        text: "Great! I can help you schedule a meeting. Choose your preferred platform to coordinate the details:",
        hasClickableLinks: true,
      }
    }

    if (msg.includes("services") || msg.includes("what do you do")) {
      return {
        text: "We offer web development, mobile apps, and digital solutions. For detailed information, click to connect with our team:",
        hasClickableLinks: true,
      }
    }

    if (msg.includes("contact") || msg.includes("phone") || msg.includes("email")) {
      return {
        text: "You can reach us directly! Click on your preferred platform for immediate assistance:",
        hasClickableLinks: true,
      }
    }

    return {
      text: "Thanks for your message! For personalized assistance, click on your preferred platform to connect with our team:",
      hasClickableLinks: true,
    }
  }

  const handlePlatformClick = (platform, defaultMessage) => {
    if (platform === "whatsapp") {
      openWhatsAppChat(defaultMessage)
    } else if (platform === "messenger") {
      openMessengerChat(defaultMessage)
    }
  }

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

  const quickActions = [
    { text: "Get a Quote", message: "Hi! I'd like to get a quote for your services." },
    { text: "Schedule Meeting", message: "Hi! I'd like to schedule a meeting to discuss my project." },
    { text: "WhatsApp Support", message: "whatsapp" },
    { text: "Messenger Support", message: "messenger" },
  ]

  const sendMessage = async () => {
    if (!message.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response delay
    setTimeout(() => {
      const response = getInternalResponse(message)
      const botResponse = {
        id: messages.length + 2,
        text: typeof response === "string" ? response : response.text,
        sender: "bot",
        timestamp: new Date(),
        hasClickableLinks: typeof response === "object" ? response.hasClickableLinks : false,
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setMessage("")
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
        <div className="w-80 h-96 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white flex justify-between items-center p-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Bot size={16} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Jrz</h3>
                <p className="text-xs opacity-90">Bot-Chat Support</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === "user" ? "bg-purple-600 text-white" : "bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>

                    {msg.sender === "bot" && msg.hasClickableLinks && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() =>
                            handlePlatformClick(
                              "whatsapp",
                              "Hi! I'm interested in your services and would like to continue our conversation.",
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1"
                        >
                          📱 WhatsApp
                        </button>
                        <button
                          onClick={() =>
                            handlePlatformClick(
                              "messenger",
                              "Hi! I'm interested in your services and would like to continue our conversation.",
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1"
                        >
                          💬 Messenger
                        </button>
                      </div>
                    )}

                    <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-purple-200" : "text-gray-500"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1"
              />
              <button
                onClick={sendMessage}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors flex items-center gap-1"
              >
                <Send size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.message)}
                  className="text-left p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors text-xs"
                >
                  <span className="text-gray-700">{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 via-green-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:from-purple-700 hover:via-green-700 hover:to-blue-700 transition-all hover:scale-105 relative"
        >
          <MessageCircle size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </button>
      )}
    </div>
  )
}

export default ChatBot
