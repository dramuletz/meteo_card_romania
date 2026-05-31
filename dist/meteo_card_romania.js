/**
 * Meteo Card Romania
 * Card Lovelace pentru integrarea Info Meteo Romania
 * Autor: Stefan Dram
 * https://github.com/dramuletz/meteo_card_romania
 */

const CARD_VERSION = '1.2.0';

// Culori fundal in functie de starea vremii
const SKY_COLORS = {
  day: {
    sunny:             '#E6F1FB',
    partlycloudy:      '#D3E8F5',
    cloudy:            '#C8CDD2',
    rainy:             '#A8B4BC',
    pouring:           '#9AA6AE',
    snowy:             '#D8E8F0',
    'snowy-rainy':     '#C8D8E4',
    fog:               '#C0C8CE',
    'lightning-rainy': '#9AA4AE',
    clear:             '#E6F1FB',
  },
  night: {
    sunny:             '#0C1E35',
    partlycloudy:      '#0E2038',
    cloudy:            '#121C28',
    rainy:             '#0C1622',
    pouring:           '#0A1420',
    snowy:             '#102030',
    'snowy-rainy':     '#0E1E2E',
    fog:               '#101820',
    'lightning-rainy': '#08101A',
    clear:             '#0A1828',
  }
};

// Culori text in functie de zi/noapte
const TEXT_COLORS = {
  day:   { primary: '#042C53', secondary: '#185FA5', sub: 'rgba(4,44,83,.8)' },
  night: { primary: '#E6F1FB', secondary: '#85B7EB', sub: 'rgba(230,241,251,.8)' }
};

// Pictograme emoji pentru starea vremii
const CONDITION_ICONS = {
  sunny:             '☀️',
  partlycloudy:      '⛅',
  cloudy:            '☁️',
  rainy:             '🌧️',
  pouring:           '⛈️',
  snowy:             '❄️',
  'snowy-rainy':     '🌨️',
  fog:               '🌫️',
  'lightning-rainy': '⛈️',
  clear:             '🌙',
  unknown:           '🌡️',
};

const CONDITION_RO = {
  sunny:             'Cer senin',
  partlycloudy:      'Parțial noros',
  cloudy:            'Cer noros',
  rainy:             'Ploaie',
  pouring:           'Ploaie torențială',
  snowy:             'Ninsoare',
  'snowy-rainy':     'Lapoviță',
  fog:               'Ceață',
  'lightning-rainy': 'Furtună',
  clear:             'Cer senin',
};

const FC_ICONS = {
  sunny:             '☀️',
  partlycloudy:      '⛅',
  cloudy:            '☁️',
  rainy:             '🌧️',
  pouring:           '⛈️',
  snowy:             '❄️',
  'snowy-rainy':     '🌨️',
  fog:               '🌫️',
  'lightning-rainy': '⛈️',
};

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
    const weatherEntity = `weather.${this._config.city}`;
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
    setTimeout(() => { this._forecastFetched = false; }, 30 * 60 * 1000);
  }

  _isNight() {
    const h = new Date().getHours();
    return h < 6 || h >= 21;
  }

  _getConditionKey(condition) {
    const c = (condition || '').toLowerCase();
    if (SKY_COLORS.day[c]) return c;
    if (c.includes('snow')) return 'snowy';
    if (c.includes('rain') || c.includes('pour')) return 'rainy';
    if (c.includes('thunder') || c.includes('lightning')) return 'lightning-rainy';
    if (c.includes('cloud') || c.includes('overcast')) return 'cloudy';
    if (c.includes('partly')) return 'partlycloudy';
    if (c.includes('fog') || c.includes('mist')) return 'fog';
    return this._isNight() ? 'clear' : 'sunny';
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

    const city        = this._config.city;
    const cityDisplay = this._config.city_name || city.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const weatherEntity = `weather.${city}`;
    const tempEntity    = `sensor.${city}_temperature`;
    const humEntity     = `sensor.${city}_humidity`;
    const windEntity    = `sensor.${city}_wind_speed`;
    const windDirEntity = `sensor.${city}_wind_direction`;
    const pressEntity   = `sensor.${city}_pressure`;
    const alertEntity   = `sensor.${city}_anm_alerts`;
    const alertColorEnt = `sensor.${city}_alert_color`;

    const condition    = this._getState(weatherEntity);
    const temp         = this._getState(tempEntity);
    const hum          = this._getState(humEntity);
    const wind         = this._getState(windEntity);
    const windDir      = this._getState(windDirEntity);
    const pressure     = this._getState(pressEntity);
    const alertCount   = parseInt(this._getState(alertEntity)) || 0;
    const alertColor   = this._getState(alertColorEnt) || 'Verde';
    const alertDetails = this._getAttr(alertEntity, 'alerte_detalii') || [];
    const forecast     = this._forecast;

    const night      = this._isNight();
    const tod        = night ? 'night' : 'day';
    const condKey    = this._getConditionKey(condition);
    const bgColor    = SKY_COLORS[tod][condKey] || SKY_COLORS[tod].sunny;
    const textColors = TEXT_COLORS[tod];
    const condIcon   = CONDITION_ICONS[condKey] || '🌡️';
    const condLabel  = CONDITION_RO[condKey] || condition;
    const alertSt    = this._alertStyle(alertColor);

    const forecastHtml = forecast.slice(0, 3).map(day => {
      const cond = (day.condition || 'cloudy').toLowerCase();
      const icon = FC_ICONS[cond] || FC_ICONS[this._getConditionKey(cond)] || '☁️';
      const maxT = day.native_temperature != null ? Math.round(day.native_temperature) : (day.temperature != null ? Math.round(day.temperature) : '--');
      const minT = day.native_templow != null ? Math.round(day.native_templow) : (day.templow != null ? Math.round(day.templow) : '--');
      const rain = day.precipitation_probability != null ? day.precipitation_probability + '%' : '';
      return `
        <div class="fc-cell">
          <p class="fc-name">${this._formatDay(day.datetime)}</p>
          <div class="fc-icon">${icon}</div>
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
        ${detail.mesaj    ? `<p class="al-txt" style="color:${alertSt.txt}">${detail.mesaj.substring(0, 300)}</p>` : ''}`;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .card { background: var(--card-background-color, #fff); border-radius: 16px; overflow: hidden; box-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0,0,0,.1)); }
        .head { padding: 20px; display: flex; justify-content: space-between; align-items: flex-start; background: ${bgColor}; min-height: 120px; }
        .city  { font-size: 13px; font-weight: 500; margin: 0 0 2px; color: ${textColors.secondary}; }
        .temp  { font-size: 48px; font-weight: 500; line-height: 1; margin: 0; color: ${textColors.primary}; }
        .cond  { font-size: 13px; margin: 4px 0 0; color: ${textColors.sub}; }
        .time  { font-size: 22px; font-weight: 500; margin: 0 0 4px; color: ${textColors.secondary}; text-align: right; }
        .wx-icon { font-size: 52px; line-height: 1; text-align: right; }
        .det-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--divider-color, #e0e0e0); }
        .det-cell { background: var(--card-background-color, #fff); padding: 10px; text-align: center; }
        .det-lbl { font-size: 11px; color: var(--secondary-text-color, #888); margin: 0 0 2px; text-transform: uppercase; letter-spacing: .04em; }
        .det-val { font-size: 14px; font-weight: 500; color: var(--primary-text-color, #212121); margin: 0; }
        .sec-title { padding: 8px 16px 4px; font-size: 11px; color: var(--secondary-text-color, #888); text-transform: uppercase; letter-spacing: .05em; margin: 0; background: var(--card-background-color, #fff); }
        .fc-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--divider-color, #e0e0e0); }
        .fc-cell { background: var(--secondary-background-color, #f5f5f5); padding: 10px 6px; text-align: center; }
        .fc-name { font-size: 11px; color: var(--secondary-text-color, #888); margin: 0 0 2px; text-transform: uppercase; letter-spacing: .04em; }
        .fc-icon { font-size: 28px; line-height: 1; margin: 2px 0; }
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
          <div>
            <p class="city">${cityDisplay}</p>
            <p class="temp">${temp !== 'unknown' ? Math.round(parseFloat(temp)) + '°C' : '--'}</p>
            <p class="cond">${condLabel}</p>
          </div>
          <div>
            <p class="time">${this._formatTime()}</p>
            <div class="wx-icon">${condIcon}</div>
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
