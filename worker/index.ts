import { Hono } from "hono";

interface Env {
  PAGE_LIKE_COUNT: KVNamespace;
}


const app = new Hono<{ Bindings: Env }>();


app.post("/api/like", async (c) => {
  console.log("Like API called");

  const { postId, liked } = await c.req.json();
  if (postId == null || liked == null) {
    return c.json({ postId, liked, msg:"Invalid data" });
  }

  const likeCount = await c.env.PAGE_LIKE_COUNT.get(postId);

  if (likeCount == null) {
    if (liked) {
      await c.env.PAGE_LIKE_COUNT.put(postId, 1);
    }
  } else {
    if (liked) {
      await c.env.PAGE_LIKE_COUNT.put(postId, parseInt(likeCount) + 1);
    } else {
      await c.env.PAGE_LIKE_COUNT.put(postId, parseInt(likeCount) - 1);
    }
  }

  
  return c.json({ postId, liked, msg:"Thank you" });

});

// app.get("/api/like/:postId", async (c) => {
//   const postId = c.req.param("postId");
//   const likeCount = await c.env.PAGE_LIKE_COUNT.get(postId);
//   return c.json({ postId, likeCount });
// });


export default app;
