import { Router } from 'express';
import { createWriteStream, writeFileSync } from 'fs';
const voice = require('google-translate-tts')
import { Readable } from 'stream';

const router = Router();

router.get('/tts', async (req, res) => {
    let text = req.query.text;
    let type = req.query.type;
    if (!text) return res.status(404).json({ msg: "Please Provide text Param" });
    if (!type) type = "stream";
    let start = Date.now();
    let buffer: Buffer = await voice.synthesize({
        text: String(text),
        voice: 'en'
    });
    if (type === 'stream') {
        res.header(
            "Content-Disposition",
            `attachment; filename="${encodeURI(String(text))}.mp3"`
        );
        bufferToStream(buffer).pipe(res)
    } else {
        let endtime = Date.now();
        let elapsed = endtime - start
        res.json({
            elapsedTimeinMS: elapsed,
            buffer: buffer
        })
    }
});

function bufferToStream(buffer: Buffer) {
    let read = new Readable();
    read.push(buffer)
    read.push(null);
    return read;
}

export default router;