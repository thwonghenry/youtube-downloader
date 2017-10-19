import qs from 'query-string';
import fetch from 'isomorphic-fetch';

export default async (videoId) => {
    const response = await fetch(`https://www.youtube.com/get_video_info?video_id=${videoId}`).then((res) => res.text());
    const params = qs.parse(response);
    const streamMap = params.url_encoded_fmt_stream_map;

    const videos = streamMap.split(',').map((stream) => qs.parse(stream));

    return {
        title: params.title,
        videos
    };
};

