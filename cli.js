import getVideoInfo from './src/lib/getVideoInfo';

const videoID = process.argv[2];

(async() => {
    const videoInfo = await getVideoInfo(videoID);
    console.log(videoInfo);
})();
