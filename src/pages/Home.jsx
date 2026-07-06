import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await API.get("profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const goToDashboard = () => {
    if (!user) return;

    switch (user.role) {
      case "Admin":
        navigate("/admin");
        break;

      case "Staff":
        navigate("/staff");
        break;

      default:
        navigate("/dashboard");
    }
  };

  const logout = async () => {
    try {
      await API.post(
        "logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (err) {}

    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-lg p-8">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-3">
          Authentication System
        </h1>

        {!user ? (
          <>
            <p className="text-center text-gray-700 mb-6">
              Welcome! login or create an account.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
              >
                Register
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="border rounded-lg p-5 bg-gray-50 space-y-3">

              <div className="flex justify-between">
                <strong>Username</strong>
                <span>{user.username}</span>
              </div>

              <div className="flex justify-between">
                <strong>Email</strong>
                <span>{user.email}</span>
              </div>

              <div className="flex justify-between">
                <strong>Role</strong>
                <span>{user.role}</span>
              </div>

            </div>

            <div className="mt-6 flex flex-col gap-3">

              <button
                onClick={goToDashboard}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              >
                Go to Dashboard
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
              >
                Profile
              </button>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
              >
                Logout
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}