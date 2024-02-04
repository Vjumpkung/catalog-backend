import express from "express";
const router = express.Router();

router.get("/ping", async function (req, res, next) {
  /*
  #swagger.tags = ['/']
  #swagger.description = 'Ping and Pong'
  #swagger.responses[200] = {
    description: 'Hello World message',
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/IndexGetResponseDto'
        }
      }
    }
  }
  */
  res.json({ msg: "pong" });
});

export default router;
