"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const CompanySection = () => {
  const user = useSelector((state: RootState) => state.users.user);
  if (!user) {
    return null;
  }

  return (
    <div className="rounded-lg p-3 bg-white">
      <h2 className="text-black text-lg">Company Information</h2>
      <div className="flex mt-4">
        <div>
          <h3 className="text-black text-base">Catch Phrase</h3>
          <p className="text-black text-sm">{user.company.catchPhrase}</p>
        </div>
      </div>
      <div className="flex mt-4">
        <div>
          <h3 className="text-black text-base">Business Strategy</h3>
          <p className="text-black text-sm">{user.company.bs}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanySection;
