export async function getUsers() {
  try {
    // const response = await fetch("http://localhost:3000/api/users.json");
    const response = await fetch(
      "https://test-spa-lx5g.vercel.app/api/users.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
