import express from "express";
import serversConfig from "./loadServers.json" assert { type: "json" };

const createServer = (host, port, timeout) => {
  const app = express();
  app.use((req, res) => {
    setTimeout(()=>{
      res.status(200).send(`Server is getting response from ${port}\n`);
    }, timeout)
  });
  app.listen(port, host, () => {
    console.log(`Server running on http:${host}:${port}`);
  });
};

serversConfig.servers.map((server) => {
  createServer(server.host, server.port, server.timeout);
});
