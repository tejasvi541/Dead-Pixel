import { Hono } from "hono";
const app = new Hono();
import { v4 as uuid } from "uuid";
import Track from "../model/track.model";

app.post("/send-mail", async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: "Email and password are required" }, 400);
  }

  if (password !== process.env.PASSWORD) {
    return c.json({ error: "Invalid password" }, 400);
  }

  const trackingId = uuid();

  try {
    await Track.create({ trackingId });
    // Now Have to Send Email
  } catch (error) {}
});

export default app;
