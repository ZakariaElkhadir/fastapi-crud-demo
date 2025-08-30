"use client";
import axios from "axios";
import Form from "../components/Form";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/users";

const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Data fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

interface User {
  id: number;
  name: string;
  email: string;
  description?: string;
}

export default function Home() {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleUserCreated = async () => {
    const result = await fetchData();
    if (result) {
      setData(result);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log(`User with ID ${id} deleted successfully`);

      const result = await fetchData();
      if (result) {
        setData(result);
      }
    } catch (error) {
      console.error(`Failed to delete user with ID ${id}:`, error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      const result = await fetchData();
      if (result) {
        setData(result);
      } else {
        setError(
          "Failed to fetch data. Make sure your FastAPI backend is running on http://127.0.0.1:8000"
        );
      }
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div suppressHydrationWarning={true}>
      <main className="flex flex-col items-center justify-start pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Hi! Zakaria
          </h1>
          <p className="text-xl md:text-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text font-medium">
            Let&apos;s manage your users
          </p>
        </div>

        {loading && (
          <div className="text-lg text-gray-600 animate-pulse">
            Loading users...
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 max-w-lg text-center">
            {error}
          </div>
        )}

        <section className="w-full max-w-4xl bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Manage Users</h2>
            <button
              onClick={handleShowForm}
              className="bg-green-500 hover:bg-green-600 transition-colors duration-200 p-2 rounded-lg shadow-md flex items-center justify-center group"
            >
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          <div className="p-6">
            {data ? (
              <div className="grid grid-cols-1  gap-6">
                {Array.isArray(data) ? (
                  data.map((user, index: number) => (
                    <div
                      key={user.id || index}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name
                            ? user.name.charAt(0).toUpperCase()
                            : user.email
                            ? user.email.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {user.name || "No Name"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {user.email || "No Email"}
                          </p>
                          <p>{user.description || "No Description"}</p>
                        </div>
                      </div>
                      {user.id && (
                        <p className="text-xs text-gray-500 mb-2">
                          ID: {user.id}
                        </p>
                      )}

                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit User
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                      >
                        Delete User
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full">
                    <p className="text-gray-500 text-center py-4">
                      Invalid user data format
                    </p>
                  </div>
                )}
              </div>
            ) : (
              !loading &&
              !error && (
                <p className="text-gray-500 text-center py-8">
                  No user data available
                </p>
              )
            )}
          </div>
        </section>
        {/* Modal Form Overlay */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-md">
              <Form
                onUserCreated={handleUserCreated}
                onClose={handleCloseForm}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
