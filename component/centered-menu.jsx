import React from 'react'
import Itemable from './itemable'

import {prettyTime, c, i18n} from './utils'

export class CenteredMenu extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        ulClassName: React.PropTypes.string
    }

    shouldComponentUpdate(newProps, newState) {
        return this.props.items === newProps.items
    }

    render() {
        return (
            <div className="menu subtitles center">
                <div className="menu-close"></div>
                <div className="menu-title">{this.props.title}</div>
                <ul className={'menu-items ' + this.props.ulClassName}>
                    {/*this.props.items.map((item, i) => {
                         return <li key={i}>{item}</li>
                     })*/}
                </ul>
            </div>
        )
    }
}

export class Subtitles extends Itemable {
    render() {
        return (
            <CenteredMenu
                title={'Subtitle Menu'}
                ulClassName="subtitles-items"
                items={this.props.items}
            />
        )
    }
}


export class Playlist extends Itemable {
    render() {
        return (
            <CenteredMenu
                title={'Playlist Menu'}
                ulClassName="playlist-items"
                items={this.props.items}
            />
        )
    }
}
