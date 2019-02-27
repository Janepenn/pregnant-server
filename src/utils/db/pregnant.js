import { pregnantDB } from "./pouchDB";
import readXlsxFile from "read-excel-file";

export const pushPreganntData = async () => {
  let data = [];
  try {
    readXlsxFile("./excel/wl.xslx").then(rows => {
      console.log("=============", rows);
    });
  } catch (err) {
    console.log(err);
  }
};
