"use client";
import { useUpdateUserMutation } from "@/store/services/usersApi";
import { User } from "@/types/user";
import { useState } from "react";
import { motion } from "framer-motion";
interface EditUserFormProps {
  user: User;
  onClose: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onClose }) => {
  const [formData, setFormData] = useState<User>(user);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser(formData).unwrap();

      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <motion.div
    initial={{
      y: "-100%", 
      scale: 0.8, 
      opacity: 0, 
    }}
    animate={{
      y: "0%", 
      scale: 1,
      opacity: 1, 
    }}
    exit={{
      y: "-100%", 
      scale: 0.8, 
      opacity: 0,
    }}
    transition={{
      duration: 0.7, 
      ease: "easeInOut", 
    }}
      className="absolute w-full h-full top-0 left-0 rounded-xl bg-sky-800  p-10"
    >
      

    <form
      onSubmit={handleSubmit}
      className="space-y-4  "
    >
      <div className="w-60">
        <label
          htmlFor="name"
          className="block text-sm font-medium"
        >
          Name
        </label>
        <input
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="w-60">
        <label
          htmlFor="username"
          className="block text-sm font-medium"
        >
          Username
        </label>
        <input
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div className="w-60">
        <label
          htmlFor="email"
          className="block text-sm font-medium"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="w-60">
        <label
          htmlFor="website"
          className="block text-sm font-medium"
        >
          Website
        </label>
        <input
          id="website"
          value={formData.website}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="w-60">
        <label
          htmlFor="phone"
          className="block text-sm font-medium"
        >
          Phone
        </label>
        <input
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
    </motion.div>
  );
};

export default EditUserForm;
