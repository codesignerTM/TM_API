import { CronJob } from "cron";
import taskLogic from "./taskLogic";

export default function() {
  if (process.env.ISDEVELOPER === "true") return;
  //run midnight && if prod
  new CronJob(
    "0 0 * * *",
    async function() {
      taskLogic.resetTaskStatus();
      return true;
    },
    null,
    true,
    "Europe/Budapest"
  );
}
