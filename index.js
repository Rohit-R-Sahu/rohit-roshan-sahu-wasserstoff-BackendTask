import express from "express";
import roundRobinAlgo from "./roundRobinAlgo.js";
import serversConfig from "./loadServers.json" assert { type: "json" };
import leastConnectionAlgo from "./leastConnectionAlgo.js";

const servers = serversConfig.servers.map((s) => ({
  ...s,
  connection: 0,
}));

// const loadBalancingAlgo = "leastConnectionAlgo";
const loadBalancingAlgo = "roundRobinAlgo";

const server = express();

server.use((req, res) => {
  if (loadBalancingAlgo === "roundRobinAlgo") {
    roundRobinAlgo(servers, req, res);
  } else if (loadBalancingAlgo === "leastConnectionAlgo") {
    leastConnectionAlgo(servers, req, res);
  } else {
    res.status(500).send("Load balancing failed");
  }
});

server.listen(42069, () => {
  console.log("Load Balancer is running on  port 42069");
});
