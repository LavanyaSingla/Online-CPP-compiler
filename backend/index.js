const express = require("express");
const { generateFile } = require('./generateFile');
const { executeCPP } = require('./executeCPP');
const cors=require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
    return res.json({ hello: "World!" });
});

app.post("/run", async (req, res) => {

    const { language = "cpp", code } = req.body
    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body" });
    }
    try {
        const filepath = await generateFile(language, code);
        const output = await executeCPP(filepath);
        return res.json({ language, code, filepath, output });
    }
    catch (error) {
        res.status(500).json({ error });
    }

})
app.listen(5000, () => {
    console.log('Listening on port 5000');
});
