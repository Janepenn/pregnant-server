import PouchDB from "pouchdb";
import "whatwg-fetch";

const COUCH_DB_URL = process.env.REACT_APP_COUCH_DB_URL;

const PREGNANT_DB = "pregnant";

export const pregnantDB = new PouchDB(COUCH_DB_URL + "/" + PREGNANT_DB);

export const db = new PouchDB(COUCH_DB_URL, { skip_setup: true });

export const handleError = err => {
  console.log("pouch DB fetch err: ", err);
  if (err.status === 403 && err.error === "forbidden") {
    const error = { ...err, goBack: true };
    throw error;
  } else if (
    err.status === 400 &&
    err.reason === "Malformed AuthSession cookie. Please clear your cookies."
  ) {
    const error = { status: 401, message: err.reason };
    throw error;
  } else if (err.status === 404) {
    const error = { status: 404, message: err.error || err.name || "" };
    throw error;
  } else if (err.error === "unauthorized") {
    const error = { message: err.reason };
    throw error;
  } else if (err.status === 409) {
    throw err;
  }
};
