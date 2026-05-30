# 🌦️ Meteo Card Romania

<div align="center">

[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge&logo=homeassistantcommunitystore&logoColor=white)](https://github.com/hacs/integration)
[![Release](https://img.shields.io/github/v/release/dramuletz/meteo_card_romania?style=for-the-badge&color=blue)](https://github.com/dramuletz/meteo_card_romania/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**Card Lovelace stilizat pentru integrarea [Info Meteo Romania](https://github.com/dramuletz/info_meteo_romania)**

</div>

---

## Despre card

Card vizual pentru Home Assistant care afișează datele meteo ANM într-un format elegant, cu:

- **Fundal dinamic** — imagini de cer diferite în funcție de starea vremii (zi/noapte)
- **Temperatură** mare și vizibilă
- **Prognoză 3 zile** cu iconițe colorate
- **Alertă ANM** colorată (Verde / Galben / Portocaliu / Roșu)
- **Oră curentă** afișată în header

---

## Cerințe

Acest card necesită integrarea **[Info Meteo Romania](https://github.com/dramuletz/info_meteo_romania)** instalată și configurată.

---

## Instalare via HACS

1. Deschide **HACS** → **Frontend**
2. Click pe **⋮** → **Custom repositories**
3. Adaugă: `https://github.com/dramuletz/meteo_card_romania` → categorie **Lovelace**
4. Caută **Meteo Card Romania** și instalează
5. Adaugă resursa în **Settings → Dashboards → Resources**:
   ```
   /hacsfiles/meteo_card_romania/meteo-card-romania.js
   ```
6. Repornește Home Assistant

---

## Configurare

```yaml
type: custom:meteo-card-romania
city: brasov
city_name: Brașov
```

### Parametri

| Parametru | Obligatoriu | Descriere |
|-----------|-------------|-----------|
| `city` | DA | Slug-ul localității (ex: `brasov`, `cluj_napoca`) |
| `city_name` | Nu | Numele afișat în card (ex: `Brașov`) |

---

## Exemple

```yaml
type: custom:meteo-card-romania
city: brasov
city_name: Brașov
```

```yaml
type: custom:meteo-card-romania
city: cluj_napoca
city_name: Cluj-Napoca
```

```yaml
type: custom:meteo-card-romania
city: timisoara
city_name: Timișoara
```

---

## Imagini fundal

Cardul include 9 imagini de fundal pentru fiecare stare meteo:

| Stare | Zi | Noapte |
|-------|-----|--------|
| Cer senin | ☀️ Cer albastru cu soare | 🌙 Cer întunecat cu stele și lună |
| Parțial noros | ⛅ Soare cu nori | 🌙 Noapte cu lună parțial acoperită |
| Noros | ☁️ Cer acoperit cu nori | 🌑 Noapte noroasă |
| Ploaie | 🌧️ Cer întunecat cu ploaie | 🌧️ Ploaie nocturnă |
| Ninsoare | ❄️ Cer alb cu fulgi | ❄️ Ninsoare nocturnă |

---

## Culori alerte ANM

| Cod | Culoare fundal | Semnificație |
|-----|---------------|--------------|
| Verde | `#EAF3DE` | Fără avertizări |
| Galben | `#FFFBC0` | Atenționare |
| Portocaliu | `#FFF0D6` | Avertizare |
| Roșu | `#FCEBEB` | Avertizare severă |

---

<div align="center">

Dezvoltat cu ❤️ de [Stefan Dram](https://github.com/dramuletz)

Date: **ANM România** · Prognoză: **Open-Meteo**

</div>
