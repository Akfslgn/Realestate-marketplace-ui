import { useState, useEffect, useRef } from "react";
import "./AIChat.css";
import { getToken } from "../utils/auth";
import { chat } from "../api/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRobot } from "react-icons/fa";

const AIIcon = ({ size = 32, color = "white" }) => (
  <FaRobot
    style={{
      fontSize: `${size}px`,
      color: color,
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
    }}
  />
);

function AIChat({ listingId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const openChat = () => {
    setShow(true);
  };

  const sendMessage = async () => {
    const token = getToken();

    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = message.trim();
    setMessage("");
    setLoading(true);

    try {
      const data = await chat(token, { message: currentMessage }, listingId);

      const aiMessage = {
        id: Date.now() + 1,
        text: data.message,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: `Error: ${error.message}`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 1050 }}
      >
        {!show ? (
          <div className="text-center">
            <button
              className="btn btn-primary rounded-circle shadow-lg border-0 position-relative"
              onClick={openChat}
              title="Ask AI about this property!"
              style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                transition: "all 0.3s ease",
                transform: "scale(1)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow =
                  "0 8px 25px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
            >
              <AIIcon size={32} color="white" />
              {/* Pulse animation */}
              <span
                className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                style={{
                  background: "rgba(255,255,255,0.3)",
                  animation: "pulse 2s infinite",
                }}
              ></span>
            </button>
            <small className="d-block text-muted mt-2 fw-bold">Ask AI</small>
          </div>
        ) : (
          <div
            className="card border-0 shadow-lg"
            style={{
              width: "min(420px, calc(100vw - 2rem))",
              maxWidth: "420px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div
              className="card-header text-white border-0 d-flex justify-content-between align-items-center"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "20px 20px 0 0",
                padding: "1rem 1.5rem",
              }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <AIIcon size={24} color="white" />
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">AI Assistant</h6>
                  <small className="opacity-75">Property Expert</small>
                </div>
              </div>
              <button
                className="btn btn-link text-white p-0 border-0 fs-4"
                onClick={() => setShow(false)}
                style={{
                  opacity: 0.8,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "1")}
                onMouseLeave={(e) => (e.target.style.opacity = "0.8")}
              >
                <IoIosCloseCircleOutline />
              </button>
            </div>

            <div
              className="card-body d-flex flex-column"
              style={{
                padding: "0",
                background: "rgba(255,255,255,0.95)",
                borderRadius: "0 0 20px 20px",
                height: "500px",
              }}
            >
              {/* Messages Area */}
              <div
                className="flex-grow-1 p-3 messages-container"
                style={{
                  overflowY: "auto",
                  maxHeight: "400px",
                  background:
                    "linear-gradient(135deg, #f8f9ff 0%, #e6f3ff 100%)",
                }}
              >
                {messages.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <div
                      className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                      }}
                    >
                      <AIIcon size={30} color="white" />
                    </div>
                    <h6 className="fw-bold">Start a conversation</h6>
                    <p className="small mb-0">
                      Ask me anything about this property!
                    </p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`d-flex mb-3 ${
                          msg.sender === "user"
                            ? "justify-content-end user-message"
                            : "justify-content-start ai-message"
                        }`}
                      >
                        {msg.sender === "ai" && (
                          <div
                            className="me-2 rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: "32px",
                              height: "32px",
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              color: "white",
                              flexShrink: 0,
                            }}
                          >
                            <AIIcon size={14} color="white" />
                          </div>
                        )}
                        <div
                          className={`px-3 py-2 rounded-3 shadow-sm ${
                            msg.sender === "user"
                              ? "bg-primary text-white"
                              : "bg-white text-dark border"
                          }`}
                          style={{
                            maxWidth: "75%",
                            fontSize: "14px",
                            lineHeight: "1.4",
                            background:
                              msg.sender === "user"
                                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                : "white",
                          }}
                        >
                          {msg.text}
                          <div
                            className={`small mt-1 ${
                              msg.sender === "user"
                                ? "text-white-50"
                                : "text-muted"
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                        {msg.sender === "user" && (
                          <div
                            className="ms-2 rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: "32px",
                              height: "32px",
                              background: "#f1f3f4",
                              color: "#5f6368",
                              flexShrink: 0,
                            }}
                          >
                            <span
                              style={{ fontSize: "14px", fontWeight: "bold" }}
                            >
                              U
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}

                {loading && (
                  <div className="d-flex justify-content-start mb-3">
                    <div
                      className="me-2 rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "32px",
                        height: "32px",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      <AIIcon size={14} color="white" />
                    </div>
                    <div
                      className="px-3 py-2 rounded-3 bg-white border shadow-sm"
                      style={{ fontSize: "14px" }}
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        AI is typing...
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div
                className="p-3 border-top"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "0 0 20px 20px",
                }}
              >
                <div className="d-flex align-items-end">
                  <textarea
                    className="form-control border-0 shadow-sm me-2"
                    rows={1}
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    style={{
                      borderRadius: "20px",
                      background: "#f8f9fa",
                      border: "1px solid #e9ecef",
                      transition: "all 0.2s ease",
                      resize: "none",
                      minHeight: "44px",
                      maxHeight: "100px",
                    }}
                  />
                  <button
                    className="btn text-white border-0 shadow-sm"
                    onClick={sendMessage}
                    disabled={loading || !message.trim()}
                    style={{
                      background:
                        loading || !message.trim()
                          ? "#ccc"
                          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "50%",
                      width: "44px",
                      height: "44px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>➤</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AIChat;
