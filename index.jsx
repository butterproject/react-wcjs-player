import React from 'react'
import WCJS from 'wcjs-renderer'

import {prettyTime, c, i18n} from './utils'

/* Components */
import ToolBar from './toolbar'
import {Playlist, Subtitles} from './centered-menu'

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
            <div className="wcp-titlebar"><span className="wcp-title">{this.props.title}</span></div>
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
        uiHideTimeMs: 2000
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

    componentDidMount() {
        this.player = WCJS.init(this.canvas.getDOMNode());

        /* listening to this breaks wcjs-renderer 
           this.player.onFrameSetup=(width, height, pixelFormat, videoFrame)=>{}
         */

        this.player.events.on("FrameSetup",
                              (width, height, pixelFormat, videoFrame) => {
                                  this.setState ({width: width, height: height})
                              })

            this.player.onPositionChanged = (pos) => {
                this.setState({position: pos})
            }

        this.player.onTimeChanged = (time) => {
            this.setState({time: time})
        }

        this.player.onMediaChanged = (media) => {
            console.error ('mediachanged, TODO');
        }

        this.player.onNothingSpecial = () => {
            console.error ('nothingspecial, TODO');
        }

        this.player.onOpening = () => {
            this.setState({buffering: 0, playing: false, paused: false})
        }

        this.player.onBuffering = (perc) => {
            if (perc === 100)
                return this.setState({buffering: false});
            return this.setState ({buffering: perc})
        }

        this.player.onPlaying = () => {
            this.setState({buffering: false, playing: true, paused: false})
        }

        this.player.onPaused = () => {
            this.setState({buffering: false, playing: false, paused: true})
        }

        this.player.onLengthChanged = (length) => {
            this.setState({length: length})
        }

        this.player.onStopped = () => {
            this.setState({buffering: false, playing: false, paused: false})
        }

        this.player.onEndReached = () => {
            this.stop()
        }

        this.player.onEncounteredError = (error) => {
            console.error (error);
            this.stop();
        }

        this.props.src && this.player.playlist.add(this.props.src)
        this.props.autoplay && this.player.play()
        this.player.subtitles.track = 0
        console.log (this.player.subtitles.track)
    }

    togglePause = () => {
        this.state.playing?this.pause():this.play();
    }

    toggleFullScreen = () => {
        var container = this.container.getDOMNode();

        let requestFullscreenFunctions = [
            'requestFullscreen',
            'webkitRequestFullscreen'
        ];

        let exitFullscreenFunctions = [
            'exitFullscreen',
            'cancelFullScreen',
            'webkitExitFullscreen',
            'webkitCancelFullScreen',
        ]

        if (! this.state.fullscreen) {
            requestFullscreenFunctions.map(fn => {
                if (container[fn])
                    container[fn]();
            })
        } else {
            exitFullscreenFunctions.map(fn => {
                if (window.document[fn])
                    window.document[fn]();
            })
        }

        this.setState({fullscreen: !this.state.fullscreen})
    }

    play = (mrl) => {
        this.player.playlist.play(mrl);
    }

    pause = () => {
        if (! this.state.playing) return;
        this.player.playlist.pause();
    }

    stop = () => {
        if (! this.state.playing || this.state.paused) return
        this.player.playlist.stop()
    }

    hover = () => {
        this.hoverTimeout && clearTimeout(this.hoverTimeout);

        this.state.uiShown || this.setState({uiShown: true});
        this.hoverTimeout = setTimeout(() => {
            this.setState({uiShown: false})
        }, this.props.uiHideTimeMs)
    }

    setTime = (t) => {
        this.player.time = t
    }

    toggleMute() {
        /* TODO */
    }


    playItem() {
        /* TODO */
    }

    next() {
        /* TODO */
    }

    prev() {
        /* TODO */
    }

    render() {
        return (
            <div id="video_player" width="100%" height="100%"
                 className="webchimeras" style={{
                         height: 300,
                         cursor: this.state.uiShown?'pointer':'none'
                     }}>
                <div id="webchimera" className={style.wrapper}
                     onMouseMove={this.hover}
                     style={{height: '100%' }}
                     ref={(c) => {this.container = c}}>
                    <div className={style.center} style={{overflow: 'hidden', width: 100 + '%'}}>
                        <canvas className={style.canvas}
                                width="1280" height="546"
                                style={{height: '100%', width: '100%'}}
                                ref={(c) => {this.canvas = c}}>
                        </canvas>
                    </div>
                    <div className={style.surface}
                         onClick={this.togglePause}></div>
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
                </div>
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
