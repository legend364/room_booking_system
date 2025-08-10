import React, { useState } from 'react';
import './SignInPage.css';

export default function SignInPage() {
  const [form, setForm] = useState({
    uowId: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    alert(`Logging in as ${form.role || 'Unknown'}: ${form.uowId}`);
  };

  return (
    <div className="signin-wrapper">
      <div className="login-box">
        <h2>Log In</h2>
        <p className="instruction-text">Please sign in with your UOW account</p>

        <label htmlFor="uowId">UOW ID:</label>
        <input
          type="text"
          name="uowId"
          id="uowId"
          value={form.uowId}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
        />

        <a href="#" className="forgot-link">Forget password?</a>

        <div className="radio-group">
          <label>Log in As:</label>
          <div>
            <input
              type="radio"
              name="role"
              value="Student"
              checked={form.role === 'Student'}
              onChange={handleChange}
            /> Student
            <input
              type="radio"
              name="role"
              value="Staff"
              checked={form.role === 'Staff'}
              onChange={handleChange}
              style={{ marginLeft: '20px' }}
            /> Staff
          </div>
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
