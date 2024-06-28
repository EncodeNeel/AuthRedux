import jwt from "jsonwebtoken";

const users = [
  { id: 1, username: "user1" },
  { id: 2, username: "user2" },
];

export default function handler(req, res) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secret");
    const user = users.find((user) => user.id === decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}
