import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Select extends Component {

    state = {
        dropdownOpen: false
    };

    toggle(e) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    itemClick(e){
        let value = e.target.getAttribute('eventKey');
        this.props.onChange(value);
    }

    render() {
        
        let {value, option, disabled} = {...this.props}
        let codes = Object.keys(option);

        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
                <DropdownToggle disabled={disabled} caret>
                    {option[value]}
                </DropdownToggle>
                <DropdownMenu style={{'max-height': '310px',overflow: 'auto'}}>
                    {
                        codes.map(key => {
                            return <DropdownItem onClick={this.itemClick.bind(this)} eventKey={key}>
                                {this.props.option[key]}
                            </DropdownItem>
                        })
                    }
                </DropdownMenu>
            </ButtonDropdown>
        )
    }
}
