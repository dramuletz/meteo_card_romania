/**
 * Meteo Card Romania
 * Card Lovelace pentru integrarea Info Meteo Romania
 * Autor: Stefan Dram
 * https://github.com/dramuletz/meteo_card_romania
 */

const CARD_VERSION = '1.0.0';

const SKY_IMAGES = {
  sunny:        '/local/meteo_card_romania/images/day_sunny.jpg',
  partlycloudy: '/local/meteo_card_romania/images/day_partly.jpg',
  cloudy:       '/local/meteo_card_romania/images/day_cloudy.jpg',
  rainy:        '/local/meteo_card_romania/images/day_rainy.jpg',
  pouring:      '/local/meteo_card_romania/images/day_rainy.jpg',
  snowy:        '/local/meteo_card_romania/images/day_snowy.jpg',
  'snowy-rainy':'/local/meteo_card_romania/images/day_snowy.jpg',
  fog:          '/local/meteo_card_romania/images/day_cloudy.jpg',
  'lightning-rainy': '/local/meteo_card_romania/images/day_rainy.jpg',
};

const SKY_IMAGES_NIGHT = {
  sunny:        '/local/meteo_card_romania/images/night_clear.jpg',
  partlycloudy: '/local/meteo_card_romania/images/night_clear.jpg',
  cloudy:       '/local/meteo_card_romania/images/night_cloudy.jpg',
  rainy:        '/local/meteo_card_romania/images/night_rainy.jpg',
  pouring:      '/local/meteo_card_romania/images/night_rainy.jpg',
  snowy:        '/local/meteo_card_romania/images/night_snowy.jpg',
  'snowy-rainy':'/local/meteo_card_romania/images/night_snowy.jpg',
  fog:          '/local/meteo_card_romania/images/night_cloudy.jpg',
  'lightning-rainy': '/local/meteo_card_romania/images/night_rainy.jpg',
};

const CONDITION_RO = {
  sunny:        'Cer senin',
  partlycloudy: 'Parțial noros',
  cloudy:       'Cer noros',
  rainy:        'Ploaie',
  pouring:      'Ploaie torențială',
  snowy:        'Ninsoare',
  'snowy-rainy':'Lapoviță',
  fog:          'Ceață',
  'lightning-rainy': 'Furtună',
  clear:        'Cer senin',
};

const WMO_CONDITION = {
  0:'sunny', 1:'sunny', 2:'partlycloudy', 3:'cloudy',
  45:'fog', 48:'fog',
  51:'rainy', 53:'rainy', 55:'rainy',
  61:'rainy', 63:'rainy', 65:'pouring',
  71:'snowy', 73:'snowy', 75:'snowy', 77:'snowy',
  80:'rainy', 81:'pouring', 82:'pouring',
  85:'snowy-rainy', 86:'snowy',
  95:'lightning-rainy', 96:'lightning-rainy', 99:'lightning-rainy',
};

function fcSvg(type) {
  if (type === 'sunny') return `<svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="18" r="9" fill="#FFC830"/><line x1="24" y1="4" x2="24" y2="9" stroke="#FFC830" stroke-width="2.5" stroke-linecap="round"/><line x1="24" y1="27" x2="24" y2="32" stroke="#FFC830" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="18" x2="15" y2="18" stroke="#FFC830" stroke-width="2.5" stroke-linecap="round"/><line x1="33" y1="18" x2="38" y2="18" stroke="#FFC830" stroke-width="2.5" stroke-linecap="round"/><line x1="14" y1="8" x2="18" y2="12" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="24" x2="34" y2="28" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/><line x1="34" y1="8" x2="30" y2="12" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="24" x2="14" y2="28" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/></svg>`;
  if (type === 'partlycloudy') return `<svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="17" cy="14" r="8" fill="#FFC830"/><line x1="17" y1="3" x2="17" y2="6.5" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/><line x1="28" y1="14" x2="31.5" y2="14" stroke="#FFC830" stroke-width="2" stroke-linecap="round"/><line x1="24.8" y1="6.2" x2="27.3" y2="8.7" stroke="#FFC830" stroke-width="1.5" stroke-linecap="round"/><path d="M37 30H15a9 9 0 1 1 1.8-17.8A11 11 0 0 1 38 22a7 7 0 0 1-1 8z" fill="#BCC8D4"/></svg>`;
  if (type === 'cloudy') return `<svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38 28H14a9 9 0 1 1 1.7-17.8A11 11 0 0 1 39 20a7 7 0 0 1-1 8z" fill="#888780"/></svg>`;
  if (type === 'rainy' || type === 'pouring' || type === 'lightning-rainy') return `<svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 22H16a8 8 0 1 1 1.5-15.8A10 10 0 0 1 37 15a6 6 0 0 1-1 7z" fill="#7A8E9B"/><line x1="16" y1="28" x2="13" y2="37" stroke="#378ADD" stroke-width="2.5" stroke-linecap="round"/><line x1="24" y1="28" x2="21" y2="37" stroke="#378ADD" stroke-width="2.5" stroke-linecap="round"/><line x1="32" y1="28" x2="29" y2="37" stroke="#378ADD" stroke-width="2.5" stroke-linecap="round"/></svg>`;
  if (type === 'snowy' || type === 'snowy-rainy') return `<svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 22H16a8 8 0 1 1 1.5-15.8A10 10 0 0 1 37 15a6 6 0 0 1-1 7z" fill="#B5D4F4"/><circle cx="16" cy="31" r="3" fill="#85B7EB"/><circle cx="24" cy="35" r="3" fill="#85B7EB"/><circle cx="32" cy="31" r="3" fill="#85B7EB"/></svg>`;
  if (type === 'fog') return `<svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="8" y1="14" x2="40" y2="14" stroke="#B4B2A9" stroke-width="2.5" stroke-linecap="round"/><line x1="6" y1="22" x2="42" y2="22" stroke="#B4B2A9" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="30" x2="38" y2="30" stroke="#B4B2A9" stroke-width="2.5" stroke-linecap="round"/></svg>`;
  return `<svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 22H16a8 8 0 1 1 1.5-15.8A10 10 0 0 1 37 15a6 6 0 0 1-1 7z" fill="#888780"/></svg>`;
}

class MeteoCardRomania extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  setConfig(config) {
    if (!config.city) throw new Error('Trebuie specificat parametrul "city" (ex: brasov)');
    this._config = config;
  }

  getCardSize() { return 4; }

  _isNight() {
    const h = new Date().getHours();
    return h < 6 || h >= 21;
  }

  _getSkyImage(condition) {
    const night = this._isNight();
    const map = night ? SKY_IMAGES_NIGHT : SKY_IMAGES;
    return map[condition] || (night
      ? '/local/meteo_card_romania/images/night_clear.jpg'
      : '/local/meteo_card_romania/images/day_sunny.jpg');
  }

  _getState(entityId) {
    if (!this._hass) return 'unknown';
    const entity = this._hass.states[entityId];
    return entity ? entity.state : 'unknown';
  }

  _getAttr(entityId, attr) {
    if (!this._hass) return null;
    const entity = this._hass.states[entityId];
    return entity ? entity.attributes[attr] : null;
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
      'Verde':     { bg: '#EAF3DE', dot: '#639922', title: '#27500A', txt: '#3B6D11' },
      'Galben':    { bg: '#FFFBC0', dot: '#C8A800', title: '#6B5800', txt: '#7A6400' },
      'Portocaliu':{ bg: '#FFF0D6', dot: '#E07800', title: '#7A4000', txt: '#8A4800' },
      'Roșu':      { bg: '#FCEBEB', dot: '#E24B4A', title: '#791F1F', txt: '#A32D2D' },
    };
    return styles[color] || styles['Verde'];
  }

  _render() {
    if (!this._config || !this._hass) return;

    const city = this._config.city;
    const cityDisplay = this._config.city_name || city.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const weatherEntity = `weather.${city}_meteo`;
    const tempEntity    = `sensor.${city}_temperature`;
    const humEntity     = `sensor.${city}_humidity`;
    const windEntity    = `sensor.${city}_wind_speed`;
    const windDirEntity = `sensor.${city}_wind_direction`;
    const pressEntity   = `sensor.${city}_pressure`;
    const alertEntity   = `sensor.${city}_anm_alerts`;
    const alertColorEnt = `sensor.${city}_alert_color`;

    const condition  = this._getState(weatherEntity);
    const temp       = this._getState(tempEntity);
    const hum        = this._getState(humEntity);
    const wind       = this._getState(windEntity);
    const windDir    = this._getState(windDirEntity);
    const pressure   = this._getState(pressEntity);
    const alertCount = parseInt(this._getState(alertEntity)) || 0;
    const alertColor = this._getState(alertColorEnt) || 'Verde';
    const alertDetails = this._getAttr(alertEntity, 'alerte_detalii') || [];
    const forecast   = this._getAttr(weatherEntity, 'forecast') || [];

    const skyImg    = this._getSkyImage(condition);
    const condLabel = CONDITION_RO[condition] || condition;
    const alertSt   = this._alertStyle(alertColor);

    const forecastHtml = forecast.slice(0,3).map(day => {
      const cond = WMO_CONDITION[day.condition] || day.condition || 'cloudy';
      const maxT = day.native_temperature != null ? Math.round(day.native_temperature) : '--';
      const minT = day.native_templow != null ? Math.round(day.native_templow) : '--';
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
        ${detail.mesaj    ? `<p class="al-txt" style="color:${alertSt.txt}">${detail.mesaj.substring(0,300)}</p>` : ''}`;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .card { background: var(--card-background-color, #fff); border-radius: 16px; overflow: hidden; box-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0,0,0,.1)); }
        .head { position: relative; height: 140px; overflow: hidden; }
        .sky { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sky-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(0,0,0,.08) 0%, rgba(0,0,0,.48) 100%); }
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
          <img class="sky" src="${skyImg}" alt="cer"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='block'"/>
          <svg class="sky-svg" style="display:none" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid slice">
            <rect width="420" height="140" fill="${this._isNight() ? '#0A1828' : '#1B8FD4'}"/>
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
        <div class="fc-row">${forecastHtml || '<div class="fc-cell" style="grid-column:1/-1;padding:16px;text-align:center;font-size:13px;color:var(--secondary-text-color)">Prognoza indisponibilă</div>'}</div>

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

console.info(`%c METEO-CARD-ROMANIA %c v${CARD_VERSION} `,
  'color: white; background: #1B8FD4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #1B8FD4; background: #f0f8ff; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;'
);
