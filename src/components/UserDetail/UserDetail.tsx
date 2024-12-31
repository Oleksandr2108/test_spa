"use client";

import { User } from "@/types/user";

interface UserDetailProps {
  user: User | undefined;
}

const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
};

export default UserDetail;
