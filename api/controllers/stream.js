import streamsLogic from "../logics/streamsLogic";

const readFile = async (req, res) => {
  let response = await streamsLogic.readStreamTask(req);
  res.json(response);
  return;
};

const writeFile = async (req, res) => {
  let response = await streamsLogic.writeStreamTask(req);
  res.json(response);
  return;
};

const pipeStreams = async (req, res) => {
  let response = await streamsLogic.pipeStreams(req, res);
  res.json(response);
  return;
};

const appendToFile = async (req, res) => {
  let response = await streamsLogic.appendToFile(req, res);
  res.json(response);
  return;
};

const readUploadedFile = async (req, res) => {
  let response = await streamsLogic.readUploadedFile(req, res);
  res.json(response);
  return;
};

const uploadFile = async (req, res) => {
  let response = await streamsLogic.uploadFile(req, res);
  res.json(response);
  return;
};

export default {
  readFile,
  writeFile,
  pipeStreams,
  appendToFile,
  readUploadedFile,
  uploadFile
};
