import exportLogic from "../logics/exportLogic";

const exportToGoogleSheet = async (req, res) => {
  let response = await exportLogic.exportToGoogleSheet(req);
  res.json(response);
  return;
};

const exportXls = async (req, res) => {
  let response = await exportLogic.exportXls(req);
  res.json(response);
  return;
};

export default {
  exportToGoogleSheet,
  exportXls
};
