import React, {PropTypes} from 'react'

import {prettyTime} from './utils'

import ToolTip from './tooltip'

import style from './css/general.module.css'

export default class ProgressBar extends React.Component {
    static defaultProps = {
        paused: false,
        playing: false,
        rect: {},
        mouseOffset: 0,
        tooltipHideTimeMs: 500,
        mouseProjectedTime: 0,
        length: 0,
        uiShown: false
    }

    static propTypes = {
        paused: PropTypes.bool,
        playing: PropTypes.bool,
        rect: PropTypes.object,
        mouseOffset: PropTypes.number,
        tooltipHideTimeMs: PropTypes.number,
        mouseProjectedTime: PropTypes.number,
        length: PropTypes.number,
        uiShown: PropTypes.bool
    }

    constructor(props) {
        super(props)
        this.state = {
            hovered: false,
            tooltipShown: false,
            clicking: false
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions)
        this.updateDimensions()
    }

    shouldComponentUpdate(oldProps, oldState) {
        return this.props.uiShown
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

    updateDimensions = () => {
        console.log ('update')
        this.setState({rect: this.refs.progress.getDOMNode()
                                 .getBoundingClientRect()})
    }

    showTooltip = () => {
        this.setState({tooltipShown: true})
    }

    hideTooltip = () => {
        this.setState({tooltipShown: false})
    }

    mouseMove = (ev) => {
        let rect = this.state.rect;
        let mouseOffset = ev.pageX - rect.left
        this.setState({
            mouseOffset: mouseOffset,
            mouseProjectedTime: this.props.length * mouseOffset / rect.width
        })
    }

    mouseDown = (e) => {
        this.setState({clicking: true})
        window.document.addEventListener('mouseup', this.mouseUp);
        window.document.addEventListener('mousemove', this.mouseMove);
    }

    mouseUp = (e) =>{
        if (! this.state.clicking) {
            return
        }

        this.setState({clicking: false})
            this.props.onSetTime(this.state.mouseProjectedTime)
    }

    render() {
        let seen = (this.state.clicking)?
                   this.state.mouseOffset/this.state.rect.width:
                   this.props.position
        return (
            <span
                onMouseEnter={this.showTooltip}
                onMouseLeave={this.hideTooltip}
                onMouseMove={this.mouseMove}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp} ref="container">
                <div></div>
                <ToolTip
                    show={this.state.tooltipShown || this.state.clicking}
                    offset={this.state.mouseOffset}
                    time={this.state.mouseProjectedTime}/>
                <div className={style.progressBar} ref="progress">
                    <div className={style.progressSeen}
                         style={{width: seen*100 + "%"}}>
                    </div>
                    <div className={style.progressPointer}></div>
                </div>
            </span>
        )
    }
}

