"use client";
import { useUpdateUserMutation } from "@/store/services/usersApi";
import { User } from "@/types/user";
import { useState } from "react";

interface EditUserFormProps {
  user: User;
  onClose: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name,
  });

  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser({ id: user.id, ...formData }).unwrap();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg p-5 shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Edit user</h2>
      <div className="mb-3">
        <label
          htmlFor="name"
          className="block text-sm font-medium"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        disabled={isLoading}
      >
        Save
      </button>
      {isError && <p className="text-red-500 mt-2">Error</p>}
    </form>
  );
};

export default EditUserForm;
