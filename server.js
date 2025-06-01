const jsonServer = require("json-server");
const crypto = require("crypto");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middleware = jsonServer.defaults();

server.use(middleware);
server.use(jsonServer.bodyParser);

function generateToken(email) {
  return crypto
    .createHash("sha256")
    .update(email + Date.now().toString())
    .digest("hex");
}

server.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    const token = generateToken(email);
    console.log(token);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

server.use((req, res, next) => {
  if (req.url === "/login") {
    return next();
  }
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid token" });
  }
  next();
});

const PORT = process.env.port || 3000;

server.use(router);

server.listen(PORT, (req, res) => {
  console.log("Server lsitnening in " + PORT);
});
