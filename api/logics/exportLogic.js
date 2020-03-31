import dataResponse from "../models/DataResponse";
import RandomCharGenerator from "../helpers/RandomCharGen";
import fs from "fs";
import path from "path";
import User from "../models/CreatedUser";
import xlsx from "xlsx";
import { google } from "googleapis";
import keys from "../../GS_Credentials.json";

class ExportLogic {
  static async exportToGoogleSheet(req) {
    try {
      const client = new google.auth.JWT(
        keys.client_email,
        null,
        keys.private_key,
        [
          "https://www.googleapis.com/auth/spreadsheets",
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/drive.metadata"
        ]
      );

      client.authorize((err, token) => {
        if (err) {
          console.log("error during spreadsheet auth", err);
          return;
        } else {
          this.writeToSpeadSheet(client);
        }
      });
    } catch (error) {
      console.log(error, "error during exporting to googlesheet");
      return new dataResponse(
        dataResponse.dataResponseType.FAILED,
        "error during exporting to googlesheet"
      );
    }
  }

  static writeToSpeadSheet(client) {
    const gsApi = google.sheets({
      version: "v4",
      auth: client
    });

    let dataArray = [
      ["firstName", "lastName", "location", "phoneNumber", "id", "hobby"],
      ["Thomas", "Field", "Budapest", "123456", "123456", "coding"]
    ];

    let data = [
      {
        range: "Data!A1",
        values: dataArray
      }
    ];

    let resource = {
      data: data,
      valueInputOption: "USER_ENTERED"
    };

    let spreadsheetId = "1hLOFrUSa4d2BphUCXqOdAtKeyE2VFEEfQd3rv8h2DVA";

    let updatedSpreadSheet = gsApi.spreadsheets.values.batchUpdate(
      {
        spreadsheetId,
        resource
      },
      (err, result) => {
        if (err) {
          console.log("err", err);
        } else {
          console.log("cells updated", result.data.totalUpdatedCells);
          this.downloadSpreadSheet(spreadsheetId, client);
          this.readSpreadSheet(spreadsheetId, client);
        }
      }
    );
  }

  static async downloadSpreadSheet(spreadsheetId, client) {
    const gsApiV3 = google.drive({
      version: "v3",
      client: client
    });

    let fileName = await RandomCharGenerator.RandomCharGenerator(5);
    let filePath = path.join(__dirname + "../../exports/" + fileName + ".xls");
    //let filePath = process.env.TEMP_LIB + "/" + fileName;
    let writeStream = fs.createWriteStream(filePath);

    let fileToExport = await gsApiV3.files.export(
      {
        fileId: "1RghNnjdE1dUrGb9Pi2W1fZe-4I-DfO7bQjLmhy3Jyfk",
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      },
      {
        responseType: "stream"
      },
      (err, res) => {
        if (err) {
          console.log("error", err);
          return;
        } else {
          console.log("res", res);
          res.pipe(writeStream);
        }
      }
      /*  {
        responseType: "stream"
      },
      (err, response) => {
        if (err) {
          console.log("error", err);
          return;
        }
        console.log("responses", response);
        response.data
          .on("error", err => {
            console.log("err", err);
          })
          .on("end", () => {
            console.log("end");
          })
          .pipe(writeStream);
      } */
    );
  }

  static async readSpreadSheet(spreadsheetId, client) {
    const gsApi = google.sheets({
      version: "v4",
      auth: client
    });

    const option = {
      spreadsheetId: spreadsheetId,
      range: "Data!A1:G3"
    };

    //getting data from the spreadsheet
    let data = await gsApi.spreadsheets.values.get(option);
    let dataArray = data.data.values;
    console.log("dataArray", dataArray);

    //handelning blank cells
    /*   let processedDataArray = dataArray.map(data => {
      data.push(data[0] + " - " + data[1]);
      return data;
    }); */
    let newData = [
      ["Bell", "Ms", "Los Angeles", "123456", "123456", "Ring bell"]
    ];

    let newDataArray = dataArray.concat(newData);
    console.log("newDataArray", newDataArray);

    //update spreadsheet
    const writeOption = {
      spreadsheetId: spreadsheetId,
      range: "Data!A1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: newDataArray
      }
    };

    let updatedSpreadSheet = await gsApi.spreadsheets.values.update(
      writeOption
    );
  }

  static async exportXls(req) {}
}

export default ExportLogic;
