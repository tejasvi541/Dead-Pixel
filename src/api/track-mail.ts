import { Hono } from "hono";
import { getConnInfo } from "hono/bun";
import Track from "../model/track.model";
import { promises as fs } from "fs";
const app = new Hono();

let imageBuffer: Buffer;

(async () => {
  imageBuffer = await fs.readFile(__dirname + "../assets/dead.png");
})();

app.get("/track-mail/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "Id is required" }, 400);
  }
  const userIP =
    c.req.raw.headers.get("true-client-ip") ||
    c.req.raw.headers.get("cf-connecting-ip") ||
    getConnInfo(c).remote.address ||
    "0.0.0.0";
  if (!userIP) {
    return c.json({ error: "User IP is required" }, 400);
  }

  try {
    const track = await Track.findOne({ trackingId: id });
    if (!track) {
      return c.json({ error: "Invalid Tracking Id" }, 400);
    }

    if (!track.userIPs.includes(userIP)) {
      track.userIPs.push(userIP);
      track.opens++;
      await track.save();
    }

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "content-length": imageBuffer.length.toString(),
      },
    });
  } catch (error) {
    return c.json({ error: "Something went wrong failed to track" }, 500);
  }
});

export default app;
