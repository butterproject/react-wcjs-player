import React from 'react'
import WCJS from 'wcjs-renderer'

import {prettyTime, c, i18n} from './utils'

/* Components */
import ToolBar from './toolbar'
import {Playlist, Subtitles} from './centered-menu'
import VideoSurface from './video'

import style from './css/general.module.css'
//import i18n from 'i18n'

var qualityPropType = React.PropTypes.oneOf([
    '480p', '720p', 'HD', 'FullHD', 'QHD'
]);


class TitleBar extends React.Component {
    static defaultProps = {title: "No title"}
    static propTypes = {title: React.PropTypes.string}

    render() {
        return (
            <div className="wcp-titlebar">
              <span className="wcp-title">
                {this.props.title}
              </span>
            </div>
        )
    }
}

class VideoPlayer extends React.Component {
    static defaultProps = {
        autoplay: true,
        title: 'No Title',
        playlist: [],
        subtitles: [],
        src: 'http://archive.org/download/CartoonClassics/Krazy_Kat_-_Keeping_Up_With_Krazy.mp4',
        uiHideTimeMs: 2000,
        width: 600,
        height: 400
    }

    static propTypes = {
        autoplay: React.PropTypes.bool,
        title: React.PropTypes.string,
        playlist: React.PropTypes.array,
        subtitles: React.PropTypes.array,
        src: React.PropTypes.string
    }

    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            paused: false,
            width: 0,
            height: 0,
            pixelFormat: null,
            videoFrame: null,
            position: 0,
            buffering: false,
            time: 0,
            fullscreen: false,
            uiShown: true
        }
    }

    shouldComponentUpdate(newProps, newState) {
        return (newState.time != this.state.time)
    }

    render() {
        return (
            <div id="video_player" width="100%" height="100%"
                 className="webchimeras" style={{
                         height: this.props.height,
                         width: this.props.width,
                         cursor: this.state.uiShown?'pointer':'none'
                     }}>
              <VideoSurface {...this.props}>
                    <Playlist  items={this.props.playlist} />
                    <Subtitles items={this.props.subtitles} />
                    <TitleBar title={this.props.title} />

                    <ToolBar  {...this.props} {...this.state}
			onPlayPause={this.togglePause}
			onToggleMaximize={this.toggleFullScreen}

			onSetTime={this.setTime}/>

                    {(this.state.buffering === false)?null:
                     <div className={style.status} style={{opacity: 1, display: "block"}}>Buffering {this.state.buffering}%</div>}

                     <div className={style.notification} style={{
                             fontSize: 31,
                             maxHeight: this.state.uiShown?100:0,
                             top: this.state.uiShown?10:-50
                         }}>
                         notification
                     </div>
                     <div className={style.subtitleText} style={{fontSize: 31}}> Hey ! this is a subtitle</div>
                </VideoSurface>
            </div>
        )
    }
}

export default class Player extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                playing: false,
                paused: false
            }
    }

    static defaultProps = {
        quality: '720p',
        title: 'No Title',
        playlist: [],
        subtitles: [],
        src: 'rtmp://video1.earthcam.com:1935/earthcamtv/Stream1'
    }

    render() {
        return (
            <div>
                <div className="trailer_mouse_catch"></div>
                {/*
                <VerifyMetadata />
                <PlayingNext />
                */}
                <VideoPlayer {...this.props} />
                {this.state.playing?
                 <i className="state-info-player fa fa-play"></i>:null}
                 {this.state.paused?
                  <i className="state-info-player fa fa-pause"></i>:null}
            </div>
        )
    }
}
