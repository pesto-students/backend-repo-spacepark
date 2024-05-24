import { app } from ".server.js";

app.listen(process.env.PORT, () => {
  console.log("Server connected");
});
