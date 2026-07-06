import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await API.get("profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile = response.data;

        // Redirect based on role
        if (profile.role === "Admin") {
          navigate("/admin");
          return;
        }

        if (profile.role === "Staff") {
          navigate("/staff");
          return;
        }

        setUser(profile);
      } catch (error) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

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
    } catch (error) {}

    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          User Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Welcome back, {user.username}
        </p>

        <div className="space-y-4">

          <div className="flex justify-between border-b pb-2">
            <strong>Username</strong>
            <span>{user.username}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <strong>Email</strong>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <strong>Role</strong>
            <span className="text-blue-600 font-semibold">
              {user.role}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <strong>Bio</strong>
            <span>{user.bio || "Not Added"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <strong>Location</strong>
            <span>{user.location || "Not Added"}</span>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">

          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            My Profile
          </button>

          <button
            onClick={() => navigate("/change-password")}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Change Password
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
          >
            Home
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}