const db = require("../src/config/db");

(async () => {
  try {
    const result = await db.raw("select 1 as test");
    console.log("Connected:", result.rows);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();