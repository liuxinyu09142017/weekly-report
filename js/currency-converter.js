/**
 * 货币转换模块 v1.0
 * 自动将EMEA地区项目金额转换为英镑(GBP)
 */

class CurrencyConverter {
    constructor() {
        this.CACHE_KEY = 'exchangeRates_v1';
        this.CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时
        
        // 国家→货币映射
        this.countryToCurrency = {
            '英国': 'GBP',
            '德国': 'EUR', '法国': 'EUR', '意大利': 'EUR', '西班牙': 'EUR',
            '荷兰': 'EUR', '比利时': 'EUR', '卢森堡': 'EUR', '爱尔兰': 'EUR',
            '奥地利': 'EUR', '葡萄牙': 'EUR', '希腊': 'EUR', '芬兰': 'EUR',
            '爱沙尼亚': 'EUR', '拉脱维亚': 'EUR', '立陶宛': 'EUR',
            '斯洛伐克': 'EUR', '斯洛文尼亚': 'EUR', '克罗地亚': 'EUR',
            '塞浦路斯': 'EUR', '马耳他': 'EUR',
            '瑞士': 'CHF',
            '瑞典': 'SEK', '挪威': 'NOK', '丹麦': 'DKK',
            '波兰': 'PLN', '捷克': 'CZK', '匈牙利': 'HUF', '罗马尼亚': 'RON',
            '美国': 'USD', '阿联酋': 'AED', '沙特阿拉伯': 'SAR'
        };
        
        this.rates = null;
        this.rateInfo = null;
    }
    
    // 初始化并获取汇率
    async init() {
        const cached = this.getCache();
        if (cached) {
            this.rates = cached.rates;
            this.rateInfo = cached.info;
            console.log('✅ 使用缓存汇率:', this.rateInfo);
            return true;
        }
        
        try {
            await this.fetchRates();
            return true;
        } catch (error) {
            console.error('获取汇率失败:', error);
            this.useDefaultRates();
            return false;
        }
    }
    
    // 获取汇率
    async fetchRates() {
        try {
            // 主API: Frankfurter (ECB)
            const response = await fetch(
                'https://api.frankfurter.dev/v1/latest?base=GBP&symbols=EUR,USD,CHF,SEK,NOK,DKK,PLN,CZK,HUF,RON,AED,SAR'
            );
            const data = await response.json();
            
            this.rates = { ...data.rates, GBP: 1.0 };
            this.rateInfo = {
                source: 'Frankfurter (ECB)',
                date: data.date,
                base: 'GBP'
            };
            
            this.saveCache();
            console.log('✅ 获取汇率成功:', this.rateInfo);
        } catch (error) {
            // 备用API: ExchangeRate-API
            const response = await fetch('https://open.er-api.com/v6/latest/GBP');
            const data = await response.json();
            
            this.rates = data.rates;
            this.rateInfo = {
                source: 'ExchangeRate-API',
                date: new Date(data.time_last_update_unix * 1000).toISOString().split('T')[0],
                base: 'GBP'
            };
            
            this.saveCache();
            console.log('✅ 使用备用API:', this.rateInfo);
        }
    }
    
    // 使用默认汇率
    useDefaultRates() {
        this.rates = {
            GBP: 1.0, EUR: 1.20, USD: 1.27, CHF: 1.13,
            SEK: 13.85, NOK: 13.90, DKK: 8.95,
            PLN: 5.12, CZK: 30.10, HUF: 485.50, RON: 5.97,
            AED: 4.66, SAR: 4.76
        };
        this.rateInfo = {
            source: '默认汇率',
            date: '2025-01-22',
            base: 'GBP'
        };
        console.warn('⚠️ 使用默认汇率');
    }
    
    // 缓存管理
    getCache() {
        try {
            const cached = localStorage.getItem(this.CACHE_KEY);
            if (!cached) return null;
            
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp > this.CACHE_DURATION) {
                localStorage.removeItem(this.CACHE_KEY);
                return null;
            }
            
            return data;
        } catch { return null; }
    }
    
    saveCache() {
        try {
            localStorage.setItem(this.CACHE_KEY, JSON.stringify({
                data: { rates: this.rates, info: this.rateInfo },
                timestamp: Date.now()
            }));
        } catch (error) {
            console.error('保存缓存失败:', error);
        }
    }
    
    // 转换金额到GBP
    convertToGBP(amount, country) {
        const num = parseFloat(amount) || 0;
        const currency = this.countryToCurrency[country] || 'EUR';
        
        if (currency === 'GBP') {
            return {
                original: { amount: num, currency: 'GBP' },
                gbp: num,
                rate: 1.0,
                needsConversion: false
            };
        }
        
        const rate = this.rates[currency] || 1.0;
        const gbpAmount = num / rate;
        
        return {
            original: { amount: num, currency },
            gbp: parseFloat(gbpAmount.toFixed(2)),
            rate: parseFloat((1 / rate).toFixed(4)),
            needsConversion: true
        };
    }
    
    // 格式化金额
    format(amount, currency) {
        const symbols = {
            GBP: '£', EUR: '€', USD: '$', CHF: 'CHF',
            SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł',
            CZK: 'Kč', HUF: 'Ft', RON: 'lei', AED: 'AED', SAR: 'SAR'
        };
        
        const symbol = symbols[currency] || currency;
        const formatted = parseFloat(amount).toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        return ['GBP', 'EUR', 'USD'].includes(currency) 
            ? `${symbol}${formatted}` 
            : `${formatted} ${symbol}`;
    }
    
    // 获取汇率信息
    getInfo() {
        return this.rateInfo;
    }
}

// 全局实例
window.currencyConverter = new CurrencyConverter();
