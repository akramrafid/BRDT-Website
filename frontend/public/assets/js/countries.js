const COUNTRIES = [
  {
    "name": "Afghanistan",
    "code": "AF",
    "flag": "\ud83c\udde6\ud83c\uddeb",
    "dial": "+93"
  },
  {
    "name": "Albania",
    "code": "AL",
    "flag": "\ud83c\udde6\ud83c\uddf1",
    "dial": "+355"
  },
  {
    "name": "Algeria",
    "code": "DZ",
    "flag": "\ud83c\udde9\ud83c\uddff",
    "dial": "+213"
  },
  {
    "name": "American Samoa",
    "code": "AS",
    "flag": "\ud83c\udde6\ud83c\uddf8",
    "dial": "+1684"
  },
  {
    "name": "Andorra",
    "code": "AD",
    "flag": "\ud83c\udde6\ud83c\udde9",
    "dial": "+376"
  },
  {
    "name": "Angola",
    "code": "AO",
    "flag": "\ud83c\udde6\ud83c\uddf4",
    "dial": "+244"
  },
  {
    "name": "Anguilla",
    "code": "AI",
    "flag": "\ud83c\udde6\ud83c\uddee",
    "dial": "+1264"
  },
  {
    "name": "Antarctica",
    "code": "AQ",
    "flag": "\ud83c\udde6\ud83c\uddf6",
    "dial": ""
  },
  {
    "name": "Antigua and Barbuda",
    "code": "AG",
    "flag": "\ud83c\udde6\ud83c\uddec",
    "dial": "+1268"
  },
  {
    "name": "Argentina",
    "code": "AR",
    "flag": "\ud83c\udde6\ud83c\uddf7",
    "dial": "+54"
  },
  {
    "name": "Armenia",
    "code": "AM",
    "flag": "\ud83c\udde6\ud83c\uddf2",
    "dial": "+374"
  },
  {
    "name": "Aruba",
    "code": "AW",
    "flag": "\ud83c\udde6\ud83c\uddfc",
    "dial": "+297"
  },
  {
    "name": "Australia",
    "code": "AU",
    "flag": "\ud83c\udde6\ud83c\uddfa",
    "dial": "+61"
  },
  {
    "name": "Austria",
    "code": "AT",
    "flag": "\ud83c\udde6\ud83c\uddf9",
    "dial": "+43"
  },
  {
    "name": "Azerbaijan",
    "code": "AZ",
    "flag": "\ud83c\udde6\ud83c\uddff",
    "dial": "+994"
  },
  {
    "name": "Bahamas",
    "code": "BS",
    "flag": "\ud83c\udde7\ud83c\uddf8",
    "dial": "+1242"
  },
  {
    "name": "Bahrain",
    "code": "BH",
    "flag": "\ud83c\udde7\ud83c\udded",
    "dial": "+973"
  },
  {
    "name": "Bangladesh",
    "code": "BD",
    "flag": "\ud83c\udde7\ud83c\udde9",
    "dial": "+880"
  },
  {
    "name": "Barbados",
    "code": "BB",
    "flag": "\ud83c\udde7\ud83c\udde7",
    "dial": "+1246"
  },
  {
    "name": "Belarus",
    "code": "BY",
    "flag": "\ud83c\udde7\ud83c\uddfe",
    "dial": "+375"
  },
  {
    "name": "Belgium",
    "code": "BE",
    "flag": "\ud83c\udde7\ud83c\uddea",
    "dial": "+32"
  },
  {
    "name": "Belize",
    "code": "BZ",
    "flag": "\ud83c\udde7\ud83c\uddff",
    "dial": "+501"
  },
  {
    "name": "Benin",
    "code": "BJ",
    "flag": "\ud83c\udde7\ud83c\uddef",
    "dial": "+229"
  },
  {
    "name": "Bermuda",
    "code": "BM",
    "flag": "\ud83c\udde7\ud83c\uddf2",
    "dial": "+1441"
  },
  {
    "name": "Bhutan",
    "code": "BT",
    "flag": "\ud83c\udde7\ud83c\uddf9",
    "dial": "+975"
  },
  {
    "name": "Bolivia",
    "code": "BO",
    "flag": "\ud83c\udde7\ud83c\uddf4",
    "dial": "+591"
  },
  {
    "name": "Bosnia and Herzegovina",
    "code": "BA",
    "flag": "\ud83c\udde7\ud83c\udde6",
    "dial": "+387"
  },
  {
    "name": "Botswana",
    "code": "BW",
    "flag": "\ud83c\udde7\ud83c\uddfc",
    "dial": "+267"
  },
  {
    "name": "Bouvet Island",
    "code": "BV",
    "flag": "\ud83c\udde7\ud83c\uddfb",
    "dial": "+47"
  },
  {
    "name": "Brazil",
    "code": "BR",
    "flag": "\ud83c\udde7\ud83c\uddf7",
    "dial": "+55"
  },
  {
    "name": "British Indian Ocean Territory",
    "code": "IO",
    "flag": "\ud83c\uddee\ud83c\uddf4",
    "dial": "+246"
  },
  {
    "name": "British Virgin Islands",
    "code": "VG",
    "flag": "\ud83c\uddfb\ud83c\uddec",
    "dial": "+1284"
  },
  {
    "name": "Brunei",
    "code": "BN",
    "flag": "\ud83c\udde7\ud83c\uddf3",
    "dial": "+673"
  },
  {
    "name": "Bulgaria",
    "code": "BG",
    "flag": "\ud83c\udde7\ud83c\uddec",
    "dial": "+359"
  },
  {
    "name": "Burkina Faso",
    "code": "BF",
    "flag": "\ud83c\udde7\ud83c\uddeb",
    "dial": "+226"
  },
  {
    "name": "Burundi",
    "code": "BI",
    "flag": "\ud83c\udde7\ud83c\uddee",
    "dial": "+257"
  },
  {
    "name": "Cambodia",
    "code": "KH",
    "flag": "\ud83c\uddf0\ud83c\udded",
    "dial": "+855"
  },
  {
    "name": "Cameroon",
    "code": "CM",
    "flag": "\ud83c\udde8\ud83c\uddf2",
    "dial": "+237"
  },
  {
    "name": "Canada",
    "code": "CA",
    "flag": "\ud83c\udde8\ud83c\udde6",
    "dial": "+1"
  },
  {
    "name": "Cape Verde",
    "code": "CV",
    "flag": "\ud83c\udde8\ud83c\uddfb",
    "dial": "+238"
  },
  {
    "name": "Caribbean Netherlands",
    "code": "BQ",
    "flag": "\ud83c\udde7\ud83c\uddf6",
    "dial": "+599"
  },
  {
    "name": "Cayman Islands",
    "code": "KY",
    "flag": "\ud83c\uddf0\ud83c\uddfe",
    "dial": "+1345"
  },
  {
    "name": "Central African Republic",
    "code": "CF",
    "flag": "\ud83c\udde8\ud83c\uddeb",
    "dial": "+236"
  },
  {
    "name": "Chad",
    "code": "TD",
    "flag": "\ud83c\uddf9\ud83c\udde9",
    "dial": "+235"
  },
  {
    "name": "Chile",
    "code": "CL",
    "flag": "\ud83c\udde8\ud83c\uddf1",
    "dial": "+56"
  },
  {
    "name": "China",
    "code": "CN",
    "flag": "\ud83c\udde8\ud83c\uddf3",
    "dial": "+86"
  },
  {
    "name": "Christmas Island",
    "code": "CX",
    "flag": "\ud83c\udde8\ud83c\uddfd",
    "dial": "+61"
  },
  {
    "name": "Cocos (Keeling) Islands",
    "code": "CC",
    "flag": "\ud83c\udde8\ud83c\udde8",
    "dial": "+61"
  },
  {
    "name": "Colombia",
    "code": "CO",
    "flag": "\ud83c\udde8\ud83c\uddf4",
    "dial": "+57"
  },
  {
    "name": "Comoros",
    "code": "KM",
    "flag": "\ud83c\uddf0\ud83c\uddf2",
    "dial": "+269"
  },
  {
    "name": "Cook Islands",
    "code": "CK",
    "flag": "\ud83c\udde8\ud83c\uddf0",
    "dial": "+682"
  },
  {
    "name": "Costa Rica",
    "code": "CR",
    "flag": "\ud83c\udde8\ud83c\uddf7",
    "dial": "+506"
  },
  {
    "name": "Croatia",
    "code": "HR",
    "flag": "\ud83c\udded\ud83c\uddf7",
    "dial": "+385"
  },
  {
    "name": "Cuba",
    "code": "CU",
    "flag": "\ud83c\udde8\ud83c\uddfa",
    "dial": "+53"
  },
  {
    "name": "Cura\u00e7ao",
    "code": "CW",
    "flag": "\ud83c\udde8\ud83c\uddfc",
    "dial": "+599"
  },
  {
    "name": "Cyprus",
    "code": "CY",
    "flag": "\ud83c\udde8\ud83c\uddfe",
    "dial": "+357"
  },
  {
    "name": "Czechia",
    "code": "CZ",
    "flag": "\ud83c\udde8\ud83c\uddff",
    "dial": "+420"
  },
  {
    "name": "DR Congo",
    "code": "CD",
    "flag": "\ud83c\udde8\ud83c\udde9",
    "dial": "+243"
  },
  {
    "name": "Denmark",
    "code": "DK",
    "flag": "\ud83c\udde9\ud83c\uddf0",
    "dial": "+45"
  },
  {
    "name": "Djibouti",
    "code": "DJ",
    "flag": "\ud83c\udde9\ud83c\uddef",
    "dial": "+253"
  },
  {
    "name": "Dominica",
    "code": "DM",
    "flag": "\ud83c\udde9\ud83c\uddf2",
    "dial": "+1767"
  },
  {
    "name": "Dominican Republic",
    "code": "DO",
    "flag": "\ud83c\udde9\ud83c\uddf4",
    "dial": "+1809"
  },
  {
    "name": "Ecuador",
    "code": "EC",
    "flag": "\ud83c\uddea\ud83c\udde8",
    "dial": "+593"
  },
  {
    "name": "Egypt",
    "code": "EG",
    "flag": "\ud83c\uddea\ud83c\uddec",
    "dial": "+20"
  },
  {
    "name": "El Salvador",
    "code": "SV",
    "flag": "\ud83c\uddf8\ud83c\uddfb",
    "dial": "+503"
  },
  {
    "name": "Equatorial Guinea",
    "code": "GQ",
    "flag": "\ud83c\uddec\ud83c\uddf6",
    "dial": "+240"
  },
  {
    "name": "Eritrea",
    "code": "ER",
    "flag": "\ud83c\uddea\ud83c\uddf7",
    "dial": "+291"
  },
  {
    "name": "Estonia",
    "code": "EE",
    "flag": "\ud83c\uddea\ud83c\uddea",
    "dial": "+372"
  },
  {
    "name": "Eswatini",
    "code": "SZ",
    "flag": "\ud83c\uddf8\ud83c\uddff",
    "dial": "+268"
  },
  {
    "name": "Ethiopia",
    "code": "ET",
    "flag": "\ud83c\uddea\ud83c\uddf9",
    "dial": "+251"
  },
  {
    "name": "Falkland Islands",
    "code": "FK",
    "flag": "\ud83c\uddeb\ud83c\uddf0",
    "dial": "+500"
  },
  {
    "name": "Faroe Islands",
    "code": "FO",
    "flag": "\ud83c\uddeb\ud83c\uddf4",
    "dial": "+298"
  },
  {
    "name": "Fiji",
    "code": "FJ",
    "flag": "\ud83c\uddeb\ud83c\uddef",
    "dial": "+679"
  },
  {
    "name": "Finland",
    "code": "FI",
    "flag": "\ud83c\uddeb\ud83c\uddee",
    "dial": "+358"
  },
  {
    "name": "France",
    "code": "FR",
    "flag": "\ud83c\uddeb\ud83c\uddf7",
    "dial": "+33"
  },
  {
    "name": "French Guiana",
    "code": "GF",
    "flag": "\ud83c\uddec\ud83c\uddeb",
    "dial": "+594"
  },
  {
    "name": "French Polynesia",
    "code": "PF",
    "flag": "\ud83c\uddf5\ud83c\uddeb",
    "dial": "+689"
  },
  {
    "name": "French Southern and Antarctic Lands",
    "code": "TF",
    "flag": "\ud83c\uddf9\ud83c\uddeb",
    "dial": "+262"
  },
  {
    "name": "Gabon",
    "code": "GA",
    "flag": "\ud83c\uddec\ud83c\udde6",
    "dial": "+241"
  },
  {
    "name": "Gambia",
    "code": "GM",
    "flag": "\ud83c\uddec\ud83c\uddf2",
    "dial": "+220"
  },
  {
    "name": "Georgia",
    "code": "GE",
    "flag": "\ud83c\uddec\ud83c\uddea",
    "dial": "+995"
  },
  {
    "name": "Germany",
    "code": "DE",
    "flag": "\ud83c\udde9\ud83c\uddea",
    "dial": "+49"
  },
  {
    "name": "Ghana",
    "code": "GH",
    "flag": "\ud83c\uddec\ud83c\udded",
    "dial": "+233"
  },
  {
    "name": "Gibraltar",
    "code": "GI",
    "flag": "\ud83c\uddec\ud83c\uddee",
    "dial": "+350"
  },
  {
    "name": "Greece",
    "code": "GR",
    "flag": "\ud83c\uddec\ud83c\uddf7",
    "dial": "+30"
  },
  {
    "name": "Greenland",
    "code": "GL",
    "flag": "\ud83c\uddec\ud83c\uddf1",
    "dial": "+299"
  },
  {
    "name": "Grenada",
    "code": "GD",
    "flag": "\ud83c\uddec\ud83c\udde9",
    "dial": "+1473"
  },
  {
    "name": "Guadeloupe",
    "code": "GP",
    "flag": "\ud83c\uddec\ud83c\uddf5",
    "dial": "+590"
  },
  {
    "name": "Guam",
    "code": "GU",
    "flag": "\ud83c\uddec\ud83c\uddfa",
    "dial": "+1671"
  },
  {
    "name": "Guatemala",
    "code": "GT",
    "flag": "\ud83c\uddec\ud83c\uddf9",
    "dial": "+502"
  },
  {
    "name": "Guernsey",
    "code": "GG",
    "flag": "\ud83c\uddec\ud83c\uddec",
    "dial": "+44"
  },
  {
    "name": "Guinea",
    "code": "GN",
    "flag": "\ud83c\uddec\ud83c\uddf3",
    "dial": "+224"
  },
  {
    "name": "Guinea-Bissau",
    "code": "GW",
    "flag": "\ud83c\uddec\ud83c\uddfc",
    "dial": "+245"
  },
  {
    "name": "Guyana",
    "code": "GY",
    "flag": "\ud83c\uddec\ud83c\uddfe",
    "dial": "+592"
  },
  {
    "name": "Haiti",
    "code": "HT",
    "flag": "\ud83c\udded\ud83c\uddf9",
    "dial": "+509"
  },
  {
    "name": "Heard Island and McDonald Islands",
    "code": "HM",
    "flag": "\ud83c\udded\ud83c\uddf2",
    "dial": ""
  },
  {
    "name": "Honduras",
    "code": "HN",
    "flag": "\ud83c\udded\ud83c\uddf3",
    "dial": "+504"
  },
  {
    "name": "Hong Kong",
    "code": "HK",
    "flag": "\ud83c\udded\ud83c\uddf0",
    "dial": "+852"
  },
  {
    "name": "Hungary",
    "code": "HU",
    "flag": "\ud83c\udded\ud83c\uddfa",
    "dial": "+36"
  },
  {
    "name": "Iceland",
    "code": "IS",
    "flag": "\ud83c\uddee\ud83c\uddf8",
    "dial": "+354"
  },
  {
    "name": "India",
    "code": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "dial": "+91"
  },
  {
    "name": "Indonesia",
    "code": "ID",
    "flag": "\ud83c\uddee\ud83c\udde9",
    "dial": "+62"
  },
  {
    "name": "Iran",
    "code": "IR",
    "flag": "\ud83c\uddee\ud83c\uddf7",
    "dial": "+98"
  },
  {
    "name": "Iraq",
    "code": "IQ",
    "flag": "\ud83c\uddee\ud83c\uddf6",
    "dial": "+964"
  },
  {
    "name": "Ireland",
    "code": "IE",
    "flag": "\ud83c\uddee\ud83c\uddea",
    "dial": "+353"
  },
  {
    "name": "Isle of Man",
    "code": "IM",
    "flag": "\ud83c\uddee\ud83c\uddf2",
    "dial": "+44"
  },
  {
    "name": "Israel",
    "code": "IL",
    "flag": "\ud83c\uddee\ud83c\uddf1",
    "dial": "+972"
  },
  {
    "name": "Italy",
    "code": "IT",
    "flag": "\ud83c\uddee\ud83c\uddf9",
    "dial": "+39"
  },
  {
    "name": "Ivory Coast",
    "code": "CI",
    "flag": "\ud83c\udde8\ud83c\uddee",
    "dial": "+225"
  },
  {
    "name": "Jamaica",
    "code": "JM",
    "flag": "\ud83c\uddef\ud83c\uddf2",
    "dial": "+1876"
  },
  {
    "name": "Japan",
    "code": "JP",
    "flag": "\ud83c\uddef\ud83c\uddf5",
    "dial": "+81"
  },
  {
    "name": "Jersey",
    "code": "JE",
    "flag": "\ud83c\uddef\ud83c\uddea",
    "dial": "+44"
  },
  {
    "name": "Jordan",
    "code": "JO",
    "flag": "\ud83c\uddef\ud83c\uddf4",
    "dial": "+962"
  },
  {
    "name": "Kazakhstan",
    "code": "KZ",
    "flag": "\ud83c\uddf0\ud83c\uddff",
    "dial": "+76"
  },
  {
    "name": "Kenya",
    "code": "KE",
    "flag": "\ud83c\uddf0\ud83c\uddea",
    "dial": "+254"
  },
  {
    "name": "Kiribati",
    "code": "KI",
    "flag": "\ud83c\uddf0\ud83c\uddee",
    "dial": "+686"
  },
  {
    "name": "Kosovo",
    "code": "XK",
    "flag": "\ud83c\uddfd\ud83c\uddf0",
    "dial": "+383"
  },
  {
    "name": "Kuwait",
    "code": "KW",
    "flag": "\ud83c\uddf0\ud83c\uddfc",
    "dial": "+965"
  },
  {
    "name": "Kyrgyzstan",
    "code": "KG",
    "flag": "\ud83c\uddf0\ud83c\uddec",
    "dial": "+996"
  },
  {
    "name": "Laos",
    "code": "LA",
    "flag": "\ud83c\uddf1\ud83c\udde6",
    "dial": "+856"
  },
  {
    "name": "Latvia",
    "code": "LV",
    "flag": "\ud83c\uddf1\ud83c\uddfb",
    "dial": "+371"
  },
  {
    "name": "Lebanon",
    "code": "LB",
    "flag": "\ud83c\uddf1\ud83c\udde7",
    "dial": "+961"
  },
  {
    "name": "Lesotho",
    "code": "LS",
    "flag": "\ud83c\uddf1\ud83c\uddf8",
    "dial": "+266"
  },
  {
    "name": "Liberia",
    "code": "LR",
    "flag": "\ud83c\uddf1\ud83c\uddf7",
    "dial": "+231"
  },
  {
    "name": "Libya",
    "code": "LY",
    "flag": "\ud83c\uddf1\ud83c\uddfe",
    "dial": "+218"
  },
  {
    "name": "Liechtenstein",
    "code": "LI",
    "flag": "\ud83c\uddf1\ud83c\uddee",
    "dial": "+423"
  },
  {
    "name": "Lithuania",
    "code": "LT",
    "flag": "\ud83c\uddf1\ud83c\uddf9",
    "dial": "+370"
  },
  {
    "name": "Luxembourg",
    "code": "LU",
    "flag": "\ud83c\uddf1\ud83c\uddfa",
    "dial": "+352"
  },
  {
    "name": "Macau",
    "code": "MO",
    "flag": "\ud83c\uddf2\ud83c\uddf4",
    "dial": "+853"
  },
  {
    "name": "Madagascar",
    "code": "MG",
    "flag": "\ud83c\uddf2\ud83c\uddec",
    "dial": "+261"
  },
  {
    "name": "Malawi",
    "code": "MW",
    "flag": "\ud83c\uddf2\ud83c\uddfc",
    "dial": "+265"
  },
  {
    "name": "Malaysia",
    "code": "MY",
    "flag": "\ud83c\uddf2\ud83c\uddfe",
    "dial": "+60"
  },
  {
    "name": "Maldives",
    "code": "MV",
    "flag": "\ud83c\uddf2\ud83c\uddfb",
    "dial": "+960"
  },
  {
    "name": "Mali",
    "code": "ML",
    "flag": "\ud83c\uddf2\ud83c\uddf1",
    "dial": "+223"
  },
  {
    "name": "Malta",
    "code": "MT",
    "flag": "\ud83c\uddf2\ud83c\uddf9",
    "dial": "+356"
  },
  {
    "name": "Marshall Islands",
    "code": "MH",
    "flag": "\ud83c\uddf2\ud83c\udded",
    "dial": "+692"
  },
  {
    "name": "Martinique",
    "code": "MQ",
    "flag": "\ud83c\uddf2\ud83c\uddf6",
    "dial": "+596"
  },
  {
    "name": "Mauritania",
    "code": "MR",
    "flag": "\ud83c\uddf2\ud83c\uddf7",
    "dial": "+222"
  },
  {
    "name": "Mauritius",
    "code": "MU",
    "flag": "\ud83c\uddf2\ud83c\uddfa",
    "dial": "+230"
  },
  {
    "name": "Mayotte",
    "code": "YT",
    "flag": "\ud83c\uddfe\ud83c\uddf9",
    "dial": "+262"
  },
  {
    "name": "Mexico",
    "code": "MX",
    "flag": "\ud83c\uddf2\ud83c\uddfd",
    "dial": "+52"
  },
  {
    "name": "Micronesia",
    "code": "FM",
    "flag": "\ud83c\uddeb\ud83c\uddf2",
    "dial": "+691"
  },
  {
    "name": "Moldova",
    "code": "MD",
    "flag": "\ud83c\uddf2\ud83c\udde9",
    "dial": "+373"
  },
  {
    "name": "Monaco",
    "code": "MC",
    "flag": "\ud83c\uddf2\ud83c\udde8",
    "dial": "+377"
  },
  {
    "name": "Mongolia",
    "code": "MN",
    "flag": "\ud83c\uddf2\ud83c\uddf3",
    "dial": "+976"
  },
  {
    "name": "Montenegro",
    "code": "ME",
    "flag": "\ud83c\uddf2\ud83c\uddea",
    "dial": "+382"
  },
  {
    "name": "Montserrat",
    "code": "MS",
    "flag": "\ud83c\uddf2\ud83c\uddf8",
    "dial": "+1664"
  },
  {
    "name": "Morocco",
    "code": "MA",
    "flag": "\ud83c\uddf2\ud83c\udde6",
    "dial": "+212"
  },
  {
    "name": "Mozambique",
    "code": "MZ",
    "flag": "\ud83c\uddf2\ud83c\uddff",
    "dial": "+258"
  },
  {
    "name": "Myanmar",
    "code": "MM",
    "flag": "\ud83c\uddf2\ud83c\uddf2",
    "dial": "+95"
  },
  {
    "name": "Namibia",
    "code": "NA",
    "flag": "\ud83c\uddf3\ud83c\udde6",
    "dial": "+264"
  },
  {
    "name": "Nauru",
    "code": "NR",
    "flag": "\ud83c\uddf3\ud83c\uddf7",
    "dial": "+674"
  },
  {
    "name": "Nepal",
    "code": "NP",
    "flag": "\ud83c\uddf3\ud83c\uddf5",
    "dial": "+977"
  },
  {
    "name": "Netherlands",
    "code": "NL",
    "flag": "\ud83c\uddf3\ud83c\uddf1",
    "dial": "+31"
  },
  {
    "name": "New Caledonia",
    "code": "NC",
    "flag": "\ud83c\uddf3\ud83c\udde8",
    "dial": "+687"
  },
  {
    "name": "New Zealand",
    "code": "NZ",
    "flag": "\ud83c\uddf3\ud83c\uddff",
    "dial": "+64"
  },
  {
    "name": "Nicaragua",
    "code": "NI",
    "flag": "\ud83c\uddf3\ud83c\uddee",
    "dial": "+505"
  },
  {
    "name": "Niger",
    "code": "NE",
    "flag": "\ud83c\uddf3\ud83c\uddea",
    "dial": "+227"
  },
  {
    "name": "Nigeria",
    "code": "NG",
    "flag": "\ud83c\uddf3\ud83c\uddec",
    "dial": "+234"
  },
  {
    "name": "Niue",
    "code": "NU",
    "flag": "\ud83c\uddf3\ud83c\uddfa",
    "dial": "+683"
  },
  {
    "name": "Norfolk Island",
    "code": "NF",
    "flag": "\ud83c\uddf3\ud83c\uddeb",
    "dial": "+672"
  },
  {
    "name": "North Korea",
    "code": "KP",
    "flag": "\ud83c\uddf0\ud83c\uddf5",
    "dial": "+850"
  },
  {
    "name": "North Macedonia",
    "code": "MK",
    "flag": "\ud83c\uddf2\ud83c\uddf0",
    "dial": "+389"
  },
  {
    "name": "Northern Mariana Islands",
    "code": "MP",
    "flag": "\ud83c\uddf2\ud83c\uddf5",
    "dial": "+1670"
  },
  {
    "name": "Norway",
    "code": "NO",
    "flag": "\ud83c\uddf3\ud83c\uddf4",
    "dial": "+47"
  },
  {
    "name": "Oman",
    "code": "OM",
    "flag": "\ud83c\uddf4\ud83c\uddf2",
    "dial": "+968"
  },
  {
    "name": "Pakistan",
    "code": "PK",
    "flag": "\ud83c\uddf5\ud83c\uddf0",
    "dial": "+92"
  },
  {
    "name": "Palau",
    "code": "PW",
    "flag": "\ud83c\uddf5\ud83c\uddfc",
    "dial": "+680"
  },
  {
    "name": "Palestine",
    "code": "PS",
    "flag": "\ud83c\uddf5\ud83c\uddf8",
    "dial": "+970"
  },
  {
    "name": "Panama",
    "code": "PA",
    "flag": "\ud83c\uddf5\ud83c\udde6",
    "dial": "+507"
  },
  {
    "name": "Papua New Guinea",
    "code": "PG",
    "flag": "\ud83c\uddf5\ud83c\uddec",
    "dial": "+675"
  },
  {
    "name": "Paraguay",
    "code": "PY",
    "flag": "\ud83c\uddf5\ud83c\uddfe",
    "dial": "+595"
  },
  {
    "name": "Peru",
    "code": "PE",
    "flag": "\ud83c\uddf5\ud83c\uddea",
    "dial": "+51"
  },
  {
    "name": "Philippines",
    "code": "PH",
    "flag": "\ud83c\uddf5\ud83c\udded",
    "dial": "+63"
  },
  {
    "name": "Pitcairn Islands",
    "code": "PN",
    "flag": "\ud83c\uddf5\ud83c\uddf3",
    "dial": "+64"
  },
  {
    "name": "Poland",
    "code": "PL",
    "flag": "\ud83c\uddf5\ud83c\uddf1",
    "dial": "+48"
  },
  {
    "name": "Portugal",
    "code": "PT",
    "flag": "\ud83c\uddf5\ud83c\uddf9",
    "dial": "+351"
  },
  {
    "name": "Puerto Rico",
    "code": "PR",
    "flag": "\ud83c\uddf5\ud83c\uddf7",
    "dial": "+1787"
  },
  {
    "name": "Qatar",
    "code": "QA",
    "flag": "\ud83c\uddf6\ud83c\udde6",
    "dial": "+974"
  },
  {
    "name": "Republic of the Congo",
    "code": "CG",
    "flag": "\ud83c\udde8\ud83c\uddec",
    "dial": "+242"
  },
  {
    "name": "Romania",
    "code": "RO",
    "flag": "\ud83c\uddf7\ud83c\uddf4",
    "dial": "+40"
  },
  {
    "name": "Russia",
    "code": "RU",
    "flag": "\ud83c\uddf7\ud83c\uddfa",
    "dial": "+73"
  },
  {
    "name": "Rwanda",
    "code": "RW",
    "flag": "\ud83c\uddf7\ud83c\uddfc",
    "dial": "+250"
  },
  {
    "name": "R\u00e9union",
    "code": "RE",
    "flag": "\ud83c\uddf7\ud83c\uddea",
    "dial": "+262"
  },
  {
    "name": "Saint Barth\u00e9lemy",
    "code": "BL",
    "flag": "\ud83c\udde7\ud83c\uddf1",
    "dial": "+590"
  },
  {
    "name": "Saint Helena, Ascension and Tristan da Cunha",
    "code": "SH",
    "flag": "\ud83c\uddf8\ud83c\udded",
    "dial": "+290"
  },
  {
    "name": "Saint Kitts and Nevis",
    "code": "KN",
    "flag": "\ud83c\uddf0\ud83c\uddf3",
    "dial": "+1869"
  },
  {
    "name": "Saint Lucia",
    "code": "LC",
    "flag": "\ud83c\uddf1\ud83c\udde8",
    "dial": "+1758"
  },
  {
    "name": "Saint Martin",
    "code": "MF",
    "flag": "\ud83c\uddf2\ud83c\uddeb",
    "dial": "+590"
  },
  {
    "name": "Saint Pierre and Miquelon",
    "code": "PM",
    "flag": "\ud83c\uddf5\ud83c\uddf2",
    "dial": "+508"
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "code": "VC",
    "flag": "\ud83c\uddfb\ud83c\udde8",
    "dial": "+1784"
  },
  {
    "name": "Samoa",
    "code": "WS",
    "flag": "\ud83c\uddfc\ud83c\uddf8",
    "dial": "+685"
  },
  {
    "name": "San Marino",
    "code": "SM",
    "flag": "\ud83c\uddf8\ud83c\uddf2",
    "dial": "+378"
  },
  {
    "name": "Saudi Arabia",
    "code": "SA",
    "flag": "\ud83c\uddf8\ud83c\udde6",
    "dial": "+966"
  },
  {
    "name": "Senegal",
    "code": "SN",
    "flag": "\ud83c\uddf8\ud83c\uddf3",
    "dial": "+221"
  },
  {
    "name": "Serbia",
    "code": "RS",
    "flag": "\ud83c\uddf7\ud83c\uddf8",
    "dial": "+381"
  },
  {
    "name": "Seychelles",
    "code": "SC",
    "flag": "\ud83c\uddf8\ud83c\udde8",
    "dial": "+248"
  },
  {
    "name": "Sierra Leone",
    "code": "SL",
    "flag": "\ud83c\uddf8\ud83c\uddf1",
    "dial": "+232"
  },
  {
    "name": "Singapore",
    "code": "SG",
    "flag": "\ud83c\uddf8\ud83c\uddec",
    "dial": "+65"
  },
  {
    "name": "Sint Maarten",
    "code": "SX",
    "flag": "\ud83c\uddf8\ud83c\uddfd",
    "dial": "+1721"
  },
  {
    "name": "Slovakia",
    "code": "SK",
    "flag": "\ud83c\uddf8\ud83c\uddf0",
    "dial": "+421"
  },
  {
    "name": "Slovenia",
    "code": "SI",
    "flag": "\ud83c\uddf8\ud83c\uddee",
    "dial": "+386"
  },
  {
    "name": "Solomon Islands",
    "code": "SB",
    "flag": "\ud83c\uddf8\ud83c\udde7",
    "dial": "+677"
  },
  {
    "name": "Somalia",
    "code": "SO",
    "flag": "\ud83c\uddf8\ud83c\uddf4",
    "dial": "+252"
  },
  {
    "name": "South Africa",
    "code": "ZA",
    "flag": "\ud83c\uddff\ud83c\udde6",
    "dial": "+27"
  },
  {
    "name": "South Georgia",
    "code": "GS",
    "flag": "\ud83c\uddec\ud83c\uddf8",
    "dial": "+500"
  },
  {
    "name": "South Korea",
    "code": "KR",
    "flag": "\ud83c\uddf0\ud83c\uddf7",
    "dial": "+82"
  },
  {
    "name": "South Sudan",
    "code": "SS",
    "flag": "\ud83c\uddf8\ud83c\uddf8",
    "dial": "+211"
  },
  {
    "name": "Spain",
    "code": "ES",
    "flag": "\ud83c\uddea\ud83c\uddf8",
    "dial": "+34"
  },
  {
    "name": "Sri Lanka",
    "code": "LK",
    "flag": "\ud83c\uddf1\ud83c\uddf0",
    "dial": "+94"
  },
  {
    "name": "Sudan",
    "code": "SD",
    "flag": "\ud83c\uddf8\ud83c\udde9",
    "dial": "+249"
  },
  {
    "name": "Suriname",
    "code": "SR",
    "flag": "\ud83c\uddf8\ud83c\uddf7",
    "dial": "+597"
  },
  {
    "name": "Svalbard and Jan Mayen",
    "code": "SJ",
    "flag": "\ud83c\uddf8\ud83c\uddef",
    "dial": "+4779"
  },
  {
    "name": "Sweden",
    "code": "SE",
    "flag": "\ud83c\uddf8\ud83c\uddea",
    "dial": "+46"
  },
  {
    "name": "Switzerland",
    "code": "CH",
    "flag": "\ud83c\udde8\ud83c\udded",
    "dial": "+41"
  },
  {
    "name": "Syria",
    "code": "SY",
    "flag": "\ud83c\uddf8\ud83c\uddfe",
    "dial": "+963"
  },
  {
    "name": "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
    "code": "ST",
    "flag": "\ud83c\uddf8\ud83c\uddf9",
    "dial": "+239"
  },
  {
    "name": "Taiwan",
    "code": "TW",
    "flag": "\ud83c\uddf9\ud83c\uddfc",
    "dial": "+886"
  },
  {
    "name": "Tajikistan",
    "code": "TJ",
    "flag": "\ud83c\uddf9\ud83c\uddef",
    "dial": "+992"
  },
  {
    "name": "Tanzania",
    "code": "TZ",
    "flag": "\ud83c\uddf9\ud83c\uddff",
    "dial": "+255"
  },
  {
    "name": "Thailand",
    "code": "TH",
    "flag": "\ud83c\uddf9\ud83c\udded",
    "dial": "+66"
  },
  {
    "name": "Timor-Leste",
    "code": "TL",
    "flag": "\ud83c\uddf9\ud83c\uddf1",
    "dial": "+670"
  },
  {
    "name": "Togo",
    "code": "TG",
    "flag": "\ud83c\uddf9\ud83c\uddec",
    "dial": "+228"
  },
  {
    "name": "Tokelau",
    "code": "TK",
    "flag": "\ud83c\uddf9\ud83c\uddf0",
    "dial": "+690"
  },
  {
    "name": "Tonga",
    "code": "TO",
    "flag": "\ud83c\uddf9\ud83c\uddf4",
    "dial": "+676"
  },
  {
    "name": "Trinidad and Tobago",
    "code": "TT",
    "flag": "\ud83c\uddf9\ud83c\uddf9",
    "dial": "+1868"
  },
  {
    "name": "Tunisia",
    "code": "TN",
    "flag": "\ud83c\uddf9\ud83c\uddf3",
    "dial": "+216"
  },
  {
    "name": "Turkey",
    "code": "TR",
    "flag": "\ud83c\uddf9\ud83c\uddf7",
    "dial": "+90"
  },
  {
    "name": "Turkmenistan",
    "code": "TM",
    "flag": "\ud83c\uddf9\ud83c\uddf2",
    "dial": "+993"
  },
  {
    "name": "Turks and Caicos Islands",
    "code": "TC",
    "flag": "\ud83c\uddf9\ud83c\udde8",
    "dial": "+1649"
  },
  {
    "name": "Tuvalu",
    "code": "TV",
    "flag": "\ud83c\uddf9\ud83c\uddfb",
    "dial": "+688"
  },
  {
    "name": "Uganda",
    "code": "UG",
    "flag": "\ud83c\uddfa\ud83c\uddec",
    "dial": "+256"
  },
  {
    "name": "Ukraine",
    "code": "UA",
    "flag": "\ud83c\uddfa\ud83c\udde6",
    "dial": "+380"
  },
  {
    "name": "United Arab Emirates",
    "code": "AE",
    "flag": "\ud83c\udde6\ud83c\uddea",
    "dial": "+971"
  },
  {
    "name": "United Kingdom",
    "code": "GB",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "dial": "+44"
  },
  {
    "name": "United States",
    "code": "US",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "dial": "+1201"
  },
  {
    "name": "United States Minor Outlying Islands",
    "code": "UM",
    "flag": "\ud83c\uddfa\ud83c\uddf2",
    "dial": "+268"
  },
  {
    "name": "United States Virgin Islands",
    "code": "VI",
    "flag": "\ud83c\uddfb\ud83c\uddee",
    "dial": "+1340"
  },
  {
    "name": "Uruguay",
    "code": "UY",
    "flag": "\ud83c\uddfa\ud83c\uddfe",
    "dial": "+598"
  },
  {
    "name": "Uzbekistan",
    "code": "UZ",
    "flag": "\ud83c\uddfa\ud83c\uddff",
    "dial": "+998"
  },
  {
    "name": "Vanuatu",
    "code": "VU",
    "flag": "\ud83c\uddfb\ud83c\uddfa",
    "dial": "+678"
  },
  {
    "name": "Vatican City",
    "code": "VA",
    "flag": "\ud83c\uddfb\ud83c\udde6",
    "dial": "+3906698"
  },
  {
    "name": "Venezuela",
    "code": "VE",
    "flag": "\ud83c\uddfb\ud83c\uddea",
    "dial": "+58"
  },
  {
    "name": "Vietnam",
    "code": "VN",
    "flag": "\ud83c\uddfb\ud83c\uddf3",
    "dial": "+84"
  },
  {
    "name": "Wallis and Futuna",
    "code": "WF",
    "flag": "\ud83c\uddfc\ud83c\uddeb",
    "dial": "+681"
  },
  {
    "name": "Western Sahara",
    "code": "EH",
    "flag": "\ud83c\uddea\ud83c\udded",
    "dial": "+2125288"
  },
  {
    "name": "Yemen",
    "code": "YE",
    "flag": "\ud83c\uddfe\ud83c\uddea",
    "dial": "+967"
  },
  {
    "name": "Zambia",
    "code": "ZM",
    "flag": "\ud83c\uddff\ud83c\uddf2",
    "dial": "+260"
  },
  {
    "name": "Zimbabwe",
    "code": "ZW",
    "flag": "\ud83c\uddff\ud83c\uddfc",
    "dial": "+263"
  },
  {
    "name": "\u00c5land Islands",
    "code": "AX",
    "flag": "\ud83c\udde6\ud83c\uddfd",
    "dial": "+35818"
  }
];