import streamController from "../controllers/stream";

export default app => {
  app.post("/read", async function(req, res, next) {
    await streamController.readFile(req, res);
  });

  app.post("/write", async function(req, res, next) {
    await streamController.writeFile(req, res);
  });

  app.post("/pipe", async function(req, res, next) {
    await streamController.pipeStreams(req, res);
  });

  app.post("/append", async function(req, res, next) {
    await streamController.appendToFile(req, res);
  });
};
