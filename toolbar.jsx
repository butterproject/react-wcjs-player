import React from 'react'
import ProgressBar from './progressbar'

import style from './css/general.module.css'

import {prettyTime, c, i18n} from './utils'

export class PlayPauseButton extends React.Component {
    static propTypes = {
        paused: React.PropTypes.bool,
        playing: React.PropTypes.bool
    }

    render() {
        let className = (this.props.paused)?style.play:
                        (this.props.playing)?style.pause:
                        style.play;

        return <div className={className} onClick={this.props.onPlayPause}></div>
    }
}

export class TimeIndicator extends React.Component {
    render() {
        return (
            <div className={style.time}>
                <span className={style.timeCurrent}>
                    {prettyTime(this.props.time)}
                </span>
                {
                    this.props.length &&
                    <span className={style.timeTotal}>/{prettyTime(this.props.length)}</span>
                }
            </div>
        )
    }
}


export class RightButton extends React.Component {
    render() {
        return (
            <div className={c(style, ['button', 'right', this.props.className])}
                 onClick={this.props.onClick}>
            </div>
        )
    }
}

export class ToggleMaximizeButton extends React.Component {
    render() {
        let icon = (this.props.fullscreen)?'minimize':'maximize'
        return (
            <RightButton className={icon}
                         onClick={this.props.onToggleMaximize} />
        )
    }
}

export class PlaylistButton extends React.Component {
    render() {
        return (
            <RightButton  className='playlistButton' />
        )
    }
}

export class SubtitleButton extends React.Component {
    render() {
        return (
            <RightButton className='subtitleButton' />
        )
    }
}

export class VolumeButton extends React.Component {
    render() {
        return (
            <span>
                <div className={c(style, ['button', 'right', 'volButton', 'mute'])}></div>
                <div className={c(style, ['volControl', 'right'])}>
                    <div className={style.volBar}>
                        <div className={style.volBarFull} style={{width: 0}}></div>
                        <div className={style.volBarPointer}></div>
                    </div>
                </div>
            </span>
        )
    }
}

export class ToolBarButtons extends React.Component {
    render() {
        return (
            <div style={{marginTop: this.props.length?8:0}}>
                {
                    this.props.buttons.prev &&
                    <div {...this.props}
         className={style.prev}></div>
                }
                    {this.props.buttons.play &&
                     <PlayPauseButton {...this.props}/>}
                     {
                         this.props.buttons.next &&
                         <div {...this.props}
         className={style.next}></div>
                     }
                         <TimeIndicator time={this.props.time} length={this.props.length}/>
                         <ToggleMaximizeButton {...this.props}/>
                         <VolumeButton />
                         <PlaylistButton />
                         <SubtitleButton />
            </div>
        )
    }
}

export default class ToolBar extends React.Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        buttons: {
            play: true
        },
        totalTime: 0
    }

    render() {
        return (
            <div className={style.toolbar} style={{
                    display: "block",
                    opacity: this.props.uiShown?1:0.5,
                    height: this.props.length?38:30,
                    maxHeight: this.props.uiShown?100:0
                }}>
                {this.props.length && <ProgressBar {...this.props} />}
                <ToolBarButtons {...this.props} />
            </div>
        )
    }
}
