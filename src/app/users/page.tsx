import UsersList from "@/components/UsersList/UsersList";
import { getUsers } from "@/features/api";
import { Suspense } from "react";

export const metadata = {
  title: "User List Page",
  description: "Show user list ",
};

async function Users() {
  const initialUsers = await getUsers();
  console.log("Server-side rendering:", {
    time: new Date().toISOString(),
    usersCount: initialUsers.length,
  });
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UsersList initialUsers={initialUsers} />
      </Suspense>
    </div>
  );
}

export default Users;
