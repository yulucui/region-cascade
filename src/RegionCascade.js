import React, {Component} from 'react'
import Select from './Select';
import chineseDistricts from './chinese-districts'
import { ButtonGroup } from 'reactstrap';

export default class RegionCascade extends Component{

    constructor(props){
        super(props);
        for(let key in chineseDistricts){
            chineseDistricts[key][key] = '全部';
        }
    }

    state = {}

    valid(code){
        return !isNaN(code) && (code == '86' || code.length == 6);
    }

    getRegions(code){
        if(!this.valid(code)) return {};
        let province = code.substr(0,2) + '0000';
        let city = code.substr(0,4) + '00';
        let county = code;
        if(code == '86')
            return {'province': {key: '86', value: chineseDistricts['86']}}
        else if(code.substr(2,4) == '0000')
            return {
                'province': {key: code, value: chineseDistricts['86']},
                'city': {key: code, value: chineseDistricts[province]}
            }
        else if(code.substr(4,2) == '00')
            return {
                'province': {key: province, value: chineseDistricts['86']},
                'city': {key: code, value: chineseDistricts[province]},
                'county': {key: code, value: chineseDistricts[city]}
            }
        else
            return {
                'province': {key: province, value: chineseDistricts['86']},
                'city': {key: city, value: chineseDistricts[province]},
                'county': {key: code, value: chineseDistricts[city]}
            }
    }

    getAuth(code,strict){
        let auth = {authCountry: false,authProvince: false, authCity: false,authCounty: false};
        if(!this.valid(code)) return auth;
        if(code == '86') return auth;
        if(code.substr(2,4) == '0000'){
            auth.authCountry = true;
            if(strict){
                auth.authCity = true;
                auth.authCounty = true;
            }
        } else if(code.substr(4,2) == '00'){
            auth.authCountry = true;
            auth.authProvince = true;
            if(strict)
                auth.authCounty = true;
        } else {
            auth.authCountry = true;
            auth.authProvince = true;
            auth.authCity = true;
        }
        return auth;
    }

    change(e){
        this.props.onChange(e);
        // this.setState({value: e});
    }

    render(){
        let {value,strict} = {...this.props};
        let {province, city, county} = this.getRegions(value);
        let {authCountry, authProvince, authCity, authCounty} = this.getAuth(this.props.authority || '86',strict);
        return (
            <ButtonGroup>
                <Select disabled={false || authCountry} option={{'86': '中国'}} value="86" onChange={this.change.bind(this)}/>
                <Select 
                    disabled={(province ? false : true) || authProvince} 
                    option={province ? province.value : {'86': '全部'}} 
                    value={province ? province.key : '86'} 
                    onChange={this.change.bind(this)}/>
                <Select 
                    disabled={(city ? false : true) || authCity} 
                    option={city ? city.value : {'86': '全部'}} 
                    value={city ? city.key : '86'} 
                    onChange={this.change.bind(this)}/>
                <Select 
                    disabled={(county ? false : true) || authCounty} 
                    option={county ? county.value : {'86': '全部'}} 
                    value={county ? county.key : '86'} 
                    onChange={this.change.bind(this)}/>
            </ButtonGroup>
        )
    }
}