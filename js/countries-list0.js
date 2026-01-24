/**
 * EMEA 国家列表 - 通用模块
 * 包含欧洲、中东、非洲地区的完整国家列表
 * 
 * 使用方法:
 * <script src="countries-list.js"></script>
 * <select id="country-select"></select>
 * <script>
 *   populateCountrySelect('country-select');
 * </script>
 */

// EMEA 国家列表（按地区分组）
const COUNTRIES_LIST = {
    // 西欧
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
    
    // 南欧
    southEurope: [
        { value: '意大利', label: '意大利 (Italy)', en: 'Italy' },
        { value: '西班牙', label: '西班牙 (Spain)', en: 'Spain' },
        { value: '葡萄牙', label: '葡萄牙 (Portugal)', en: 'Portugal' },
        { value: '希腊', label: '希腊 (Greece)', en: 'Greece' },
        { value: '塞浦路斯', label: '塞浦路斯 (Cyprus)', en: 'Cyprus' },
        { value: '马耳他', label: '马耳他 (Malta)', en: 'Malta' }
    ],
    
    // 北欧
    northEurope: [
        { value: '瑞典', label: '瑞典 (Sweden)', en: 'Sweden' },
        { value: '挪威', label: '挪威 (Norway)', en: 'Norway' },
        { value: '丹麦', label: '丹麦 (Denmark)', en: 'Denmark' },
        { value: '芬兰', label: '芬兰 (Finland)', en: 'Finland' },
        { value: '冰岛', label: '冰岛 (Iceland)', en: 'Iceland' }
    ],
    
    // 东欧 ⭐ 重点扩充
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
    
    // 中东 ⭐ 重点地区
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
    
    // 北非
    northAfrica: [
        { value: '埃及', label: '埃及 (Egypt)', en: 'Egypt' },
        { value: '摩洛哥', label: '摩洛哥 (Morocco)', en: 'Morocco' },
        { value: '阿尔及利亚', label: '阿尔及利亚 (Algeria)', en: 'Algeria' },
        { value: '突尼斯', label: '突尼斯 (Tunisia)', en: 'Tunisia' },
        { value: '利比亚', label: '利比亚 (Libya)', en: 'Libya' },
        { value: '苏丹', label: '苏丹 (Sudan)', en: 'Sudan' }
    ],
    
    // 撒哈拉以南非洲
    subSaharanAfrica: [
        { value: '南非', label: '南非 (South Africa)', en: 'South Africa' },
        { value: '尼日利亚', label: '尼日利亚 (Nigeria)', en: 'Nigeria' },
        { value: '肯尼亚', label: '肯尼亚 (Kenya)', en: 'Kenya' },
        { value: '加纳', label: '加纳 (Ghana)', en: 'Ghana' },
        { value: '埃塞俄比亚', label: '埃塞俄比亚 (Ethiopia)', en: 'Ethiopia' }
    ],
    
    // 亚洲（中国电信业务相关）
    asia: [
        { value: '中国', label: '中国 (China)', en: 'China' },
        { value: '新加坡', label: '新加坡 (Singapore)', en: 'Singapore' },
        { value: '日本', label: '日本 (Japan)', en: 'Japan' },
        { value: '韩国', label: '韩国 (South Korea)', en: 'South Korea' },
        { value: '印度', label: '印度 (India)', en: 'India' },
        { value: '马来西亚', label: '马来西亚 (Malaysia)', en: 'Malaysia' },
        { value: '泰国', label: '泰国 (Thailand)', en: 'Thailand' },
        { value: '越南', label: '越南 (Vietnam)', en: 'Vietnam' },
        { value: '印度尼西亚', label: '印度尼西亚 (Indonesia)', en: 'Indonesia' },
        { value: '菲律宾', label: '菲律宾 (Philippines)', en: 'Philippines' }
    ],
    
    // 美洲（可选）
    americas: [
        { value: '美国', label: '美国 (USA)', en: 'United States' },
        { value: '加拿大', label: '加拿大 (Canada)', en: 'Canada' },
        { value: '巴西', label: '巴西 (Brazil)', en: 'Brazil' },
        { value: '墨西哥', label: '墨西哥 (Mexico)', en: 'Mexico' },
        { value: '阿根廷', label: '阿根廷 (Argentina)', en: 'Argentina' }
    ],
    
    // 大洋洲（可选）
    oceania: [
        { value: '澳大利亚', label: '澳大利亚 (Australia)', en: 'Australia' },
        { value: '新西兰', label: '新西兰 (New Zealand)', en: 'New Zealand' }
    ]
};

// 地区名称映射（中文）
const REGION_NAMES = {
    westEurope: '西欧',
    southEurope: '南欧',
    northEurope: '北欧',
    eastEurope: '东欧',
    middleEast: '中东',
    northAfrica: '北非',
    subSaharanAfrica: '撒哈拉以南非洲',
    asia: '亚洲',
    americas: '美洲',
    oceania: '大洋洲'
};

/**
 * 填充国家选择器
 * @param {string} selectId - select元素的ID
 * @param {object} options - 配置选项
 * @param {boolean} options.includeAllRegions - 是否包含所有地区（默认true）
 * @param {Array} options.excludeRegions - 要排除的地区（可选）
 * @param {boolean} options.addEmptyOption - 是否添加"请选择"选项（默认true）
 */
function populateCountrySelect(selectId, options = {}) {
    const select = document.getElementById(selectId);
    if (!select) {
        console.error(`Select element with id '${selectId}' not found`);
        return;
    }
    
    // 默认配置
    const config = {
        includeAllRegions: true,
        excludeRegions: [],
        addEmptyOption: true,
        emptyOptionText: '请选择',  // 新增：可自定义空选项文本
        ...options
    };
    
    // 清空现有选项
    select.innerHTML = '';
    
    // 添加空选项（可自定义文本）
    if (config.addEmptyOption) {
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = config.emptyOptionText;
        select.appendChild(emptyOption);
    }
    
    // 按地区添加国家选项
    Object.keys(COUNTRIES_LIST).forEach(region => {
        if (config.excludeRegions.includes(region)) {
            return;
        }
        
        const countries = COUNTRIES_LIST[region];
        const regionName = REGION_NAMES[region];
        
        // 创建optgroup
        const optgroup = document.createElement('optgroup');
        optgroup.label = regionName;
        
        // 添加国家选项
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.value;
            option.textContent = country.label;
            option.dataset.en = country.en;
            optgroup.appendChild(option);
        });
        
        select.appendChild(optgroup);
    });
}

/**
 * 获取所有国家列表（扁平化）
 * @returns {Array} 国家数组
 */
function getAllCountries() {
    const allCountries = [];
    Object.values(COUNTRIES_LIST).forEach(region => {
        allCountries.push(...region);
    });
    return allCountries;
}

/**
 * 搜索国家（支持中文、英文）
 * @param {string} query - 搜索关键词
 * @returns {Array} 匹配的国家列表
 */
function searchCountries(query) {
    const lowerQuery = query.toLowerCase();
    const allCountries = getAllCountries();
    
    return allCountries.filter(country => {
        return country.value.toLowerCase().includes(lowerQuery) ||
               country.label.toLowerCase().includes(lowerQuery) ||
               country.en.toLowerCase().includes(lowerQuery);
    });
}

/**
 * 按地区获取国家列表
 * @param {string} region - 地区名称（如 'eastEurope'）
 * @returns {Array} 该地区的国家列表
 */
function getCountriesByRegion(region) {
    return COUNTRIES_LIST[region] || [];
}

// 导出供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        COUNTRIES_LIST,
        REGION_NAMES,
        populateCountrySelect,
        getAllCountries,
        searchCountries,
        getCountriesByRegion
    };
}
