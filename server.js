const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.static("."));

app.get("/callback", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
    console.log(`Melo sitesi http://127.0.0.1:${PORT} adresinde çalışıyor`);
});