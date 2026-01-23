/**
 * 金额格式化工具 - Amount Formatter
 * 
 * 功能：
 * 1. 支持 K/M 输入解析
 * 2. 智能 K/M 显示
 * 3. 多货币符号支持
 * 4. 场景化格式选择
 */

const AmountFormatter = {
    
    /**
     * 货币符号映射
     */
    currencySymbols: {
        'GBP': '£',
        'EUR': '€',
        'USD': '$',
        'CHF': 'CHF ',
        'NOK': 'kr',
        'SEK': 'kr',
        'DKK': 'kr',
        'PLN': 'zł',
        'CZK': 'Kč',
        'HUF': 'Ft',
        'RON': 'lei',
        'BGN': 'лв',
        'AED': 'AED ',
        'SAR': 'SAR '
    },
    
    /**
     * 解析用户输入的金额（支持 K/M 后缀）
     * @param {string|number} input - 用户输入
     * @returns {number} 解析后的数值
     */
    parseAmount(input) {
        if (input === null || input === undefined || input === '') {
            return 0;
        }
        
        // 转换为字符串并去除空格
        let str = input.toString().toUpperCase().trim();
        
        // 移除货币符号
        str = str.replace(/[£€$]/g, '');
        
        // 处理 K (千)
        if (str.endsWith('K')) {
            const value = parseFloat(str.replace('K', ''));
            return isNaN(value) ? 0 : value * 1000;
        }
        
        // 处理 M (百万)
        if (str.endsWith('M')) {
            const value = parseFloat(str.replace('M', ''));
            return isNaN(value) ? 0 : value * 1000000;
        }
        
        // 处理普通数字（去除逗号）
        const value = parseFloat(str.replace(/,/g, ''));
        return isNaN(value) ? 0 : value;
    },
    
    /**
     * 格式化金额为完整格式
     * @param {number} amount - 金额
     * @param {string} currency - 货币代码
     * @returns {string} 格式化后的字符串
     */
    formatFull(amount, currency = 'GBP') {
        const symbol = this.currencySymbols[currency] || currency;
        const formatted = Math.abs(amount).toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        const sign = amount < 0 ? '-' : '';
        return `${sign}${symbol}${formatted}`;
    },
    
    /**
     * 格式化金额为紧凑格式（K/M）
     * @param {number} amount - 金额
     * @param {string} currency - 货币代码
     * @param {object} options - 选项
     * @returns {string} 格式化后的字符串
     */
    formatCompact(amount, currency = 'GBP', options = {}) {
        const {
            threshold = 1000,      // K格式阈值
            kDecimals = 2,         // K格式小数位
            mDecimals = 2,         // M格式小数位
            showZeroDecimals = false  // 是否显示.00
        } = options;
        
        const symbol = this.currencySymbols[currency] || currency;
        const absAmount = Math.abs(amount);
        const sign = amount < 0 ? '-' : '';
        
        // 小于阈值：显示完整
        if (absAmount < threshold) {
            return this.formatFull(amount, currency);
        }
        
        // 1千到99.9万：显示 K
        if (absAmount < 1000000) {
            const k = absAmount / 1000;
            const decimals = k >= 100 ? 1 : kDecimals;
            let formatted = k.toFixed(decimals);
            
            // 去除不必要的 .00
            if (!showZeroDecimals && formatted.endsWith('.00')) {
                formatted = formatted.slice(0, -3);
            } else if (!showZeroDecimals && formatted.endsWith('0') && formatted.includes('.')) {
                formatted = formatted.replace(/\.?0+$/, '');
            }
            
            return `${sign}${symbol}${formatted}K`;
        }
        
        // 100万以上：显示 M
        const m = absAmount / 1000000;
        let formatted = m.toFixed(mDecimals);
        
        // 去除不必要的 .00
        if (!showZeroDecimals && formatted.endsWith('.00')) {
            formatted = formatted.slice(0, -3);
        } else if (!showZeroDecimals && formatted.endsWith('0') && formatted.includes('.')) {
            formatted = formatted.replace(/\.?0+$/, '');
        }
        
        return `${sign}${symbol}${formatted}M`;
    },
    
    /**
     * 根据场景自动选择格式
     * @param {number} amount - 金额
     * @param {string} currency - 货币代码
     * @param {string} scene - 场景：table, card, detail, chart
     * @returns {object} 包含主显示和详细信息
     */
    formatByScene(amount, currency = 'GBP', scene = 'table') {
        const full = this.formatFull(amount, currency);
        const compact = this.formatCompact(amount, currency);
        
        switch(scene) {
            case 'table':
                // 表格：紧凑格式，悬停显示完整
                return {
                    display: compact,
                    detail: full,
                    showTooltip: compact !== full
                };
                
            case 'card':
                // 统计卡片：大字紧凑，小字完整
                return {
                    display: compact,
                    detail: full,
                    showDetail: true
                };
                
            case 'detail':
                // 详情页：完整格式
                return {
                    display: full,
                    detail: null,
                    showDetail: false
                };
                
            case 'chart':
                // 图表：紧凑格式，不显示详情
                return {
                    display: compact,
                    detail: null,
                    showDetail: false
                };
                
            default:
                return {
                    display: full,
                    detail: null
                };
        }
    },
    
    /**
     * 生成HTML显示（带tooltip）
     * @param {number} amount - 金额
     * @param {string} currency - 货币代码
     * @param {string} scene - 场景
     * @returns {string} HTML字符串
     */
    toHTML(amount, currency = 'GBP', scene = 'table') {
        const formatted = this.formatByScene(amount, currency, scene);
        
        if (scene === 'table' && formatted.showTooltip) {
            return `
                <span class="amount-display" title="${formatted.detail}">
                    ${formatted.display}
                </span>
            `;
        }
        
        if (scene === 'card' && formatted.showDetail) {
            return `
                <div class="amount-card">
                    <div class="amount-primary">${formatted.display}</div>
                    <div class="amount-secondary">${formatted.detail}</div>
                </div>
            `;
        }
        
        return `<span class="amount-display">${formatted.display}</span>`;
    },
    
    /**
     * 获取图表用的格式化函数
     * @param {string} currency - 货币代码
     * @returns {function} Chart.js 格式化函数
     */
    getChartFormatter(currency = 'GBP') {
        return (value) => this.formatCompact(value, currency, {
            threshold: 1000,
            kDecimals: 1,
            mDecimals: 2
        });
    }
};

// 全局暴露
window.AmountFormatter = AmountFormatter;

// 示例用法
console.log('AmountFormatter 已加载');
console.log('示例：');
console.log('  解析: AmountFormatter.parseAmount("50K") =', AmountFormatter.parseAmount('50K'));
console.log('  完整: AmountFormatter.formatFull(50000, "GBP") =', AmountFormatter.formatFull(50000, 'GBP'));
console.log('  紧凑: AmountFormatter.formatCompact(50000, "GBP") =', AmountFormatter.formatCompact(50000, 'GBP'));
console.log('  场景: AmountFormatter.formatByScene(50000, "GBP", "card") =', AmountFormatter.formatByScene(50000, 'GBP', 'card'));
