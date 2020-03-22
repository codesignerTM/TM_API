import fs from "fs";
import path from "path";

class StreamsLogic {
  static readStreamTask(req) {
    let file = path.join(__dirname, "../data/dataset.xml");

    //flowing stream
    let readStream = fs.createReadStream(file);

    readStream.on("open", () => {
      console.log("Stream opened...");
    });

    readStream.pause("paused", () => {
      console.log("paused");
    });

    readStream.resume("resume", () => {
      console.log("resumed");
    });

    readStream.on("data", data => {
      console.log("---------------------------------");
      console.log(data);
      console.log("---------------------------------");
    });

    readStream.on("end", () => {
      console.log("Stream Closed...");
    });

    //non-flowing stream
    let readStreamNF = fs.createReadStream(file);

    setTimeout(() => {
      const data = readStreamNF.read(10);
      console.log("10 limit", data);
    }, 10);
  }

  static writeStreamTask(req) {
    let file = path.join(__dirname, "../data/writeHere.txt");

    let message = req.body.message;
    let person = req.body.person;

    const writeStream = fs.appendFile(file);

    writeStream.write(`person: ${person}\n`);
    writeStream.write(`message: ${message}\n`);

    writeStream.on("error", err => {
      console.log(err);
    });
  }

  static pipeStreams(req, res) {
    let file = path.join(__dirname, "../data/writeHere.txt");
    let readStream = fs.createReadStream(file);

    readStream.pipe(res);

    readStream.on("error", err => {
      console.log("Error in read stream...");
    });
    res.on("error", err => {
      console.log("Error in write stream...");
    });
    return JSON.stringify(res);
  }

  static appendToFile(req) {
    let file = path.join(__dirname, "../data/writeHere.txt");

    let message = req.body.message;
    let person = req.body.person;

    const writeStream = fs.appendFile(
      file,
      [`person: ${person}\n message: ${message}\n`],
      { encoding: "utf8" },
      () => {
        console.log("done");
      }
    );

    return file;
  }
}

export default StreamsLogic;
