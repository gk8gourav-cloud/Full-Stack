import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setContent,
  saveDraft,
  deleteDraft,
} from "../features/posts/postSlice";
import { setPlatform } from "../features/platforms/platformSlice";

function PostComposer() {
  const dispatch = useDispatch();

  const content = useSelector((state) => state.posts.content);
  const drafts = useSelector((state) => state.posts.drafts);
  const platform = useSelector((state) => state.platform.selected);
  const limits = useSelector((state) => state.platform.limits);

  const limit = limits[platform] || 0;

  const [dark, setDark] = useState(false);

  const isExceeded = content.length > limit;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark ? "#0f172a" : "#eef2ff",
        color: dark ? "#fff" : "#000",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "15px",
          background: "#4f46e5",
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        🚀 Redux Post Composer Dashboard
      </div>

      {/* MAIN CONTAINER */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "400px",
            background: dark ? "#1e293b" : "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          {/* TOP CONTROLS */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Compose Post</h3>
            <button onClick={() => setDark(!dark)}>
              {dark ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

          {/* PLATFORM SELECT */}
          <select
            onChange={(e) => dispatch(setPlatform(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "6px",
            }}
          >
            <option>Twitter</option>
            <option>LinkedIn</option>
            <option>Instagram</option>
          </select>

          {/* PLATFORM BADGE */}
          <div
            style={{
              marginBottom: "10px",
              padding: "5px 10px",
              background: "#6366f1",
              color: "#fff",
              display: "inline-block",
              borderRadius: "20px",
              fontSize: "12px",
            }}
          >
            {platform}
          </div>

          {/* TEXT AREA */}
          <textarea
            value={content}
            onChange={(e) => dispatch(setContent(e.target.value))}
            rows={4}
            placeholder="Write your post..."
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          {/* COUNTER + STATUS */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>{content.length} / {limit}</p>
            <p style={{ color: isExceeded ? "red" : "green" }}>
              {isExceeded ? "Exceeded ❌" : "Valid ✅"}
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div
            style={{
              height: "6px",
              background: "#ddd",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min((content.length / limit) * 100, 100)}%`,
                background: isExceeded ? "red" : "#22c55e",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <button
              onClick={() => dispatch(saveDraft())}
              style={{ background: "#3b82f6", color: "#fff", padding: "6px" }}
            >
              Save
            </button>

            <button
              onClick={() => dispatch(setContent(""))}
              style={{ background: "#f59e0b", color: "#fff", padding: "6px" }}
            >
              Clear
            </button>

            <button
              disabled={isExceeded}
              style={{
                background: isExceeded ? "#ccc" : "#10b981",
                color: "#fff",
                padding: "6px",
              }}
            >
              Post
            </button>
          </div>

          {/* DRAFT SECTION */}
          <div>
            <h4>📂 Saved Drafts</h4>
            <div
              style={{
                maxHeight: "120px",
                overflowY: "auto",
                border: "1px solid #ddd",
                padding: "5px",
                borderRadius: "6px",
              }}
            >
              {drafts.length === 0 ? (
                <p style={{ fontSize: "12px" }}>No drafts saved</p>
              ) : (
                drafts.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: "#f1f5f9",
                      padding: "5px",
                      marginBottom: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <span style={{ fontSize: "12px" }}>{d}</span>
                    <button
                      onClick={() => dispatch(deleteDraft(i))}
                      style={{ color: "red" }}
                    >
                      ❌
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostComposer;