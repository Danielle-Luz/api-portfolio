import { connection } from './database/database.config';
import { api } from "./app";

api.listen(3000, async () => {
  await connection.connect();
  
  console.log("API is listening D:");
});