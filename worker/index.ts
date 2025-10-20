import { Hono } from "hono";
import { env } from 'hono/adapter'

interface Env {

}


const app = new Hono<{ Bindings: Env }>();


app.get("/api/", (c) => {
  return c.json({ name: "Cloudflare" })

});

export default app;
