import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", () => {
    https.get(process.env.API_URL, (res) => {
        if (res.statusCode == 200) {
            console.log("GET request sent successfully");
        } else {
            console.error("GET request failed", res.statusCode);
        }
    }).on(
        "error", (err) => {
            console.error("Error while sending request", err);
        }
    )
})

export default job