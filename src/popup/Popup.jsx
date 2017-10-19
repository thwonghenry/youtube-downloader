import React, { PureComponent } from 'react';
import getVideoInfo from '../lib/getVideoInfo';
import qs from 'query-string';
import url from 'url';

class Popup extends PureComponent {
    constructor() {
        super();
        this.state = {
            loading: true,
            videoInfo: undefined,
            queries: false
        };
    }

    componentDidMount() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            const tab = tabs[0];
            const currentUrl = tab.url;
            if (!/^https?:\/\/.*\.youtube\..*/.test(currentUrl)) {
                this.setState({
                    loading: false
                });
                return;
            }
            const queries = qs.parse(url.parse(currentUrl).query);
            const videoId = queries.v;
            if (!videoId) {
                this.setState({
                    loading: false
                });
                return;
            }
            getVideoInfo(videoId).then((videoInfo) => this.setState({
                loading: false,
                videoInfo
            }));
        });
    }

    renderDownloadLinks() {
        const { videoInfo: { title, videos = [] } } = this.state;
        return videos.map((link, index) => {
            return [
                <a key={ index } href={ link.url } download={ title }>{ link.quality } { link.type } </a>,
                <br key={ index + 'b' } />,
                <br key={ index + 'c' } />
            ];
        });
    }

    render() {
        const { loading, videoInfo } = this.state;
        return <div>
            {
                loading && <p>Loading... </p>
            }
            {
                !loading && videoInfo && this.renderDownloadLinks()
            }
            {
                !loading && !videoInfo && <p>Not supported</p>
            }
        </div>;
    }
}

export default Popup;