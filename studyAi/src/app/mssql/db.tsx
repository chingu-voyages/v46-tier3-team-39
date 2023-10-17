// db.js
import sql from "mssql";

// connection configs
const config = {
  user: "studyai_admin",
  password: "V46team39",
  server: "studyai-server.database.windows.net",
  database: "StudyAI",
  // port: 1433,
  options: {
    // instancename: "SQLEXPRESS",
    trustedconnection: true,
    trustServerCertificate: true,
  },
};

export default async function ExecuteQuery(query: any) {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query(query);
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}
