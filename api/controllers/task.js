import taskLogic from "../logics/taskLogic";

const createTask = async (req, res) => {
  let response = await taskLogic.createTask(req);
  res.json(response);
  return;
};

const updateTask = async (req, res) => {
  let response = await taskLogic.updateTask(req);
  res.json(response);
  return;
};

const deleteTask = async (req, res) => {
  let response = await taskLogic.deleteTask(req);
  res.json(response);
  return;
};

const getTask = async (req, res) => {
  let response = await taskLogic.getTask(req);
  res.json(response);
  return;
};

const getAllTask = async (req, res) => {
  let response = await taskLogic.getAllTask(req);
  res.json(response);
  return;
};

export default {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getAllTask
};
