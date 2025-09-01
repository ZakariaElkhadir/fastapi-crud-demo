"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { User, Mail, FileText, Plus, X, Edit } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/users";

interface FormProps {
  onUserCreated?: () => void;
  onUserUpdated?: () => void;
  onClose?: () => void;
  editUser?: User | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  description?: string;
}

interface FormData {
  name: string;
  email: string;
  description: string;
}

const Form: React.FC<FormProps> = ({
  onUserCreated,
  onUserUpdated,
  onClose,
  editUser,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const isEditMode = !!editUser;

  useEffect(() => {
    if (editUser) {
      setFormData({
        name: editUser.name || "",
        email: editUser.email || "",
        description: editUser.description || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        description: "",
      });
    }
    setIsInitialized(true);
  }, [editUser?.id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      let response;

      if (isEditMode && editUser) {
        response = await axios.put(`${API_URL}/${editUser.id}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("User updated successfully:", response.data);

        if (onUserUpdated) {
          onUserUpdated();
        }
      } else {
        // Create new user
        response = await axios.post(API_URL, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("User created successfully:", response.data);

        if (onUserCreated) {
          onUserCreated();
        }
      }

      setSuccess(true);

      if (!isEditMode) {
        setFormData({
          name: "",
          email: "",
          description: "",
        });
      }

      setTimeout(() => {
        setSuccess(false);
        if (onClose) onClose();
      }, 2000);
    } catch (error: any) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} user:`,
        error,
      );
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError(
          `Failed to ${isEditMode ? "update" : "create"} user. Please try again.`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div
        className={`${
          isEditMode
            ? "bg-gradient-to-r from-blue-600 to-blue-700"
            : "bg-gradient-to-r from-green-600 to-green-700"
        } text-white px-6 py-4 flex justify-between items-center`}
      >
        <h2 className="text-xl font-semibold flex items-center">
          {isEditMode ? (
            <>
              <Edit className="w-5 h-5 mr-2" />
              Edit User
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 mr-2" />
              Create New User
            </>
          )}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Form */}
      <div className="p-6">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            User {isEditMode ? "updated" : "created"} successfully!
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <User className="w-4 h-4 inline mr-1" />
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                isEditMode ? "focus:ring-blue-500" : "focus:ring-green-500"
              } focus:border-transparent transition-colors`}
              placeholder="Enter user's full name"
              disabled={loading}
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <Mail className="w-4 h-4 inline mr-1" />
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                isEditMode ? "focus:ring-blue-500" : "focus:ring-green-500"
              } focus:border-transparent transition-colors`}
              placeholder="Enter user's email address"
              disabled={loading}
            />
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <FileText className="w-4 h-4 inline mr-1" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                isEditMode ? "focus:ring-blue-500" : "focus:ring-green-500"
              } focus:border-transparent transition-colors resize-none`}
              placeholder="Enter a description for the user (optional)"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              isEditMode
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            } disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isEditMode ? "Updating User..." : "Creating User..."}
              </>
            ) : (
              <>
                {isEditMode ? (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Update User
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create User
                  </>
                )}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
