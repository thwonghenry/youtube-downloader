const qs = require('query-string');
const fetch = require('isomorphic-fetch');

module.exports = async (videoId) => {
    const response = await fetch(`http://www.youtube.com/get_video_info?video_id=${videoId}`).then((res) => res.text());
    const params = qs.parse(response);
    const streamMap = params.url_encoded_fmt_stream_map;

    const videos = streamMap.split(',').map((stream) => qs.parse(stream));

    return videos;
};

