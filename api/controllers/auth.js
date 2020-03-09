import authLogic from "../logics/authLogic";

const signUp = async (req, res) => {
  let response = await authLogic.signUp(req);
  res.json(response);
  return;
};

const logIn = async (req, res) => {
  let response = await authLogic.logIn(req);
  res.json(response);
  return;
};

const resetPassword = async (req, res) => {
  let response = await authLogic.resetPassword(req);
  res.json(response);
  return;
};

export default {
  signUp,
  logIn,
  resetPassword
};
