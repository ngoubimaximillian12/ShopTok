import React, { useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call backend login API
    alert(`Logging in ${username}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white rounded shadow">
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="input" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input mt-2" required />
      <button type="submit" className="btn mt-4 w-full">Login</button>
    </form>
  );
}
