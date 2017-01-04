import React, { Component } from 'react';
import InputWidget from '../input/single/input';

export default class SelectSearchWidget extends Component {
    componentDidMount() {
        this.searchInputNode.focus();
    }

    searchInputRef = (node) => {
        this.searchInputNode = node;
    }

    render() {
        return <InputWidget {...this.props} inputRef={this.searchInputRef} />;
    }
}
