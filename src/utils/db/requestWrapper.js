import { db, handleError } from "./pouchDB";


export const createError = (status = 404, message, goBack = false) => {
  return { message, status, goBack };
};

const checkSessionWrapper = request => async args => {
  const session = await db.getSession();
  if (session.ok && session.userCtx.name !== null) {
    return request(args);
  } else {
    throw new createError(401, "");
  }
};

const requestWrapper = request => async args => {
  try {
    return await checkSessionWrapper(request)(args);
    // return await request(args);
  } catch (err) {
    handleError(err);
  }
};

export default requestWrapper;
