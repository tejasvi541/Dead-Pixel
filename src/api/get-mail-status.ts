import { Hono } from "hono";
import Track from "../model/track.model";
const app = new Hono();

app.get("/get-mail-status/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "Id is required" }, 400);
  }

  try {
    const track = await Track.findOne({ trackingId: id });
    if (!track) {
      return c.json({ error: "Invalid Tracking Id" }, 400);
    }
    return c.json({ opens: track.opens, userIPs: track.userIPs });
  } catch (error) {
    return c.json({ error: "Something went wrong failed to track" }, 500);
  }
});

export default app;
