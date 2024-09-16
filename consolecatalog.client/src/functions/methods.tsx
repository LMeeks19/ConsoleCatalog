import { format } from "date-fns";
import { Platforms, TrophyTypeNumber, TrophyTypeString } from "./enums";
import { COVER_BIG_URL, COVER_SMALL } from "./utils";
import platinum_icon from "../images/psn-trophy-platinum.png";
import gold_icon from "../images/psn-trophy-gold.png";
import silver_icon from "../images/psn-trophy-silver.png";
import bronze_icon from "../images/psn-trophy-bronze.png";
import { DefinedTrophyGroup, DefinedTrophyGroupObject, EarnedTitleTrophy, EarnedTrophyGroup, EarnedTrophyGroupObject, TitleTrophy, Trophy, TrophyGroup, TrophyGroupObject } from "./interfaces/interfaces";

export function getFullCardImageUrl(imageId: string) {
  return `${COVER_BIG_URL}/${imageId}.jpg`;
}

export function getFullSearchImageUrl(imageId: string) {
  return `${COVER_SMALL}/${imageId}.jpg`;
}

export function getRatingColour(rating: number): string {
  if (rating > 90) return "amazing";
  else if (rating > 70) return "good";
  else if (rating > 50) return "average";
  else if (rating > 30) return "bad";
  return "awful";
}

export function getProgressColour(rating: number): string {
  if (rating > 90) return "#06803d";
  else if (rating > 70) return "#00ce7a";
  else if (rating > 50) return "#ffbd3f";
  else if (rating > 30) return "#ff6874";
  return "#f11528";
}

export function isPSTitle(abbreviation: string): boolean {
  return (
    abbreviation === Platforms.PS1 ||
    abbreviation === Platforms.PS2 ||
    abbreviation === Platforms.PS3 ||
    abbreviation === Platforms.PS4 ||
    abbreviation === Platforms.PS5
  );
}

export function getTrophyTypeIcon(type: string) {
  if (type === TrophyTypeString.Platinum) return platinum_icon;
  else if (type === TrophyTypeString.Gold) return gold_icon;
  else if (type === TrophyTypeString.Silver) return silver_icon;
  return bronze_icon;
}

export function getTrophyType(type: string): TrophyTypeNumber {
  if (type === TrophyTypeString.Platinum) return TrophyTypeNumber.Platinum;
  else if (type === TrophyTypeString.Gold) return TrophyTypeNumber.Gold;
  else if (type === TrophyTypeString.Silver) return TrophyTypeNumber.Silver;
  return TrophyTypeNumber.Bronze;
}

export function getTrophyRarity(rarity: number) {
  if (rarity === 0) return "Ultra Rare";
  else if (rarity === 1) return "Very Rare";
  else if (rarity === 2) return "Rare";
  return "Common";
}

export function FormatNumberDate(date: number | null | undefined): string {
  if (date !== null && date !== undefined)
    return format(date * 1000, "do MMMM yyyy");
  return "";
}

export function FormatStringDate(date: string | null | undefined): string {
  if (date !== null && date !== undefined) return format(date, "do MMMM yyyy");
  return "";
}

export function GetTrophyGroupName(trophyGroupId: string) {
  if (trophyGroupId === "default")
    return "Base Game";
  return `DLC ${Number(trophyGroupId)}`
}

export function mergeTrophyArrays(
  titleTrophies: TitleTrophy[],
  earnedTrophies: EarnedTitleTrophy[],
  psnProfileId: number,
  titleId: string
): Trophy[] {
  let mergedArray = new Array<Trophy>();

  if (earnedTrophies.length === 0) return titleTrophies as Trophy[];

  mergedArray = titleTrophies?.map((titleTrophy) => {
    let earnedTitleTrophy = earnedTrophies!.find(
      (earnedTitleTrophy) => earnedTitleTrophy.trophyId === titleTrophy.trophyId
    );
    return {
      ...titleTrophy!,
      psnProfileId: psnProfileId,
      titleId: titleId,
      earned: earnedTitleTrophy?.earned ?? false,
      earnedDateTime: earnedTitleTrophy?.earnedDateTime ?? null,
      trophyEarnedRate: earnedTitleTrophy?.trophyEarnedRate ?? null,
      trophyRare: earnedTitleTrophy?.trophyRare ?? null,
      progress: earnedTitleTrophy?.progress ?? null,
      progressRate: earnedTitleTrophy?.progressRate ?? null,
      progressedDateTime: earnedTitleTrophy?.progressedDateTime ?? null,
    } as Trophy;
  });
  return mergedArray;
}

export function mergeTrophyGroupObjects(
  definedTrophyGroupObject: DefinedTrophyGroupObject,
  earnedTrophyGroupObject: EarnedTrophyGroupObject
) {
  let mergedTrophyGroupObject = {
    ...definedTrophyGroupObject,
    lastUpdatedDateTime: earnedTrophyGroupObject.lastUpdatedDateTime,
    progress: earnedTrophyGroupObject.progress,
    earnedTrophies: earnedTrophyGroupObject.earnedTrophies,
    trophyGroups: mergeTrophyGroups(
      definedTrophyGroupObject.trophyGroups,
      earnedTrophyGroupObject.trophyGroups
    ),
  } as TrophyGroupObject;
  return mergedTrophyGroupObject;
}

export function mergeTrophyGroups(
  definedTrophyGroups: DefinedTrophyGroup[],
  earnedTrophyGroups: EarnedTrophyGroup[]
): TrophyGroup[] {
  let mergedTrophyGroups = definedTrophyGroups.map((trophyGroup) => {
    let earnedTrophyGroup = earnedTrophyGroups.find(
      (etg) => etg.trophyGroupId === trophyGroup.trophyGroupId
    );
    return {
      ...trophyGroup,
      earnedTrophies: earnedTrophyGroup?.earnedTrophies,
      lastUpdatedDateTime: earnedTrophyGroup?.lastUpdatedDateTime,
      progress: earnedTrophyGroup?.progress,
    } as TrophyGroup;
  });
  return mergedTrophyGroups;
}

var LANGUAGE_BY_LOCALE = {
  af_NA: "Afrikaans (Namibia)",
  af_ZA: "Afrikaans (South Africa)",
  af: "Afrikaans",
  ak_GH: "Akan (Ghana)",
  ak: "Akan",
  sq_AL: "Albanian (Albania)",
  sq: "Albanian",
  am_ET: "Amharic (Ethiopia)",
  am: "Amharic",
  ar_DZ: "Arabic (Algeria)",
  ar_BH: "Arabic (Bahrain)",
  ar_EG: "Arabic (Egypt)",
  ar_IQ: "Arabic (Iraq)",
  ar_JO: "Arabic (Jordan)",
  ar_KW: "Arabic (Kuwait)",
  ar_LB: "Arabic (Lebanon)",
  ar_LY: "Arabic (Libya)",
  ar_MA: "Arabic (Morocco)",
  ar_OM: "Arabic (Oman)",
  ar_QA: "Arabic (Qatar)",
  ar_SA: "Arabic (Saudi Arabia)",
  ar_SD: "Arabic (Sudan)",
  ar_SY: "Arabic (Syria)",
  ar_TN: "Arabic (Tunisia)",
  ar_AE: "Arabic (United Arab Emirates)",
  ar_YE: "Arabic (Yemen)",
  ar: "Arabic",
  hy_AM: "Armenian (Armenia)",
  hy: "Armenian",
  as_IN: "Assamese (India)",
  as: "Assamese",
  asa_TZ: "Asu (Tanzania)",
  asa: "Asu",
  az_Cyrl: "Azerbaijani (Cyrillic)",
  az_Cyrl_AZ: "Azerbaijani (Cyrillic, Azerbaijan)",
  az_Latn: "Azerbaijani (Latin)",
  az_Latn_AZ: "Azerbaijani (Latin, Azerbaijan)",
  az: "Azerbaijani",
  bm_ML: "Bambara (Mali)",
  bm: "Bambara",
  eu_ES: "Basque (Spain)",
  eu: "Basque",
  be_BY: "Belarusian (Belarus)",
  be: "Belarusian",
  bem_ZM: "Bemba (Zambia)",
  bem: "Bemba",
  bez_TZ: "Bena (Tanzania)",
  bez: "Bena",
  bn_BD: "Bengali (Bangladesh)",
  bn_IN: "Bengali (India)",
  bn: "Bengali",
  bs_BA: "Bosnian (Bosnia and Herzegovina)",
  bs: "Bosnian",
  bg_BG: "Bulgarian (Bulgaria)",
  bg: "Bulgarian",
  my_MM: "Burmese (Myanmar [Burma])",
  my: "Burmese",
  yue_Hant_HK: "Cantonese (Traditional, Hong Kong SAR China)",
  ca_ES: "Catalan (Spain)",
  ca: "Catalan",
  tzm_Latn: "Central Morocco Tamazight (Latin)",
  tzm_Latn_MA: "Central Morocco Tamazight (Latin, Morocco)",
  tzm: "Central Morocco Tamazight",
  chr_US: "Cherokee (United States)",
  chr: "Cherokee",
  cgg_UG: "Chiga (Uganda)",
  cgg: "Chiga",
  zh_Hans: "Chinese (Simplified Han)",
  zh_Hans_CN: "Chinese (Simplified Han, China)",
  zh_Hans_HK: "Chinese (Simplified Han, Hong Kong SAR China)",
  zh_Hans_MO: "Chinese (Simplified Han, Macau SAR China)",
  zh_Hans_SG: "Chinese (Simplified Han, Singapore)",
  zh_Hant: "Chinese (Traditional Han)",
  zh_Hant_HK: "Chinese (Traditional Han, Hong Kong SAR China)",
  zh_Hant_MO: "Chinese (Traditional Han, Macau SAR China)",
  zh_Hant_TW: "Chinese (Traditional Han, Taiwan)",
  zh: "Chinese",
  kw_GB: "Cornish (United Kingdom)",
  kw: "Cornish",
  hr_HR: "Croatian (Croatia)",
  hr: "Croatian",
  cs_CZ: "Czech (Czech Republic)",
  cs: "Czech",
  da_DK: "Danish (Denmark)",
  da: "Danish",
  nl_BE: "Dutch (Belgium)",
  nl_NL: "Dutch (Netherlands)",
  nl: "Dutch",
  ebu_KE: "Embu (Kenya)",
  ebu: "Embu",
  en_AS: "English (American Samoa)",
  en_AU: "English (Australia)",
  en_BE: "English (Belgium)",
  en_BZ: "English (Belize)",
  en_BW: "English (Botswana)",
  en_CA: "English (Canada)",
  en_GU: "English (Guam)",
  en_HK: "English (Hong Kong SAR China)",
  en_IN: "English (India)",
  en_IE: "English (Ireland)",
  en_IL: "English (Israel)",
  en_JM: "English (Jamaica)",
  en_MT: "English (Malta)",
  en_MH: "English (Marshall Islands)",
  en_MU: "English (Mauritius)",
  en_NA: "English (Namibia)",
  en_NZ: "English (New Zealand)",
  en_MP: "English (Northern Mariana Islands)",
  en_PK: "English (Pakistan)",
  en_PH: "English (Philippines)",
  en_SG: "English (Singapore)",
  en_ZA: "English (South Africa)",
  en_TT: "English (Trinidad and Tobago)",
  en_UM: "English (U.S. Minor Outlying Islands)",
  en_VI: "English (U.S. Virgin Islands)",
  en_GB: "English (United Kingdom)",
  en_US: "English (United States)",
  en_ZW: "English (Zimbabwe)",
  en: "English",
  eo: "Esperanto",
  et_EE: "Estonian (Estonia)",
  et: "Estonian",
  ee_GH: "Ewe (Ghana)",
  ee_TG: "Ewe (Togo)",
  ee: "Ewe",
  fo_FO: "Faroese (Faroe Islands)",
  fo: "Faroese",
  fil_PH: "Filipino (Philippines)",
  fil: "Filipino",
  fi_FI: "Finnish (Finland)",
  fi: "Finnish",
  fr_BE: "French (Belgium)",
  fr_BJ: "French (Benin)",
  fr_BF: "French (Burkina Faso)",
  fr_BI: "French (Burundi)",
  fr_CM: "French (Cameroon)",
  fr_CA: "French (Canada)",
  fr_CF: "French (Central African Republic)",
  fr_TD: "French (Chad)",
  fr_KM: "French (Comoros)",
  fr_CG: "French (Congo - Brazzaville)",
  fr_CD: "French (Congo - Kinshasa)",
  fr_CI: "French (Côte d’Ivoire)",
  fr_DJ: "French (Djibouti)",
  fr_GQ: "French (Equatorial Guinea)",
  fr_FR: "French (France)",
  fr_GA: "French (Gabon)",
  fr_GP: "French (Guadeloupe)",
  fr_GN: "French (Guinea)",
  fr_LU: "French (Luxembourg)",
  fr_MG: "French (Madagascar)",
  fr_ML: "French (Mali)",
  fr_MQ: "French (Martinique)",
  fr_MC: "French (Monaco)",
  fr_NE: "French (Niger)",
  fr_RW: "French (Rwanda)",
  fr_RE: "French (Réunion)",
  fr_BL: "French (Saint Barthélemy)",
  fr_MF: "French (Saint Martin)",
  fr_SN: "French (Senegal)",
  fr_CH: "French (Switzerland)",
  fr_TG: "French (Togo)",
  fr: "French",
  ff_SN: "Fulah (Senegal)",
  ff: "Fulah",
  gl_ES: "Galician (Spain)",
  gl: "Galician",
  lg_UG: "Ganda (Uganda)",
  lg: "Ganda",
  ka_GE: "Georgian (Georgia)",
  ka: "Georgian",
  de_AT: "German (Austria)",
  de_BE: "German (Belgium)",
  de_DE: "German (Germany)",
  de_LI: "German (Liechtenstein)",
  de_LU: "German (Luxembourg)",
  de_CH: "German (Switzerland)",
  de: "German",
  el_CY: "Greek (Cyprus)",
  el_GR: "Greek (Greece)",
  el: "Greek",
  gu_IN: "Gujarati (India)",
  gu: "Gujarati",
  guz_KE: "Gusii (Kenya)",
  guz: "Gusii",
  ha_Latn: "Hausa (Latin)",
  ha_Latn_GH: "Hausa (Latin, Ghana)",
  ha_Latn_NE: "Hausa (Latin, Niger)",
  ha_Latn_NG: "Hausa (Latin, Nigeria)",
  ha: "Hausa",
  haw_US: "Hawaiian (United States)",
  haw: "Hawaiian",
  he_IL: "Hebrew (Israel)",
  he: "Hebrew",
  hi_IN: "Hindi (India)",
  hi: "Hindi",
  hu_HU: "Hungarian (Hungary)",
  hu: "Hungarian",
  is_IS: "Icelandic (Iceland)",
  is: "Icelandic",
  ig_NG: "Igbo (Nigeria)",
  ig: "Igbo",
  id_ID: "Indonesian (Indonesia)",
  id: "Indonesian",
  ga_IE: "Irish (Ireland)",
  ga: "Irish",
  it_IT: "Italian (Italy)",
  it_CH: "Italian (Switzerland)",
  it: "Italian",
  ja_JP: "Japanese (Japan)",
  ja: "Japanese",
  kea_CV: "Kabuverdianu (Cape Verde)",
  kea: "Kabuverdianu",
  kab_DZ: "Kabyle (Algeria)",
  kab: "Kabyle",
  kl_GL: "Kalaallisut (Greenland)",
  kl: "Kalaallisut",
  kln_KE: "Kalenjin (Kenya)",
  kln: "Kalenjin",
  kam_KE: "Kamba (Kenya)",
  kam: "Kamba",
  kn_IN: "Kannada (India)",
  kn: "Kannada",
  kk_Cyrl: "Kazakh (Cyrillic)",
  kk_Cyrl_KZ: "Kazakh (Cyrillic, Kazakhstan)",
  kk: "Kazakh",
  km_KH: "Khmer (Cambodia)",
  km: "Khmer",
  ki_KE: "Kikuyu (Kenya)",
  ki: "Kikuyu",
  rw_RW: "Kinyarwanda (Rwanda)",
  rw: "Kinyarwanda",
  kok_IN: "Konkani (India)",
  kok: "Konkani",
  ko_KR: "Korean (South Korea)",
  ko: "Korean",
  khq_ML: "Koyra Chiini (Mali)",
  khq: "Koyra Chiini",
  ses_ML: "Koyraboro Senni (Mali)",
  ses: "Koyraboro Senni",
  lag_TZ: "Langi (Tanzania)",
  lag: "Langi",
  lv_LV: "Latvian (Latvia)",
  lv: "Latvian",
  lt_LT: "Lithuanian (Lithuania)",
  lt: "Lithuanian",
  luo_KE: "Luo (Kenya)",
  luo: "Luo",
  luy_KE: "Luyia (Kenya)",
  luy: "Luyia",
  mk_MK: "Macedonian (Macedonia)",
  mk: "Macedonian",
  jmc_TZ: "Machame (Tanzania)",
  jmc: "Machame",
  kde_TZ: "Makonde (Tanzania)",
  kde: "Makonde",
  mg_MG: "Malagasy (Madagascar)",
  mg: "Malagasy",
  ms_BN: "Malay (Brunei)",
  ms_MY: "Malay (Malaysia)",
  ms: "Malay",
  ml_IN: "Malayalam (India)",
  ml: "Malayalam",
  mt_MT: "Maltese (Malta)",
  mt: "Maltese",
  gv_GB: "Manx (United Kingdom)",
  gv: "Manx",
  mr_IN: "Marathi (India)",
  mr: "Marathi",
  mas_KE: "Masai (Kenya)",
  mas_TZ: "Masai (Tanzania)",
  mas: "Masai",
  mer_KE: "Meru (Kenya)",
  mer: "Meru",
  mfe_MU: "Morisyen (Mauritius)",
  mfe: "Morisyen",
  naq_NA: "Nama (Namibia)",
  naq: "Nama",
  ne_IN: "Nepali (India)",
  ne_NP: "Nepali (Nepal)",
  ne: "Nepali",
  nd_ZW: "North Ndebele (Zimbabwe)",
  nd: "North Ndebele",
  nb_NO: "Norwegian Bokmål (Norway)",
  nb: "Norwegian Bokmål",
  nn_NO: "Norwegian Nynorsk (Norway)",
  nn: "Norwegian Nynorsk",
  nyn_UG: "Nyankole (Uganda)",
  nyn: "Nyankole",
  or_IN: "Oriya (India)",
  or: "Oriya",
  om_ET: "Oromo (Ethiopia)",
  om_KE: "Oromo (Kenya)",
  om: "Oromo",
  ps_AF: "Pashto (Afghanistan)",
  ps: "Pashto",
  fa_AF: "Persian (Afghanistan)",
  fa_IR: "Persian (Iran)",
  fa: "Persian",
  pl_PL: "Polish (Poland)",
  pl: "Polish",
  pt_BR: "Portuguese (Brazil)",
  pt_GW: "Portuguese (Guinea-Bissau)",
  pt_MZ: "Portuguese (Mozambique)",
  pt_PT: "Portuguese (Portugal)",
  pt: "Portuguese",
  pa_Arab: "Punjabi (Arabic)",
  pa_Arab_PK: "Punjabi (Arabic, Pakistan)",
  pa_Guru: "Punjabi (Gurmukhi)",
  pa_Guru_IN: "Punjabi (Gurmukhi, India)",
  pa: "Punjabi",
  ro_MD: "Romanian (Moldova)",
  ro_RO: "Romanian (Romania)",
  ro: "Romanian",
  rm_CH: "Romansh (Switzerland)",
  rm: "Romansh",
  rof_TZ: "Rombo (Tanzania)",
  rof: "Rombo",
  ru_MD: "Russian (Moldova)",
  ru_RU: "Russian (Russia)",
  ru_UA: "Russian (Ukraine)",
  ru: "Russian",
  rwk_TZ: "Rwa (Tanzania)",
  rwk: "Rwa",
  saq_KE: "Samburu (Kenya)",
  saq: "Samburu",
  sg_CF: "Sango (Central African Republic)",
  sg: "Sango",
  seh_MZ: "Sena (Mozambique)",
  seh: "Sena",
  sr_Cyrl: "Serbian (Cyrillic)",
  sr_Cyrl_BA: "Serbian (Cyrillic, Bosnia and Herzegovina)",
  sr_Cyrl_ME: "Serbian (Cyrillic, Montenegro)",
  sr_Cyrl_RS: "Serbian (Cyrillic, Serbia)",
  sr_Latn: "Serbian (Latin)",
  sr_Latn_BA: "Serbian (Latin, Bosnia and Herzegovina)",
  sr_Latn_ME: "Serbian (Latin, Montenegro)",
  sr_Latn_RS: "Serbian (Latin, Serbia)",
  sr: "Serbian",
  sn_ZW: "Shona (Zimbabwe)",
  sn: "Shona",
  ii_CN: "Sichuan Yi (China)",
  ii: "Sichuan Yi",
  si_LK: "Sinhala (Sri Lanka)",
  si: "Sinhala",
  sk_SK: "Slovak (Slovakia)",
  sk: "Slovak",
  sl_SI: "Slovenian (Slovenia)",
  sl: "Slovenian",
  xog_UG: "Soga (Uganda)",
  xog: "Soga",
  so_DJ: "Somali (Djibouti)",
  so_ET: "Somali (Ethiopia)",
  so_KE: "Somali (Kenya)",
  so_SO: "Somali (Somalia)",
  so: "Somali",
  es_AR: "Spanish (Argentina)",
  es_BO: "Spanish (Bolivia)",
  es_CL: "Spanish (Chile)",
  es_CO: "Spanish (Colombia)",
  es_CR: "Spanish (Costa Rica)",
  es_DO: "Spanish (Dominican Republic)",
  es_EC: "Spanish (Ecuador)",
  es_SV: "Spanish (El Salvador)",
  es_GQ: "Spanish (Equatorial Guinea)",
  es_GT: "Spanish (Guatemala)",
  es_HN: "Spanish (Honduras)",
  es_419: "Spanish (Latin America)",
  es_MX: "Spanish (Mexico)",
  es_NI: "Spanish (Nicaragua)",
  es_PA: "Spanish (Panama)",
  es_PY: "Spanish (Paraguay)",
  es_PE: "Spanish (Peru)",
  es_PR: "Spanish (Puerto Rico)",
  es_ES: "Spanish (Spain)",
  es_US: "Spanish (United States)",
  es_UY: "Spanish (Uruguay)",
  es_VE: "Spanish (Venezuela)",
  es: "Spanish",
  sw_KE: "Swahili (Kenya)",
  sw_TZ: "Swahili (Tanzania)",
  sw: "Swahili",
  sv_FI: "Swedish (Finland)",
  sv_SE: "Swedish (Sweden)",
  sv: "Swedish",
  gsw_CH: "Swiss German (Switzerland)",
  gsw: "Swiss German",
  shi_Latn: "Tachelhit (Latin)",
  shi_Latn_MA: "Tachelhit (Latin, Morocco)",
  shi_Tfng: "Tachelhit (Tifinagh)",
  shi_Tfng_MA: "Tachelhit (Tifinagh, Morocco)",
  shi: "Tachelhit",
  dav_KE: "Taita (Kenya)",
  dav: "Taita",
  ta_IN: "Tamil (India)",
  ta_LK: "Tamil (Sri Lanka)",
  ta: "Tamil",
  te_IN: "Telugu (India)",
  te: "Telugu",
  teo_KE: "Teso (Kenya)",
  teo_UG: "Teso (Uganda)",
  teo: "Teso",
  th_TH: "Thai (Thailand)",
  th: "Thai",
  bo_CN: "Tibetan (China)",
  bo_IN: "Tibetan (India)",
  bo: "Tibetan",
  ti_ER: "Tigrinya (Eritrea)",
  ti_ET: "Tigrinya (Ethiopia)",
  ti: "Tigrinya",
  to_TO: "Tonga (Tonga)",
  to: "Tonga",
  tr_TR: "Turkish (Turkey)",
  tr: "Turkish",
  uk_UA: "Ukrainian (Ukraine)",
  uk: "Ukrainian",
  ur_IN: "Urdu (India)",
  ur_PK: "Urdu (Pakistan)",
  ur: "Urdu",
  uz_Arab: "Uzbek (Arabic)",
  uz_Arab_AF: "Uzbek (Arabic, Afghanistan)",
  uz_Cyrl: "Uzbek (Cyrillic)",
  uz_Cyrl_UZ: "Uzbek (Cyrillic, Uzbekistan)",
  uz_Latn: "Uzbek (Latin)",
  uz_Latn_UZ: "Uzbek (Latin, Uzbekistan)",
  uz: "Uzbek",
  vi_VN: "Vietnamese (Vietnam)",
  vi: "Vietnamese",
  vun_TZ: "Vunjo (Tanzania)",
  vun: "Vunjo",
  cy_GB: "Welsh (United Kingdom)",
  cy: "Welsh",
  yo_NG: "Yoruba (Nigeria)",
  yo: "Yoruba",
  zu_ZA: "Zulu (South Africa)",
  zu: "Zulu",
};

export const languagesArray = Object.entries(LANGUAGE_BY_LOCALE).map((key) => {
  return { countryCode: key[0].replace("_", "-"), fullName: key[1] };
});
