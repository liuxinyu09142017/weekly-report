/**
 * EMEA 国家列表 - 优化版
 * * 改进点：
 * 1. 支持自定义默认选项：populateCountrySelect('id', { emptyOptionText: '全部国家' })
 * 2. 使用 DocumentFragment 提升大规模渲染性能
 * 3. 增强了对 DOM 元素检查的健壮性
 */

// EMEA 国家列表（按地区分组）
const COUNTRIES_LIST = Object.freeze({
    westEurope: [
        { value: '英国', label: '英国 (UK)', en: 'United Kingdom' },
        { value: '法国', label: '法国 (France)', en: 'France' },
        { value: '德国', label: '德国 (Germany)', en: 'Germany' },
        { value: '荷兰', label: '荷兰 (Netherlands)', en: 'Netherlands' },
        { value: '比利时', label: '比利时 (Belgium)', en: 'Belgium' },
        { value: '卢森堡', label: '卢森堡 (Luxembourg)', en: 'Luxembourg' },
        { value: '爱尔兰', label: '爱尔兰 (Ireland)', en: 'Ireland' },
        { value: '瑞士', label: '瑞士 (Switzerland)', en: 'Switzerland' },
        { value: '奥地利', label: '奥地利 (Austria)', en: 'Austria' }
    ],
    southEurope: [
        { value: '意大利', label: '意大利 (Italy)', en: 'Italy' },
        { value: '西班牙', label: '西班牙 (Spain)', en: 'Spain' },
        { value: '葡萄牙', label: '葡萄牙 (Portugal)', en: 'Portugal' },
        { value: '希腊', label: '希腊 (Greece)', en: 'Greece' },
        { value: '塞浦路斯', label: '塞浦路斯 (Cyprus)', en: 'Cyprus' },
        { value: '马耳他', label: '马耳他 (Malta)', en: 'Malta' }
    ],
    northEurope: [
        { value: '瑞典', label: '瑞典 (Sweden)', en: 'Sweden' },
        { value: '挪威', label: '挪威 (Norway)', en: 'Norway' },
        { value: '丹麦', label: '丹麦 (Denmark)', en: 'Denmark' },
        { value: '芬兰', label: '芬兰 (Finland)', en: 'Finland' },
        { value: '冰岛', label: '冰岛 (Iceland)', en: 'Iceland' }
    ],
    eastEurope: [
        { value: '波兰', label: '波兰 (Poland)', en: 'Poland' },
        { value: '捷克', label: '捷克 (Czech Republic)', en: 'Czech Republic' },
        { value: '匈牙利', label: '匈牙利 (Hungary)', en: 'Hungary' },
        { value: '罗马尼亚', label: '罗马尼亚 (Romania)', en: 'Romania' },
        { value: '保加利亚', label: '保加利亚 (Bulgaria)', en: 'Bulgaria' },
        { value: '斯洛伐克', label: '斯洛伐克 (Slovakia)', en: 'Slovakia' },
        { value: '斯洛文尼亚', label: '斯洛文尼亚 (Slovenia)', en: 'Slovenia' },
        { value: '克罗地亚', label: '克罗地亚 (Croatia)', en: 'Croatia' },
        { value: '塞尔维亚', label: '塞尔维亚 (Serbia)', en: 'Serbia' },
        { value: '波黑', label: '波黑 (Bosnia and Herzegovina)', en: 'Bosnia and Herzegovina' },
        { value: '黑山', label: '黑山 (Montenegro)', en: 'Montenegro' },
        { value: '北马其顿', label: '北马其顿 (North Macedonia)', en: 'North Macedonia' },
        { value: '阿尔巴尼亚', label: '阿尔巴尼亚 (Albania)', en: 'Albania' },
        { value: '科索沃', label: '科索沃 (Kosovo)', en: 'Kosovo' },
        { value: '爱沙尼亚', label: '爱沙尼亚 (Estonia)', en: 'Estonia' },
        { value: '拉脱维亚', label: '拉脱维亚 (Latvia)', en: 'Latvia' },
        { value: '立陶宛', label: '立陶宛 (Lithuania)', en: 'Lithuania' }
    ],
    middleEast: [
        { value: '土耳其', label: '土耳其 (Turkey)', en: 'Turkey' },
        { value: '阿联酋', label: '阿联酋 (UAE)', en: 'United Arab Emirates' },
        { value: '沙特阿拉伯', label: '沙特阿拉伯 (Saudi Arabia)', en: 'Saudi Arabia' },
        { value: '卡塔尔', label: '卡塔尔 (Qatar)', en: 'Qatar' },
        { value: '科威特', label: '科威特 (Kuwait)', en: 'Kuwait' },
        { value: '阿曼', label: '阿曼 (Oman)', en: 'Oman' },
        { value: '巴林', label: '巴林 (Bahrain)', en: 'Bahrain' },
        { value: '以色列', label: '以色列 (Israel)', en: 'Israel' },
        { value: '约旦', label: '约旦 (Jordan)', en: 'Jordan' },
        { value: '黎巴嫩', label: '黎巴嫩 (Lebanon)', en: 'Lebanon' },
        { value: '伊拉克', label: '伊拉克 (Iraq)', en: 'Iraq' },
        { value: '伊朗', label: '伊朗 (Iran)', en: 'Iran' },
        { value: '也门', label: '也门 (Yemen)', en: 'Yemen' }
    ],
    northAfrica: [
        { value: '埃及', label: '埃及 (Egypt)', en: 'Egypt' },
        { value: '摩洛哥', label: '摩洛哥 (Morocco)', en: 'Morocco' },
        { value: '阿尔及利亚', label: '阿尔及利亚 (Algeria)', en: 'Algeria' },
        { value: '突尼斯', label: '突尼斯 (Tunisia)', en: 'Tunisia' },
        { value: '利比亚', label: '利比亚 (Libya)', en: 'Libya' },
        { value: '苏丹', label: '苏丹 (Sudan)', en: 'Sudan' }
    ],
    subSaharanAfrica: [
        { value: '南非', label: '南非 (South Africa)', en: 'South Africa' },
        { value: '尼日利亚', label: '尼日利亚 (Nigeria)', en: 'Nigeria' },
        { value: '肯尼亚', label: '肯尼亚 (Kenya)', en: 'Kenya' },
        { value: '加纳', label: '加纳 (Ghana)', en: 'Ghana' },
        { value: '埃塞俄比亚', label: '埃塞俄比亚 (Ethiopia)', en: 'Ethiopia' }
    ],
    asia: [
        { value: '中国', label: '中国 (China)', en: 'China' },
        { value: '新加坡', label: '新加坡 (Singapore)', en: 'Singapore' },
        { value: '日本', label: '日本 (Japan)', en: 'Japan' },
        { value: '韩国', label: '韩国 (South Korea)', en: 'South Korea' },
        { value: '印度', label: '印度 (India)', en: 'India' },
        { value: '马来西亚', label: '马来西亚 (Malaysia)', en: 'Malaysia' },
        { value: '泰国', label: '泰国 (Thailand)', en: 'Thailand' },
        { value: '越南', label: '越南 (Vietnam)', en