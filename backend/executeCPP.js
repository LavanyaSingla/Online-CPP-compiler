const { exec } = require('child_process');
const { error } = require('console');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}
const executeCPP = (filepath) => {

    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    const promise1 =  new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`,
            (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject({ stderr });
                resolve(stdout);
                // if (error) {
                //     reject({ error, stderr });
                // }
                // if (stderr) {
                //     reject({ stderr });
                // }
                // resolve(stdout);
            });
    });
    promise1.catch((error)=>{
        console.error(error);
    });
    return promise1;
};
module.exports = { executeCPP };