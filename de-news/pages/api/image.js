import formidable from "formidable";
import path from 'path';
import fs from 'fs/promises';


export const config = {
    api: {
        bodyParser: false,
    },
};

let filename = ''
const readFile = (req, saveLocally) => {
    const options = {};

    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), '/public/images');
        options.filename = (name, ext, path, form) => {
            return "deNews_" + path.originalFilename
        }
    }

    const form = formidable(options);

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {

            if (err) reject(err);
            resolve({ fields, files })
        })
    })
}

const handler = async (req, res) => {
    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/images"));
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/images"))
    }
    const { files } = await readFile(req, true);
    const filename = files.myImage.newFilename;
    res.json({
        done: "ok",
        path: filename
    });
};

export default handler