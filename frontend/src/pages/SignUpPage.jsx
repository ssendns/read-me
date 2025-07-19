import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { username, password };

    try {
      const res = await fetch("http://localhost:3000/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("failed to sign up");

      const data = await res.json();
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("username", data.user.username);
      console.log(data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-bg text-text font-typewriter flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">sign up</h2>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 border border-color-border rounded focus:outline-none"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-color-border rounded focus:outline-none"
        />
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded hover:bg-opacity-90"
        >
          sign up
        </button>
        <p>
          already have an account? <Link to="/log-in">log in</Link>
        </p>
      </form>
    </main>
  );
}
