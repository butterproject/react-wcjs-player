import React from 'react'

import style from './css/general.module.css'
import {prettyTime} from './utils'

export default class ToolTip extends React.Component {
    static defaultProps = {
        offset: 0,
        time: 0,
        show: true
    }

    static propTypes = {
        offset: React.PropTypes.number,
        time: React.PropTypes.number,
        show: React.PropTypes.bool
    }

    render() {
        return (
            <div className={style.tooltip} style={{
                    left: 1 + this.props.offset,
                    opacity: this.props.show?0.9:0
                }}>
                <div className={style.tooltipArrow}></div>
                <div className={style.tooltipInner}>
                    {prettyTime(this.props.time)}
                </div>
            </div>
        )
    }
}
