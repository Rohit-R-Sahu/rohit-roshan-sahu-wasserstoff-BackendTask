import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({});

const leastConnectionAlgo = (servers, req, res) => {
  servers.sort((a, b) => a.connection - b.connection);
  const target = servers[0];
  target.connection++;
  console.log(target);

  proxy.web(req, res, { target: `http://${target.host}:${target.port}` });

  res.on("finish", () => {
    target.connection--;
  });
};

export default leastConnectionAlgo;
