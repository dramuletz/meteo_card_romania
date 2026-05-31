/**
 * Meteo Card Romania
 * Card Lovelace pentru integrarea Info Meteo Romania
 * Autor: Stefan Dram
 * https://github.com/dramuletz/meteo_card_romania
 */

const CARD_VERSION = '1.1.0';

const SKY_COLORS = {
  day: {
    sunny:           { from: '#1B8FD4', to: '#7EC8F0' },
    partlycloudy:    { from: '#2C8FCC', to: '#8ED0F0' },
    cloudy:          { from: '#7A8F9F', to: '#AAB8C2' },
    rainy:           { from: '#4A5E6E', to: '#6A7E8E' },
    pouring:         { from: '#3A4E5E', to: '#5A6E7E' },
    snowy:           { from: '#7A9AB0', to: '#A8C0D0' },
    'snowy-rainy':   { from: '#7A9AB0', to: '#A8C0D0' },
    fog:             { from: '#8A9BAB', to: '#B0BEC8' },
    'lightning-rainy':{ from: '#3A4A5A', to: '#5A6A7A' },
    clear:           { from: '#1B8FD4', to: '#7EC8F0' },
  },
  night: {
    sunny:           { from: '#03080F', to: '#0A1828' },
    partlycloudy:    { from: '#04090F', to: '#101E2E' },
    cloudy:          { from: '#04090F', to: '#101E2E' },
    rainy:           { from: '#040810', to: '#10182A' },
    pouring:         { from: '#030710', to: '#0E1525' },
    snowy:           { from: '#050C16', to: '#102030' },
    'snowy-rainy':   { from: '#050C16', to: '#102030' },
    fog:             { from: '#060A14', to: '#101822' },
    'lightning-rainy':{ from: '#030610', to: '#0C1220' },
    clear:           { from: '#03080F', to: '#0A1828' },
  }
};

const SKY_SVGS = {
  day_sunny: `
    <circle cx="340" cy="42" r="30" fill="#FFC830"/>
    <circle cx="340" cy="42" r="24" fill="#FFD94D"/>
    <line x1="340" y1="4" x2="340" y2="14" stroke="#FFD94D" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="378" y1="42" x2="368" y2="42" stroke="#FFD94D" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="367" y1="15" x2="360" y2="22" stroke="#FFD94D" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="313" y1="15" x2="320" y2="22" stroke="#FFD94D" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="302" y1="42" x2="312" y2="42" stroke="#FFD94D" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="367" y1="69" x2="360" y2="62" stroke="#FFD94D" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="313" y1="69" x2="320" y2="62" stroke="#FFD94D" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="70" cy="110" rx="60" ry="22" fill="white" opacity=".18"/>
    <ellipse cx="45" cy="105" rx="40" ry="18" fill="white" opacity=".15"/>`,

  day_partlycloudy: `
    <circle cx="310" cy="34" r="24" fill="#FFCC30" opacity=".95"/>
    <circle cx="310" cy="34" r="18" fill="#FFD94D"/>
    <line x1="310" y1="5" x2="310" y2="13" stroke="#FFD94D" stroke-width="3" stroke-linecap="round"/>
    <line x1="340" y1="34" x2="332" y2="34" stroke="#FFD94D" stroke-width="3" stroke-linecap="round"/>
    <line x1="332" y1="12" x2="327" y2="17" stroke="#FFD94D" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="170" cy="80" rx="90" ry="34" fill="white" opacity=".92"/>
    <ellipse cx="120" cy="88" rx="65" ry="28" fill="white" opacity=".88"/>
    <ellipse cx="240" cy="76" rx="70" ry="28" fill="white" opacity=".85"/>
    <ellipse cx="340" cy="95" rx="55" ry="22" fill="white" opacity=".55"/>`,

  day_cloudy: `
    <ellipse cx="90" cy="50" rx="95" ry="40" fill="white" opacity=".28"/>
    <ellipse cx="50" cy="60" rx="65" ry="32" fill="white" opacity=".24"/>
    <ellipse cx="260" cy="42" rx="120" ry="44" fill="white" opacity=".28"/>
    <ellipse cx="390" cy="70" rx="65" ry="28" fill="white" opacity=".20"/>
    <ellipse cx="150" cy="105" rx="90" ry="30" fill="white" opacity=".18"/>`,

  day_rainy: `
    <ellipse cx="100" cy="44" rx="105" ry="42" fill="white" opacity=".22"/>
    <ellipse cx="280" cy="38" rx="120" ry="44" fill="white" opacity=".22"/>
    <line x1="70" y1="90" x2="63" y2="114" stroke="#90B8D8" stroke-width="2" stroke-linecap="round" opacity=".75"/>
    <line x1="115" y1="88" x2="108" y2="112" stroke="#90B8D8" stroke-width="2" stroke-linecap="round" opacity=".75"/>
    <line x1="160" y1="90" x2="153" y2="114" stroke="#90B8D8" stroke-width="2" stroke-linecap="round" opacity=".75"/>
    <line x1="205" y1="88" x2="198" y2="112" stroke="#90B8D8" stroke-width="2" stroke-linecap="round" opacity=".75"/>
    <line x1="250" y1="90" x2="243" y2="114" stroke="#90B8D8" stroke-width="2" stroke-linecap="round" opacity=".75"/>
    <line x1="295" y1="88" x2="288" y2="112" stroke="#90B8D8" stroke-width="2" stroke-linecap="round" opacity=".75"/>
    <line x1="340" y1="90" x2="333" y2="114" stroke="#90B8D8" stroke-width="2" stroke-linecap="round" opacity=".75"/>
    <line x1="385" y1="88" x2="378" y2="112" stroke="#90B8D8" stroke-width="2" stroke-linecap="round" opacity=".75"/>`,

  day_snowy: `
    <ellipse cx="110" cy="48" rx="105" ry="40" fill="white" opacity=".35"/>
    <ellipse cx="280" cy="42" rx="118" ry="42" fill="white" opacity=".35"/>
    <circle cx="75" cy="94" r="5" fill="white" opacity=".9"/>
    <circle cx="130" cy="88" r="4" fill="white" opacity=".85"/>
    <circle cx="185" cy="100" r="5" fill="white" opacity=".9"/>
    <circle cx="240" cy="92" r="4" fill="white" opacity=".85"/>
    <circle cx="295" cy="104" r="5" fill="white" opacity=".9"/>
    <circle cx="350" cy="90" r="4" fill="white" opacity=".85"/>
    <circle cx="55" cy="114" r="3.5" fill="white" opacity=".7"/>
    <circle cx="160" cy="118" r="3.5" fill="white" opacity=".7"/>
    <circle cx="265" cy="116" r="3.5" fill="white" opacity=".7"/>`,

  night_clear: `
    <circle cx="45" cy="12" r="1.2" fill="white" opacity=".8"/>
    <circle cx="88" cy="6" r="1.8" fill="white" opacity=".95"/>
    <circle cx="132" cy="18" r="1.2" fill="white" opacity=".75"/>
    <circle cx="175" cy="5" r="1.5" fill="white" opacity=".9"/>
    <circle cx="218" cy="16" r="1" fill="white" opacity=".7"/>
    <circle cx="260" cy="4" r="1.8" fill="white" opacity=".9"/>
    <circle cx="68" cy="50" r="1.5" fill="white" opacity=".75"/>
    <circle cx="155" cy="48" r="1.8" fill="white" opacity=".85"/>
    <circle cx="242" cy="44" r="1.5" fill="white" opacity=".8"/>
    <circle cx="52" cy="75" r="1" fill="white" opacity=".55"/>
    <circle cx="140" cy="72" r="1" fill="white" opacity=".6"/>
    <circle cx="227" cy="68" r="1.8" fill="white" opacity=".75"/>
    <circle cx="370" cy="30" r="1" fill="white" opacity=".65"/>
    <circle cx="410" cy="8" r="1.5" fill="white" opacity=".8"/>
    <path d="M338 20 Q356 9 365 30 Q347 19 338 20z" fill="#FFFCE8" opacity=".95"/>
    <circle cx="353" cy="24" r="14" fill="#FFFCE8" opacity=".92"/>
    <circle cx="360" cy="19" r="9" fill="#0C1828" opacity=".9"/>`,

  night_cloudy: `
    <circle cx="40" cy="10" r="1.2" fill="white" opacity=".65"/>
    <circle cx="105" cy="6" r="1" fill="white" opacity=".55"/>
    <circle cx="180" cy="14" r="1.5" fill="white" opacity=".65"/>
    <path d="M316 13 Q332 4 340 23 Q324 13 316 13z" fill="#FFFCE8" opacity=".8"/>
    <circle cx="329" cy="17" r="11" fill="#FFFCE8" opacity=".8"/>
    <circle cx="334" cy="12" r="7.5" fill="#0A1520" opacity=".92"/>
    <ellipse cx="130" cy="72" rx="115" ry="42" fill="white" opacity=".08"/>
    <ellipse cx="78" cy="80" rx="78" ry="34" fill="white" opacity=".06"/>
    <ellipse cx="305" cy="65" rx="108" ry="38" fill="white" opacity=".08"/>`,

  night_rainy: `
    <ellipse cx="120" cy="42" rx="115" ry="42" fill="white" opacity=".07"/>
    <ellipse cx="295" cy="36" rx="120" ry="42" fill="white" opacity=".07"/>
    <line x1="75" y1="90" x2="68" y2="116" stroke="#3A6080" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
    <line x1="118" y1="88" x2="111" y2="114" stroke="#3A6080" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
    <line x1="161" y1="90" x2="154" y2="116" stroke="#3A6080" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
    <line x1="204" y1="88" x2="197" y2="114" stroke="#3A6080" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
    <line x1="247" y1="90" x2="240" y2="116" stroke="#3A6080" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
    <line x1="290" y1="88" x2="283" y2="114" stroke="#3A6080" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
    <line x1="333" y1="90" x2="326" y2="116" stroke="#3A6080" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
    <line x1="376" y1="88" x2="369" y2="114" stroke="#3A6080" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>`,

  night_snowy: `
    <circle cx="48" cy="8" r="1.2" fill="white" opacity=".6"/>
    <circle cx="115" cy="5" r="1.5" fill="white" opacity=".65"/>
    <circle cx="210" cy="12" r="1" fill="white" opacity=".55"/>
    <path d="M326 12 Q342 3 349 22 Q333 12 326 12z" fill="#FFFCE8" opacity=".82"/>
    <circle cx="339" cy="16" r="10" fill="#FFFCE8" opacity=".82"/>
    <circle cx="344" cy="11" r="6.5" fill="#0A1820" opacity=".93"/>
    <ellipse cx="140" cy="56" rx="112" ry="40" fill="white" opacity=".07"/>
    <ellipse cx="295" cy="50" rx="110" ry="38" fill="white" opacity=".07"/>
    <circle cx="72" cy="94" r="4.5" fill="white" opacity=".82"/>
    <circle cx="128" cy="87" r="3.5" fill="white" opacity=".78"/>
    <circle cx="184" cy="100" r="4.5" fill="white" opacity=".82"/>
    <circle cx="240" cy="90" r="3.5" fill="white" opacity=".75"/>
    <circle cx="296" cy="104" r="4.5" fill="white" opacity=".82"/>
    <circle cx="352" cy="88" r="3.5" fill="white" opacity=".78"/>
    <circle cx="55" cy="115" r="3" fill="white" opacity=".6"/>
    <circle cx="168" cy="120" r="3" fill="white" opacity=".6"/>`
};

const CONDITION_RO = {
  sunny: 'Cer senin', partlycloudy: 'Parțial noros', cloudy: 'Cer noros',
  rainy: 'Ploaie', pouring: 'Ploaie torențială', snowy: 'Ninsoare',
  'snowy-rainy': 'Lapoviță', fog: 'Ceață', 'lightning-rainy': 'Furtună', clear: 'Cer senin',
};

function fcSvg(t) {
  if (t === 'sunny') return `<svg viewBox="0 0 48 40" fill="none"><circle cx="24" cy="18" r="9" fill="#FFC830"/><line x1="24" y1="4" x2="24" y2="9" stroke="#FFC830" stroke-width="2.5" stroke-linecap="round"/><line x1="24" y1="27" x2="24" y2="32" stroke="#FFC830" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="18" x2="15" y2="18" stroke="#FFC830" stroke-width="2.5" stroke-linecap="round"/><line x1="33" y1="18" x2="38" y2="18" stroke="#FFC830" stroke-width="2.5" stroke-linecap="round"/><line x1="14" y1="8" x2="18" y2="12" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="24" x2="34" y2="28" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/><line x1="34" y1="8" x2="30" y2="12" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="24" x2="14" y2="28" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/></svg>`;
  if (t === 'partlycloudy') return `<svg viewBox="0 0 48 40" fill="none"><circle cx="17" cy="14" r="8" fill="#FFC830"/><line x1="17" y1="3" x2="17" y2="6.5" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/><line x1="28" y1="14" x2="31.5" y2="14" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/><path d="M37 30H15a9 9 0 1 1 1.8-17.8A11 11 0 0 1 38 22a7 7 0 0 1-1 8z" fill="#BCC8D4"/></svg>`;
  if (t === 'cloudy') return `<svg viewBox="0 0 48 40" fill="none"><path d="M38 28H14a9 9 0 1 1 1.7-17.8A11 11 0 0 1 39 20a7 7 0 0 1-1 8z" fill="#888780"/></svg>`;
  if (t === 'rainy' || t === 'pouring' || t === 'lightning-rainy') return `<svg viewBox="0 0 48 40" fill="none"><path d="M36 22H16a8 8 0 1 1 1.5-15.8A10 10 0 0 1 37 15a6 6 0 0 1-1 7z" fill="#7A8E9B"/><line x1="16" y1="28" x2="13" y2="37" stroke="#378ADD" stroke-width="2.5" stroke-linecap="round"/><line x1="24" y1="28" x2="21" y2="37" stroke="#378ADD" stroke-width="2.5" stroke-linecap="round"/><line x1="32" y1="28" x2="29" y2="37" stroke="#378ADD" stroke-width="2.5" stroke-linecap="round"/></svg>`;
  if (t === 'snowy' || t === 'snowy-rainy') return `<svg viewBox="0 0 48 40" fill="none"><path d="M36 22H16a8 8 0 1 1 1.5-15.8A10 10 0 0 1 37 15a6 6 0 0 1-1 7z" fill="#B5D4F4"/><circle cx="16" cy="31" r="3" fill="#85B7EB"/><circle cx="24" cy="35" r="3" fill="#85B7EB"/><circle cx="32" cy="31" r="3" fill="#85B7EB"/></svg>`;
  if (t === 'fog') return `<svg viewBox="0 0 48 40" fill="none"><line x1="8" y1="14" x2="40" y2="14" stroke="#B4B2A9" stroke-width="2.5" stroke-linecap="round"/><line x1="6" y1="22" x2="42" y2="22" stroke="#B4B2A9" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="30" x2="38" y2="30" stroke="#B4B2A9" stroke-width="2.5" stroke-linecap="round"/></svg>`;
  return `<svg viewBox="0 0 48 40" fill="none"><path d="M36 22H16a8 8 0 1 1 1.5-15.8A10 10 0 0 1 37 15a6 6 0 0 1-1 7z" fill="#888780"/></svg>`;
}

class MeteoCardRomania extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._forecast = [];
    this._forecastFetched = false;
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
    if (!this._forecastFetched && this._config) {
      this._fetchForecast();
    }
  }

  setConfig(config) {
    if (!config.city) throw new Error('Trebuie specificat parametrul "city" (ex: brasov)');
    this._config = config;
    this._forecastFetched = false;
    this._forecast = [];
  }

  getCardSize() { return 4; }

  async _fetchForecast() {
    if (!this._hass || !this._config) return;
    this._forecastFetched = true;
    const weatherEntity = `weather.${this._config.city}_meteo`;
    try {
      const result = await this._hass.callWS({
        type: 'weather/get_forecasts',
        forecast_type: 'daily',
        entity_ids: [weatherEntity],
      });
      if (result && result[weatherEntity] && result[weatherEntity].forecast) {
        this._forecast = result[weatherEntity].forecast;
        this._render();
      }
    } catch (e) {
      const entity = this._hass.states[weatherEntity];
      if (entity && entity.attributes.forecast) {
        this._forecast = entity.attributes.forecast;
        this._render();
      }
    }
    // Refresh forecast every 30 min
    setTimeout(() => { this._forecastFetched = false; }, 30 * 60 * 1000);
  }

  _isNight() {
    const h = new Date().getHours();
    return h < 6 || h >= 21;
  }

  _getSkyData(condition) {
    const night = this._isNight();
    const tod = night ? 'night' : 'day';
    const colors = SKY_COLORS[tod];
    const c = (condition || 'sunny').toLowerCase();

    let key = c;
    if (!colors[key]) {
      if (c.includes('snow')) key = 'snowy';
      else if (c.includes('rain') || c.includes('pour') || c.includes('thunder') || c.includes('lightning')) key = 'rainy';
      else if (c.includes('cloud') || c.includes('overcast')) key = 'cloudy';
      else if (c.includes('partly')) key = 'partlycloudy';
      else if (c.includes('fog') || c.includes('mist')) key = 'fog';
      else key = night ? 'clear' : 'sunny';
    }

    const colorKey = colors[key] || colors[night ? 'clear' : 'sunny'];

    let svgKey;
    if (night) {
      if (key === 'rainy' || key === 'pouring' || key === 'lightning-rainy') svgKey = 'night_rainy';
      else if (key === 'snowy' || key === 'snowy-rainy') svgKey = 'night_snowy';
      else if (key === 'cloudy' || key === 'fog') svgKey = 'night_cloudy';
      else svgKey = 'night_clear';
    } else {
      if (key === 'rainy' || key === 'pouring' || key === 'lightning-rainy') svgKey = 'day_rainy';
      else if (key === 'snowy' || key === 'snowy-rainy') svgKey = 'day_snowy';
      else if (key === 'cloudy' || key === 'fog') svgKey = 'day_cloudy';
      else if (key === 'partlycloudy') svgKey = 'day_partlycloudy';
      else svgKey = 'day_sunny';
    }

    return { colorFrom: colorKey.from, colorTo: colorKey.to, svgKey };
  }

  _getState(entityId) {
    if (!this._hass) return 'unknown';
    const e = this._hass.states[entityId];
    return e ? e.state : 'unknown';
  }

  _getAttr(entityId, attr) {
    if (!this._hass) return null;
    const e = this._hass.states[entityId];
    return e ? e.attributes[attr] : null;
  }

  _formatTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
  }

  _formatDay(dateStr) {
    const date = new Date(dateStr);
    const days = ['Dum','Lun','Mar','Mie','Joi','Vin','Sâm'];
    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);
    if (date.toDateString() === today.toDateString()) return 'Azi';
    if (date.toDateString() === tomorrow.toDateString()) return 'Mâine';
    return days[date.getDay()];
  }

  _alertStyle(color) {
    const styles = {
      'Verde':      { bg: '#EAF3DE', dot: '#639922', title: '#27500A', txt: '#3B6D11' },
      'Galben':     { bg: '#FFFBC0', dot: '#C8A800', title: '#6B5800', txt: '#7A6400' },
      'Portocaliu': { bg: '#FFF0D6', dot: '#E07800', title: '#7A4000', txt: '#8A4800' },
      'Roșu':       { bg: '#FCEBEB', dot: '#E24B4A', title: '#791F1F', txt: '#A32D2D' },
    };
    return styles[color] || styles['Verde'];
  }

  _render() {
    if (!this._config || !this._hass) return;

    const city = this._config.city;
    const cityDisplay = this._config.city_name || city.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const weatherEntity  = `weather.${city}_meteo`;
    const tempEntity     = `sensor.${city}_temperature`;
    const humEntity      = `sensor.${city}_humidity`;
    const windEntity     = `sensor.${city}_wind_speed`;
    const windDirEntity  = `sensor.${city}_wind_direction`;
    const pressEntity    = `sensor.${city}_pressure`;
    const alertEntity    = `sensor.${city}_anm_alerts`;
    const alertColorEnt  = `sensor.${city}_alert_color`;

    const condition    = this._getState(weatherEntity);
    const temp         = this._getState(tempEntity);
    const hum          = this._getState(humEntity);
    const wind         = this._getState(windEntity);
    const windDir      = this._getState(windDirEntity);
    const pressure     = this._getState(pressEntity);
    const alertCount   = parseInt(this._getState(alertEntity)) || 0;
    const alertColor   = this._getState(alertColorEnt) || 'Verde';
    const alertDetails = this._getAttr(alertEntity, 'alerte_detalii') || [];
    const forecast     = this._forecast.length ? this._forecast : [];

    const sky       = this._getSkyData(condition);
    const condLabel = CONDITION_RO[condition] || condition;
    const alertSt   = this._alertStyle(alertColor);

    const forecastHtml = forecast.slice(0, 3).map(day => {
      const cond = (day.condition || 'cloudy').toLowerCase();
      const maxT = day.native_temperature != null ? Math.round(day.native_temperature) : (day.temperature != null ? Math.round(day.temperature) : '--');
      const minT = day.native_templow != null ? Math.round(day.native_templow) : (day.templow != null ? Math.round(day.templow) : '--');
      const rain = day.precipitation_probability != null ? day.precipitation_probability + '%' : '';
      return `
        <div class="fc-cell">
          <p class="fc-name">${this._formatDay(day.datetime)}</p>
          <div class="fc-art">${fcSvg(cond)}</div>
          <p class="fc-max">${maxT}°</p>
          <p class="fc-min">${minT}°</p>
          ${rain ? `<p class="fc-rain">${rain}</p>` : ''}
        </div>`;
    }).join('');

    let alertHtml = '';
    if (alertCount === 0) {
      alertHtml = `<p class="al-title" style="color:${alertSt.title}">Fără avertizări active</p>
                   <p class="al-txt" style="color:${alertSt.txt}">Nu există alerte ANM active în acest moment</p>`;
    } else {
      const detail = alertDetails[0] || {};
      alertHtml = `
        <p class="al-title" style="color:${alertSt.title}">Alertă ANM ${alertColor}</p>
        ${detail.fenomene ? `<p class="al-txt" style="color:${alertSt.txt}">⚡ ${detail.fenomene}</p>` : ''}
        ${detail.interval ? `<p class="al-txt" style="color:${alertSt.txt}">🕐 ${detail.interval}</p>` : ''}
        ${detail.mesaj ? `<p class="al-txt" style="color:${alertSt.txt}">${detail.mesaj.substring(0, 300)}</p>` : ''}`;
    }

    const svgContent = SKY_SVGS[sky.svgKey] || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .card { background: var(--card-background-color, #fff); border-radius: 16px; overflow: hidden; box-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0,0,0,.1)); }
        .head { position: relative; height: 140px; overflow: hidden; }
        .sky-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(0,0,0,.05) 0%, rgba(0,0,0,.42) 100%); }
        .head-content { position: absolute; top: 0; left: 0; right: 0; bottom: 0; padding: 16px 20px; display: flex; justify-content: space-between; align-items: flex-start; }
        .city { font-size: 13px; font-weight: 500; margin: 0 0 2px; color: rgba(255,255,255,.9); }
        .temp { font-size: 48px; font-weight: 500; line-height: 1; margin: 0; color: #fff; }
        .cond { font-size: 13px; margin: 4px 0 0; color: rgba(255,255,255,.85); }
        .time { font-size: 22px; font-weight: 500; margin: 0 0 6px; color: #fff; text-align: right; }
        .det-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--divider-color, #e0e0e0); }
        .det-cell { background: var(--card-background-color, #fff); padding: 10px; text-align: center; }
        .det-lbl { font-size: 11px; color: var(--secondary-text-color, #888); margin: 0 0 2px; text-transform: uppercase; letter-spacing: .04em; }
        .det-val { font-size: 14px; font-weight: 500; color: var(--primary-text-color, #212121); margin: 0; }
        .sec-title { padding: 8px 16px 4px; font-size: 11px; color: var(--secondary-text-color, #888); text-transform: uppercase; letter-spacing: .05em; margin: 0; background: var(--card-background-color, #fff); }
        .fc-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--divider-color, #e0e0e0); }
        .fc-cell { background: var(--secondary-background-color, #f5f5f5); padding: 10px 6px; text-align: center; }
        .fc-name { font-size: 11px; color: var(--secondary-text-color, #888); margin: 0 0 4px; text-transform: uppercase; letter-spacing: .04em; }
        .fc-art { width: 44px; height: 36px; margin: 0 auto; }
        .fc-art svg { width: 100%; height: 100%; }
        .fc-max { font-size: 14px; font-weight: 500; color: var(--primary-text-color, #212121); margin: 4px 0 0; }
        .fc-min { font-size: 12px; color: var(--secondary-text-color, #888); margin: 0; }
        .fc-rain { font-size: 11px; color: #378ADD; margin: 2px 0 0; }
        .al-bar { padding: 12px 16px; display: flex; align-items: flex-start; gap: 10px; }
        .al-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; margin-top: 3px; }
        .al-title { font-size: 13px; font-weight: 500; margin: 0 0 2px; }
        .al-txt { font-size: 12px; margin: 2px 0 0; line-height: 1.5; }
        .footer { padding: 8px 16px 10px; border-top: 1px solid var(--divider-color, #e0e0e0); display: flex; justify-content: space-between; }
        .footer p { font-size: 11px; color: var(--disabled-text-color, #bbb); margin: 0; }
      </style>
      <ha-card class="card">
        <div class="head">
          <svg class="sky-bg" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="skygrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${sky.colorFrom}"/>
                <stop offset="100%" stop-color="${sky.colorTo}"/>
              </linearGradient>
            </defs>
            <rect width="420" height="140" fill="url(#skygrad)"/>
            ${svgContent}
          </svg>
          <div class="overlay"></div>
          <div class="head-content">
            <div>
              <p class="city">${cityDisplay}</p>
              <p class="temp">${temp !== 'unknown' ? Math.round(parseFloat(temp)) + '°C' : '--'}</p>
              <p class="cond">${condLabel}</p>
            </div>
            <div>
              <p class="time">${this._formatTime()}</p>
            </div>
          </div>
        </div>

        <div class="det-row">
          <div class="det-cell">
            <p class="det-lbl">Umiditate</p>
            <p class="det-val">${hum !== 'unknown' ? Math.round(parseFloat(hum)) + '%' : '--'}</p>
          </div>
          <div class="det-cell">
            <p class="det-lbl">Vânt</p>
            <p class="det-val">${wind !== 'unknown' ? Math.round(parseFloat(wind) * 3.6) + ' km/h' : '--'} ${windDir !== 'unknown' ? windDir : ''}</p>
          </div>
          <div class="det-cell">
            <p class="det-lbl">Presiune</p>
            <p class="det-val">${pressure !== 'unknown' ? Math.round(parseFloat(pressure)) + ' hPa' : '--'}</p>
          </div>
        </div>

        <p class="sec-title">Prognoză 3 zile</p>
        <div class="fc-row">${forecastHtml || '<div style="grid-column:1/-1;padding:16px;text-align:center;font-size:13px;color:var(--secondary-text-color)">Se încarcă prognoza...</div>'}</div>

        <div class="al-bar" style="background:${alertSt.bg}">
          <div class="al-dot" style="background:${alertSt.dot}"></div>
          <div>${alertHtml}</div>
        </div>

        <div class="footer">
          <p>Date meteo: ANM România</p>
          <p>Prognoză: Open-Meteo</p>
        </div>
      </ha-card>`;
  }
}

customElements.define('meteo-card-romania', MeteoCardRomania);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'meteo-card-romania',
  name: 'Meteo Card Romania',
  description: 'Card meteo stilizat pentru integrarea Info Meteo Romania — ANM + Open-Meteo',
  preview: true,
  documentationURL: 'https://github.com/dramuletz/meteo_card_romania',
});

console.info(
  `%c METEO-CARD-ROMANIA %c v${CARD_VERSION} `,
  'color:white;background:#1B8FD4;font-weight:bold;padding:2px 6px;border-radius:4px 0 0 4px;',
  'color:#1B8FD4;background:#f0f8ff;font-weight:bold;padding:2px 6px;border-radius:0 4px 4px 0;'
);
