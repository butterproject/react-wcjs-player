import React from 'react'

class DetailedInfo extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                downloadSpeed: 0,
                uploadSpeed: 0,
                downloaded: 0,
                uploaded: 0,
                activePeers: 0
            }
    }

    render() {
        <div className="download-info-player">
            <i className="fa fa-eye eye-info-player"></i>
            <div className="details-info-player">
                <div className="arrow-up"></div>
                <span className="speed-info-player">{ i18n.__('Download') }:&nbsp;</span><span className="download_speed_player value">{this.state.downloadSpeed}/s</span><br />
                <span className="speed-info-player">{ i18n.__('Upload') }:&nbsp;</span><span className="upload_speed_player value">{this.state.uploadSpeed}/s</span><br />
                <span className="speed-info-player">{this.state.activePeers}:&nbsp;</span><span className="active_peers_player value">0</span><br />
                <span className="speed-info-player">{this.sate.downloaded}:&nbsp;</span><span className="downloaded_player value">0</span>
            </div>
        </div>
    }
}

class Header extends React.Component {
    static defaultProps = {
        quality: '720p',
        title: 'No Title'
    }

    static propTypes = {
        quality: qualityPropType,
        title: React.PropTypes.string
    }

    render() {
        return (
            <div className="player-header-background vjs-control-bar">
                <div className="wcp-pause-anim wcp-center" style={{display: 'block'}}><i className="wcp-anim-basic wcp-anim-icon-pause" style={{fontSize: 80, padding: '7px 30px', borderRadius: 12}}></i></div>
                <i className="state-info-player fa fa-play"></i>
                <i className="state-info-player fa fa-pause"></i>
                <div className="player-title">{this.props.title}</div>
                <div className="details-player">
                    {this.props.quality?
                     <span className="quality-info-player">{this.props.quality}</span>:null
                    }
                     <DetailedInfo {...this.props} />
                     <span className="fa fa-times close-info-player"></span>
                </div>
            </div>
        )
    }
}

export class VerifyMetadata extends React.Component {
    render() {
        return (
            <div className="verify-metadata vjs-control-window">
                <div className="vm_poster">
                    <img className="verifmeta_poster" src="images/posterholder.png" />
                </div>
                <div className="vm_epinfo">
                    <p className="verifmeta_show"></p>
                    <p className="verifmeta_episode"></p>
                    <p className="verifmeta_number"></p>
                </div>
                <div className="vm_box">
                    <p className="verifmeta_boxtext">{ i18n.__('Currently watching') }</p>
                </div>
                <div className="vm_btns">
                    <div className="vm-btn verifmetaFALSE">{ i18n.__('No, it\'s not that') }</div>
                    <div className="vm-btn verifmetaTRUE">{ i18n.__('Correct') }</div>
                </div>
            </div>
        )
    }
}

class PlayingNext extends React.Component {
    render () {

        return (
            <div className="playing_next vjs-control-window">
                <div className="pn_poster">
                    <img className="playing_next_poster" src="images/posterholder.png" />
                </div>
                <div className="pn_epinfo">
                    <p className="playing_next_show"></p>
                    <p className="playing_next_episode"></p>
                    <p className="playing_next_number"></p>
                </div>
                <div className="pn_counter">
                    <p className="playing_next_countertext">{ i18n.__('Playing Next') }</p>
                    <p id="nextCountdown">60</p>
                </div>
                <div className="pn_btns">
                    <div className="auto-next-btn playnownextNOT">{ i18n.__('No thank you') }</div>
                    <div className="auto-next-btn playnownext">{ i18n.__('Play Now') }</div>
                </div>
            </div>
        )
    }
}
