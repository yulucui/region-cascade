import chineseDistricts from './chinese-districts'

export default class RegionUtil {

    static format(regionCode = '86'){
        regionCode += '';
        let formatted = ['中国'];
        let province, city, county;
        let provinceFmt, cityFmt, countyFmt;
        if(regionCode.length != 6)
            regionCode = '86';
        if(regionCode == '86')
            return formatted;
        province = regionCode.substr(0,2) + '0000';
        city = regionCode.substr(0,4) + '00';
        county = regionCode;
        provinceFmt = chineseDistricts['86'][province];
        cityFmt = chineseDistricts[province][city];
        countyFmt = chineseDistricts[city][county];
        if(provinceFmt) formatted.push(provinceFmt);
        if(provinceFmt && cityFmt) formatted.push(cityFmt);
        if(provinceFmt && cityFmt && countyFmt) formatted.push(countyFmt);
        return formatted;
    }
}
