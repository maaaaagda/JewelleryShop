const express = require("express")
const path = require("path")
const port  = process.env.PORT || 8080;
const host = '0.0.0.0'

const server = express()

server.use(express.static(path.resolve(__dirname, './dist')));
server.all('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
})

server.listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }

  console.info('Server started');
});

module.exports = server;

