import React, { useEffect, useState, useRef } from "react";
import UserService from '../services/UserService';

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const [completedLessonStats, setCompletedLessonStats] = useState({});
  const inputRef = useRef(null);

  // Fetch lessons + userId
  useEffect(() => {
    UserService.getLessons()
      .then(data => setLessons(Array.isArray(data) ? data : []))
      .catch(() => setLessons("Failed to fetch lessons. Please try again later."));
    UserService.getCurrentUser()
      .then(data => setUserId(Number(data)))
      .catch(() => setUserId(""));
  }, []);

  // Real-time WPM: single interval, standard 5-char word
  useEffect(() => {
    if (!selectedLesson || !startTimeRef.current) return;
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
      const chars = userInput.length;
      const words = chars / 5;
      const w = elapsedMinutes > 0 ? Math.round(words / elapsedMinutes) : 0;
      setWpm(w);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [selectedLesson, startTime]); // stable interval across typing [web:76][web:63]

  // Accuracy calculation (existing logic)
  useEffect(() => {
    if (!selectedLesson || userInput.length === 0) {
      setAccuracy(100);
      return;
    }
    const target = (selectedLesson && selectedLesson.lessonText) || "";
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === target[i]) correctChars++;
    }
    setAccuracy(
      userInput.length > 0
        ? Math.round((correctChars / userInput.length) * 100)
        : 100
    );
  }, [userInput, selectedLesson]); // unchanged [web:63]

  // Handle completion + snapshot final WPM (same formula)
  useEffect(() => {
    const target = selectedLesson?.lessonText || "";
    if (selectedLesson && userInput.length === target.length && target.length > 0) {
      let finalWpm = wpm;
      if (startTimeRef.current) {
        const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
        const chars = userInput.length;
        const words = chars / 5;
        finalWpm = elapsedMinutes > 0 ? Math.round(words / elapsedMinutes) : 0;
        setWpm(finalWpm);
      }

      setShowSuccess(true);

      const userStatusRequest = {
        id: userId,
        completedLessons: selectedLesson.lessonId,
        wpm: String(finalWpm),
        accuracy: String(accuracy),
      };

      UserService.updateUserStatus(userStatusRequest).catch(() => {});

      setCompletedLessonIds(prev =>
        prev.includes(selectedLesson.lessonId) ? prev : [...prev, selectedLesson.lessonId]
      );
      setCompletedLessonStats(prev => ({
        ...prev,
        [selectedLesson.lessonId]: { wpm: finalWpm, accuracy },
      }));

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const timer = setTimeout(() => {
        setSelectedLesson(null);
        setUserInput("");
        setStartTime(null);
        startTimeRef.current = null;
        setWpm(0);
        setAccuracy(100);
        setShowSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [userInput, selectedLesson, userId, wpm, accuracy]);

  const handleBack = () => {
    setSelectedLesson(null);
    setUserInput("");
    setStartTime(null);
    startTimeRef.current = null;
    setWpm(0);
    setAccuracy(100);
    setShowSuccess(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (selectedLesson && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedLesson]);

  const handleTyping = (e) => {
  if (!selectedLesson || showSuccess) return;

  const target = selectedLesson.lessonText || "";

  if (e.key.length === 1 && userInput.length < target.length) {
    // Start timer on first keystroke
    if (!startTimeRef.current) {
      const now = Date.now();
      startTimeRef.current = now;
      setStartTime(now);
    }

    const nextInput = userInput + e.key;
    setUserInput(nextInput);

    // Calculate real-time WPM
    const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
    const wordsTyped = nextInput.length / 5;
    const currentWpm = elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
    setWpm(currentWpm);

  } else if (e.key === "Backspace" && userInput.length > 0) {
    const nextInput = userInput.slice(0, -1);
    setUserInput(nextInput);

    // Update WPM on backspace as well
    const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
    const wordsTyped = nextInput.length / 5;
    const currentWpm = elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
    setWpm(currentWpm);
  }
};
  const getHighlightedText = () => {
    const text = selectedLesson?.lessonText || "";
    return (
      <div
        style={{
          fontSize: "1.5rem",
          lineHeight: "2.2rem",
          background: "#f7fbff",
          padding: "28px",
          borderRadius: "12px",
          marginBottom: "28px",
          minHeight: "90px",
          wordBreak: "break-word",
          outline: "none",
          border: "1px solid #bcdff1",
          userSelect: "none",
          boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        {text.split("").map((char, idx) => {
          let style = {};
          if (userInput.length > idx) {
            style =
              userInput[idx] === char
                ? { color: "#4e8cff", background: "#eaf4ff" }
                : { color: "#ff7f7f", background: "#fff2f2" };
          } else if (userInput.length === idx) {
            style = { background: "#e0eafc" };
          }
          return (
            <span key={idx} style={{ ...style, padding: "2px" }}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  // Lessons list fallback
  if (typeof lessons === "string") {
    return (
      <div style={{ padding: "32px", background: "#f5f6fa", minHeight: "100vh" }}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Lessons</h2>
        <div style={{ textAlign: "center", color: "#555" }}>
          {typeof lessons === "string" ? lessons : "Failed to load lessons."}
        </div>
      </div>
    );
  }

  if (selectedLesson) {
    return (
      <div style={{
        padding: "48px",
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif"
      }}>
        <button
          style={{
            position: "absolute",
            top: "48px",
            left: "48px",
            padding: "16px 32px",
            border: "none",
            borderRadius: "8px",
            background: "#4e8cff",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1.2rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)"
          }}
          onClick={handleBack}
        >
          ← Back
        </button>
        <h2 style={{
          textAlign: "center",
          marginBottom: "32px",
          color: "#4e8cff",
          fontWeight: "700",
          fontSize: "2.5rem"
        }}>
          {selectedLesson.lessonName}
        </h2>
        <div style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          padding: "48px",
          margin: "0 auto",
          maxWidth: "1000px",
          textAlign: "center"
        }}>
          {getHighlightedText()}
          {/* Hidden input to capture typing */}
          <input
            ref={inputRef}
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
              width: "1px",
              height: "1px"
            }}
            onKeyDown={handleTyping}
            autoFocus
          />
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "32px",
            fontSize: "2rem"
          }}>
            <div>
              <strong>Speed:</strong> <span style={{ color: "#4e8cff" }}>{wpm} WPM</span>
            </div>
            <div>
              <strong>Accuracy:</strong> <span style={{ color: "#2ecc40" }}>{isNaN(accuracy) ? 100 : accuracy}%</span>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "32px", color: "#888", fontSize: "1.3rem" }}>
            <span>Start typing to begin. Use Backspace to correct mistakes.</span>
          </div>
          {showSuccess && (
            <div style={{
              marginTop: "40px",
              fontSize: "3rem",
              color: "#2ecc40",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <span style={{ fontSize: "5rem", marginBottom: "16px" }}>✔️</span>
              <span>Lesson Completed!</span>
              <span style={{ fontSize: "1.2rem", color: "#4e8cff", marginTop: "8px" }}>
                Returning to lessons page...
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Lessons list
  return (
    <div style={{
      padding: "48px",
      background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      minHeight: "100vh",
      fontFamily: "Segoe UI, Arial, sans-serif"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: "32px",
        color: "#4e8cff",
        fontWeight: "700",
        fontSize: "2.5rem"
      }}>Lessons</h2>
      <div style={{
        display: "flex",
        gap: "32px",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {lessons.map((lesson) => (
          <div key={lesson.lessonId} style={{
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            padding: "48px",
            width: "340px",
            textAlign: "center",
            transition: "transform 0.2s",
            fontSize: "1.3rem",
            position: "relative"
          }}>
            <h3 style={{
              marginBottom: "24px",
              color: "#333",
              fontWeight: "600",
              fontSize: "1.6rem"
            }}>{lesson.lessonName}</h3>
            {completedLessonStats[lesson.lessonId] && (
              <div style={{ marginBottom: "12px", color: "#2ecc40", fontSize: "1.1rem" }}>
                <span>✔️ Completed</span>
                <div>
                  <span>WPM: {completedLessonStats[lesson.lessonId].wpm}</span>
                  {" | "}
                  <span>Accuracy: {completedLessonStats[lesson.lessonId].accuracy}%</span>
                </div>
              </div>
            )}
            <button style={{
              marginTop: "24px",
              padding: "16px 32px",
              border: "none",
              borderRadius: "8px",
              background: "#4e8cff",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.2rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)"
            }}
              onClick={() => setSelectedLesson(lesson)}
            >
              View Lesson
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
