import React from 'react';
import WCJS from 'wcjs-renderer';

import PlayStore from './stores';

import style from './css/general.module.css'

export default class VideoSurface extends React.Component {
    constructor(props) {
        super(props);
        this.state = PlayStore.getState();
    }

    componentWillUnmount() {
        /* TODO destroy WCJS */

        PlayStore.unlisten(this.onChange);
    }

    componentDidMount() {
        PlayStore.listen(this.onChange);

        console.error (this.canvas);
        this.player = WCJS.init(this.canvas);

        /* listening to this breaks wcjs-renderer 
           this.player.onFrameSetup=(width, height, pixelFormat, videoFrame)=>{}
         */

        this.player.events.on("FrameSetup",
                              (width, height, pixelFormat, videoFrame) => {
                                  this.setState ({width: width, height: height})
                              });

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
            console.log ('playing')
                this.setState({buffering: false, playing: true, paused: false})
        }

        this.player.onPaused = () => {
            console.log ('paused')
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
        console.error (this.container)
            var container = this.container;

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
        console.log ('play', this.state, this.player, this.player.playlist)
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

    onChange(state) {
        console.error ('new state', state)
    }

    render() {
        return (
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
                {this.props.children}
            </div>
        )
    }
}
