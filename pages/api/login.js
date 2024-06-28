import jwt from "jsonwebtoken";

const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        "secret",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
