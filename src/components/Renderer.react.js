﻿import React from 'react';
import path from 'path';
import wcjsRenderer from 'wcjs-renderer';

import PlayerActions from '../actions';
import PlayerStore from '../store';

export
default React.createClass({
    getInitialState() {
        return {
            uri: PlayerStore.getState().uri,

            playing: false,
            paused: false,
            position: 0,
            buffering: false,
            time: 0,
            fullscreen: false
        }
    },
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.initPlayer();
    },
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },

    initPlayer() {
        PlayerActions.wcjsInit(wcjsRenderer.init(this.refs['wcjs-render'], [
            "--no-media-library",
            "--no-sub-autodetect-file",
            "--no-spu",
            "--no-stats",
            "--no-osd",
            "--network-caching", "3500",
            "--file-caching", "3000",
            "--no-skip-frames",
            "--no-video-title-show",
            "--disable-screensaver",
            "--no-autoscale",
            "--ipv4-timeout=86400000"
        ]));

        this.player = PlayerStore.getState().wcjs;

        this.player.onPositionChanged = (pos) => {
            this.setState({
                position: pos
            })
        }

        this.player.onTimeChanged = (time) => {
            this.setState({
                time: time
            })
        }

        this.player.onOpening = () => {
            this.setState({
                buffering: 0,
                playing: false,
                paused: false
            })
        }

        this.player.onBuffering = (perc) => {
            if (perc === 100)
                return this.setState({
                    buffering: false
                });
            return this.setState({
                buffering: perc
            })
        }

        this.player.onPlaying = () => {
            this.setState({
                buffering: false,
                playing: true,
                paused: false
            })
        }

        this.player.onPaused = () => {
            this.setState({
                buffering: false,
                playing: false,
                paused: true
            })
        }

        this.player.onStopped = () => {
            this.setState({
                buffering: false,
                playing: false,
                paused: false
            })
        }

        this.player.onEndReached = () => {
            this.player.stop();
        }

        this.player.onEncounteredError = (error) => {
            console.error(error);
            this.player.stop();
        }

        this.player.playlist.add(this.state.uri)
        this.player.play()
        this.player.subtitles.track = 0;
    },
    handleResize() {
        var canvas = this.refs['wcjs-render'];
        var container = document.body;
        var sourceAspect = canvas.width / canvas.height;
        var destAspect = container.clientWidth / container.clientHeight;
        var cond = destAspect > sourceAspect;

        if (cond) {
            canvas.style.height = "100%";
            canvas.style.width = ((container.clientHeight * sourceAspect) / container.clientWidth) * 100 + "%";
        } else {
            canvas.style.height = ((container.clientWidth / sourceAspect) / container.clientHeight) * 100 + "%";
            canvas.style.width = "100%";
        };
    },
    handleTogglePlay() {
        if (!this.state.buffering)
            this.player.togglePause(this.state.playing ? false : true);
    },
    render() {
        return (
            <div>
               <canvas onClick={this.handleTogglePlay} ref="wcjs-render"/>
            </div>
        );
    }
});
