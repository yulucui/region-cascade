import React, {Component} from 'react'
import { render } from 'react-dom'
import RegionCascade from './RegionCascade'
import RegionUtil from './RegionUtil'
export default class Index extends Component{
    constructor(props){
        super();
        this.state = {...props}
    }
    _change(val){
        // let val = e.target.value;
        this.setState({value: val});
        this.state.onChange && this.state.onChange(val);
    }
    setValue(val){
        this._change(val);
    }
    getValue(){
        return this.state.value;
    }
    setAuthority(val){
        this.setState({authority: val});
    }
    render(){
        let {value, onChange, authority, strict} = this.state;
        return <RegionCascade authority={''+authority || '86'} strict={!!strict} value={''+value || '86'} onChange={this._change.bind(this)}/>
    }
};

window.RegionCascade = (el,option) => {
    let {value, onChange, authority, strict} = option || {};
    let index = <Index authority={authority}  strict={strict} value={value} onChange={onChange}/>;
    return render(index,el);
}
window.RegionCascade.format = (regionCode) => {
    return RegionUtil.format(regionCode);
}