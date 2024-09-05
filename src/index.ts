import { Hono } from "hono";
import { cors } from "hono/cors";
import { dbConnect } from "./config/db.config";
import trackMail from "./api/track-mail";
import sendMail from "./api/send-mail";
import getMailStatus from "./api/get-mail-status";
const app = new Hono();

// MiddleWares
app.use(cors());

// Database Connection
dbConnect();

app.get("/", (c) => {
  return c.text("Health OK");
});

// Routes
app.route("/api", trackMail);
app.route("/api", sendMail);
app.route("/api", getMailStatus);

export default app;
