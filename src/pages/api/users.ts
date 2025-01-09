import { User } from "@/types/user";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const filePath = path.join(process.cwd(), "public/api/users.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      const updatedUser = req.body;
      const fileData = fs.readFileSync(filePath, "utf-8");
      const users = JSON.parse(fileData);

      const userIndex = users.findIndex(
        (user: User) => user.id === updatedUser.id
      );
      if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
      }

      users[userIndex] = { ...users[userIndex], ...updatedUser };

      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

      return res
        .status(200)
        .json({ message: "User updated successfully", user: users[userIndex] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
