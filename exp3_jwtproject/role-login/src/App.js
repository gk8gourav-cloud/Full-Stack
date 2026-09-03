
import React, { useState } from "react";

function App() {
  const users = [
    { role: "Student", password: "123" },
    { role: "Teacher", password: "123" },
    { role: "Department", password: "123" }
  ];

  const [selectedRole, setSelectedRole] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.role === selectedRole && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      setError("");
    } else {
      setError("Invalid Password or Role");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole("");
    setPassword("");
    setMessage("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🔐 Role Login System</h2>

        {!user ? (
          <>
            <select
              style={styles.input}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Department">Department</option>
            </select>

            <input
              style={styles.input}
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={styles.button} onClick={handleLogin}>
              Login
            </button>

            {error && <p style={styles.error}>{error}</p>}
          </>
        ) : (
          <>
            <h3>Welcome {user.role}</h3>

            {/* STUDENT OPTIONS */}
            {user.role === "Student" && (
              <>
                <button style={styles.optionBtn} onClick={() => setMessage("📚 Viewing Courses")}>
                  View Courses
                </button>
                <button style={styles.optionBtn} onClick={() => setMessage("📝 Submitting Assignment")}>
                  Submit Assignment
                </button>
              </>
            )}

            {/* TEACHER OPTIONS */}
            {user.role === "Teacher" && (
              <>
                <button style={styles.optionBtn} onClick={() => setMessage("📝 Uploading Marks")}>
                  Upload Marks
                </button>
                <button style={styles.optionBtn} onClick={() => setMessage("📊 Managing Attendance")}>
                  Manage Attendance
                </button>
              </>
            )}

            {/* DEPARTMENT OPTIONS */}
            {user.role === "Department" && (
              <>
                <button style={styles.optionBtn} onClick={() => setMessage("🏫 Managing Departments")}>
                  Manage Department
                </button>
                <button style={styles.optionBtn} onClick={() => setMessage("📈 Viewing Reports")}>
                  View Reports
                </button>
              </>
            )}

            {/* MESSAGE OUTPUT */}
            {message && <p style={styles.message}>{message}</p>}

            <button style={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #4facfe, #00f2fe)"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  optionBtn: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  logout: {
    marginTop: "15px",
    padding: "10px",
    width: "100%",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    fontSize: "14px"
  },
  message: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#333"
  }
};

export default App;

