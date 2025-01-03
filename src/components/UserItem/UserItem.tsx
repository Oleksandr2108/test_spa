"use client";

import { User } from "@/types/user";
import Link from "next/link";
import { useDispatch} from "react-redux";
import { setUser } from "@/store/slices/usersSlice";

interface PropsUserItem {
  user: User;
}

const UserItem: React.FC<PropsUserItem> = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <tr key={user.id} className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900">{user.id}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900">{user.name}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-500">{user.email}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-500">{user.company.name}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm">
      <Link
        href={`/users/${user.id}`}
          className="text-blue-600 hover:text-blue-900"
          onClick={() => dispatch(setUser(user))}
      >
        View Details
      </Link>
    </td>
  </tr>
  );
};

export default UserItem;
