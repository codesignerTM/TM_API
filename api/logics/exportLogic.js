import dataResponse from "../models/DataResponse";
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
          "https://www.googleapis.com/auth/drive.file"
        ]
      );

      client.authorize((err, token) => {
        if (err) {
          console.log("error during spreadsheet auth", err);
          return;
        } else {
          console.log(" auth successfull");
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
          console.log("cells updated", result.totalUpdatedCells);
        }
      }
    );
  }

  static async exportXls(req) {}
}

export default ExportLogic;
