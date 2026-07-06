import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("User");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await API.post("login/", {
        username,
        password,
      });

      const { access, role } = response.data;

      // Save login information
      localStorage.setItem("accessToken", access);
      localStorage.setItem("role", role);
      localStorage.setItem("username", response.data.username);

      // Check selected role matches actual role
      if (role !== selectedRole) {
        setError(
          `This account belongs to "${role}" role. Please select ${role} from the dropdown.`
        );

        localStorage.clear();
        return;
      }

      // Redirect based on role
      switch (role) {
        case "Admin":
          navigate("/admin");
          break;

        case "Staff":
          navigate("/staff");
          break;

        default:
          navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.detail ||
            err.response.data.non_field_errors?.[0] ||
            "Invalid username or password."
        );
      } else {
        setError("Server not reachable.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="font-medium">Username</label>

            <input
              className="w-full border rounded-lg p-2 mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-medium">Password</label>

            <input
              type="password"
              className="w-full border rounded-lg p-2 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-medium">
              Login As
            </label>

            <select
              className="w-full border rounded-lg p-2 mt-1"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option>User</option>
              <option>Staff</option>
              <option>Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}