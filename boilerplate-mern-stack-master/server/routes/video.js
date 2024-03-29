const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");



let storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,"uploads/");
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) =>{
        const ext = path.extname(file.originalname)
        if( ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({storage : storage}).single("file");

//=================================
//            Video
//=================================

router.post('/uploadfiles', (req, res) => {
    //서버에 비디오 저장
    upload(req, res, err => {
        if(err){
            return res.json({ success: false ,err})
        }
        return res.json({ success : true, url : res.req.file.path, fileName: res.req.file.filename})
    })
})

router.post('/thumbnail', (req, res) => {
    //썸네일 생성 , 비디오 러닝타임 가져오기
    let filePath = ""
    let fileDuration = ""

    ffmpeg.setFfmpegPath("C:\\Program Files\\ffmpeg\\ffmpeg-5.1.2-full_build-shared\\bin\\ffmpeg.exe");
    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    })

    //섬네일 생성
    ffmpeg(req.body.url)
    .on('filenames', function(filenames){
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames)

        filePath = "uploads/thumnails/" + filenames[0]
    })
    .on('end',function(){
        console.log('Screenshots taken');
        return res.json({ success: true ,url: filePath, fileName, filenamese, fileDuration: fileDuration})

    })
    .on('error', function(err){
        console.error(err);
        return res.json({ success : false ,err});
    })
    .screenshots({
        count : 3,
        folder : 'uploads/thumnails',
        size : '320x240',
        filename: 'thumnail-%b.png'
    })



    }
)

module.exports = router;
