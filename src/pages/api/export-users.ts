import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { User } from "@/types/user";

const filePath = path.join(process.cwd(), "public/api/users.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { format, searchTerm, selectedCompany } = req.body;

      if (!format || format !== "csv") {
        return res
          .status(400)
          .json({ error: "Invalid format. Only 'csv' is supported." });
      }

      const fileData = fs.readFileSync(filePath, "utf-8");
      const users = JSON.parse(fileData);

    
      const filteredUsers = users.filter((user: User) => {
        const matchesSearch = user.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCompany =
          selectedCompany === "All Companies" ||
          user.company.name === selectedCompany;
        return matchesSearch && matchesCompany;
      });

      
      const csvData = convertUsersToCSV(filteredUsers);

    
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=users.csv"
      );

      return res.status(200).send(csvData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function convertUsersToCSV(users: User[]) {
  const headers = [
    "id",
    "name",
    "username",
    "email",
    "address.street",
    "address.suite",
    "address.city",
    "address.zipcode",
    "address.geo.lat",
    "address.geo.lng",
    "phone",
    "website",
    "company.name",
  ].join(",");
  const rows = users
    .map((user) => {
      return [
        user.id,
        user.name,
        user.username,
        user.email,
        user.address.street,
        user.address.suite,
        user.address.city,
        user.address.zipcode,
        user.address.geo.lat,
        user.address.geo.lng,
        user.phone,
        user.website,
        user.company.name,
      ].join(",   ");
    })
    .join("\n");

  return `${headers}\n${rows}`;
}
