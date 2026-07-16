import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [platform, setPlatform] = useState("Twitter");

  const limit = {
    Twitter: 280,
    Instagram: 2200,
    LinkedIn: 3000,
  }[platform];

  // ✅ Save Draft
  const saveDraft = () => {
    localStorage.setItem("draftText", text);
    alert("Draft Saved!");
  };

  // ✅ Load Draft
  const loadDraft = () => {
    const saved = localStorage.getItem("draftText");
    if (saved) {
      setText(saved);
    } else {
      alert("No Draft Found");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "blue",
        height: "100vh",
        color: "white",
      }}
    >
      <h1>Post Composer</h1>

      {/* Platform */}
      <select onChange={(e) => setPlatform(e.target.value)}>
        <option>Twitter</option>
        <option>Instagram</option>
        <option>LinkedIn</option>
      </select>

      <br /><br />

      {/* Text Area */}
      <textarea
        placeholder="Write here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p>{text.length} / {limit}</p>

      {text.length > limit && (
        <p style={{ color: "yellow" }}>Too long!</p>
      )}

      <br />

      {/* Buttons */}
      <button onClick={() => setText("")}>Clear</button>
      <button onClick={saveDraft}>Save Draft</button>
      <button onClick={loadDraft}>Load Draft</button>
    </div>
  );
}

export default App;