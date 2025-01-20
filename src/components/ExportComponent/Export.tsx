"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useExportUsersMutation } from "@/store/services/usersApi";
import { RootState } from "@/store/store";

const ExportUsersButton: React.FC = () => {
  const { searchTerm, selectedCompany } = useSelector(
    (state: RootState) => state.users
  );
  const [exportUsers, { isLoading }] = useExportUsersMutation();
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      const blob = await exportUsers({ searchTerm, selectedCompany }).unwrap();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "filtered_users.csv";
      link.click();
    } catch (err) {
      setError("Failed to export users.");
      console.error("Error exporting users:", err);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="p-2 rounded-xl bg-blue-200 hover:bg-blue-300"
      >
        {isLoading ? "Exporting..." : "Export to CSV"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ExportUsersButton;
