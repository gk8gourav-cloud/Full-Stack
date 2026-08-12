import React, { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const MAX_LENGTH = 100; // character limit

  // Load from localStorage
  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem("drafts"));
    if (savedDrafts) setDrafts(savedDrafts);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  // Save Draft
  const saveDraft = () => {
    if (text.trim() === "" || text.length > MAX_LENGTH) return;

    setLoading(true);

    setTimeout(() => {
      if (editId !== null) {
        const updated = drafts.map((d) =>
          d.id === editId ? { ...d, content: text } : d
        );
        setDrafts(updated);
        setEditId(null);
      } else {
        const newDraft = {
          id: Date.now(),
          content: text,
          time: new Date().toLocaleString(),
        };
        setDrafts([...drafts, newDraft]);
      }

      setText("");
      setLoading(false);
    }, 800);
  };

  // Delete
  const deleteDraft = (id) => {
    setDrafts(drafts.filter((d) => d.id !== id));
  };

  // Edit
  const editDraft = (draft) => {
    setText(draft.content);
    setEditId(draft.id);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Draft Management System</h1>

        <textarea
          style={styles.textarea}
          placeholder="Write your draft..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Character Counter */}
        <p style={{ color: text.length > MAX_LENGTH ? "red" : "gray" }}>
          {text.length}/{MAX_LENGTH} characters
        </p>

        {/* Exceed Message */}
        {text.length > MAX_LENGTH && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            ⚠ Character limit exceeded!
          </p>
        )}

        <button style={styles.button} onClick={saveDraft}>
          {editId ? "Update Draft" : "Save Draft"}
        </button>

        {loading && <p style={{ color: "blue" }}>Saving...</p>}

        <h2>Saved Drafts</h2>

        {drafts.length === 0 ? (
          <p>No drafts available</p>
        ) : (
          drafts.map((draft) => (
            <div key={draft.id} style={styles.draftCard}>
              <p>{draft.content}</p>
              <small>{draft.time}</small>

              <div>
                <button
                  style={styles.editBtn}
                  onClick={() => editDraft(draft)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteDraft(draft.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f8",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    color: "#333",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#007bff",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  draftCard: {
    background: "#f9f9f9",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    textAlign: "left",
  },
  editBtn: {
    background: "green",
    color: "white",
    border: "none",
    padding: "5px",
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px",
    cursor: "pointer",
  },
};

export default App;