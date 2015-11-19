import React from 'react'

export default class Itemable extends React.Component {
    static defaultProps = {
        items: []
    }
    static propTypes = {
        items: React.PropTypes.array
    }
}
