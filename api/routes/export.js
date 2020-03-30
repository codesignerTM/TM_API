import exportController from "../controllers/export";

export default app => {
  app.get("/export/googlesheet", async function(req, res, next) {
    await exportController.exportToGoogleSheet(req, res);
  });

  app.get("/export/xls", async function(req, res, next) {
    await exportController.exportXls(req, res);
  });
};
