import userLogic from "../logics/userLogic";

const createUser = async (req, res) => {
  let response = await userLogic.createUser(req);
  res.json(response);
  return;
};

const updateUser = async (req, res) => {
  let response = await userLogic.updateUser(req);
  res.json(response);
  return;
};

const listAllUsers = async (req, res) => {
  let response = await userLogic.listAllUsers(req);
  res.json(response);
  return;
};

const getUserInfo = async (req, res) => {
  let response = await userLogic.getUserInfo(req);
  res.json(response);
  return;
};

export default {
  createUser,
  updateUser,
  listAllUsers,
  getUserInfo
};
