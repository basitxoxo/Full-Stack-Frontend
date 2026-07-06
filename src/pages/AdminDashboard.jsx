import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
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

        if (response.data.role !== "Admin") {
          navigate("/unauthorized");
          return;
        }

        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
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
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

          <h1 className="text-4xl font-bold text-red-600">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome back, {user.username}
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">
              Manage Users
            </h2>

            <p className="text-gray-500 mb-4">
              View, edit and delete users.
            </p>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Open
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">
              Manage Passwords
            </h2>

            <p className="text-gray-500 mb-4">
              Change user passwords.
            </p>
            
            <button
              onClick={() => navigate("/change-password")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
              Change Password
                </button>
            </div>
           
           
            <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">
              Change User Password
            </h2>

            

              <button
            onClick={() => navigate("/admin/change-password")}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
            >
            Click me
            </button>

            </div>
            
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">
              System Statistics
            </h2>

            <p className="text-gray-500 mb-4">
              Monitor users and activity.
            </p>

            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
            >
              View
            </button>
          </div>

        </div>

        <div className="mt-10 bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-5">
            Admin Information
          </h2>

          <div className="space-y-3">

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
              <span className="font-semibold text-red-600">
                {user.role}
              </span>
            </div>

          </div>

        </div>

        <div className="mt-8 flex gap-4">

          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
          >
            Home
          </button>

          <button
            onClick={logout}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}