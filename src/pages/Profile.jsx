import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    bio: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
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

        setProfile(response.data);

        setFormData({
          bio: response.data.bio || "",
          location: response.data.location || "",
        });
      } catch (err) {
        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await API.patch(
        "profile/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setProfile(response.data);
      setEditing(false);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage("Unable to update profile.");
    }
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

      <div className="bg-white shadow-xl rounded-xl w-full max-w-xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        {message && (
          <div className="mb-5 bg-green-100 text-green-700 p-3 rounded">
            {message}
          </div>
        )}

        <div className="space-y-4">

          <div>
            <label className="font-semibold">Username</label>
            <p>{profile.username}</p>
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <p>{profile.email}</p>
          </div>

          <div>
            <label className="font-semibold">Role</label>
            <p>{profile.role}</p>
          </div>

          {!editing ? (
            <>
              <div>
                <label className="font-semibold">Bio</label>
                <p>{profile.bio || "No bio added."}</p>
              </div>

              <div>
                <label className="font-semibold">Location</label>
                <p>{profile.location || "No location added."}</p>
              </div>

              <button
                onClick={() => setEditing(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">

              <div>
                <label className="font-semibold">
                  Bio
                </label>

                <textarea
                  rows="4"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bio: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="font-semibold">
                  Location
                </label>

                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      bio: profile.bio || "",
                      location: profile.location || "",
                    });
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg"
                >
                  Cancel
                </button>

              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}