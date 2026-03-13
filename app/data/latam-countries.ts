export type LatamCountry = {
  name: string;
  currency: { code: string; symbol: string; label: string };
  cities: string[];
};

export const latamCountries: LatamCountry[] = [
  {
    name: "Argentina",
    currency: { code: "ARS", symbol: "$", label: "Pesos argentinos (ARS)" },
    cities: [
      "Buenos Aires", "Córdoba", "Rosario", "Mendoza", "San Miguel de Tucumán",
      "La Plata", "Mar del Plata", "Salta", "Santa Fe", "San Juan",
      "Resistencia", "Neuquén", "Bahía Blanca",
    ],
  },
  {
    name: "Bolivia",
    currency: { code: "BOB", symbol: "Bs", label: "Bolivianos (BOB)" },
    cities: [
      "La Paz", "Santa Cruz de la Sierra", "Cochabamba", "Sucre",
      "Oruro", "Tarija", "Potosí", "Trinidad",
    ],
  },
  {
    name: "Brasil",
    currency: { code: "BRL", symbol: "R$", label: "Reales (BRL)" },
    cities: [
      "São Paulo", "Río de Janeiro", "Brasília", "Belo Horizonte", "Curitiba",
      "Porto Alegre", "Recife", "Fortaleza", "Salvador", "Florianópolis",
      "Campinas", "Goiânia", "Manaus",
    ],
  },
  {
    name: "Chile",
    currency: { code: "CLP", symbol: "$", label: "Pesos chilenos (CLP)" },
    cities: [
      "Santiago", "Valparaíso", "Concepción", "Antofagasta", "Viña del Mar",
      "Temuco", "Rancagua", "Talca", "Iquique", "Puerto Montt",
    ],
  },
  {
    name: "Colombia",
    currency: { code: "COP", symbol: "$", label: "Pesos colombianos (COP)" },
    cities: [
      "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena de Indias",
      "Bucaramanga", "Pereira", "Santa Marta", "Cúcuta", "Ibagué",
      "Manizales", "Villavicencio",
    ],
  },
  {
    name: "Costa Rica",
    currency: { code: "CRC", symbol: "₡", label: "Colones (CRC)" },
    cities: [
      "San José", "Heredia", "Alajuela", "Cartago", "Liberia",
      "Puntarenas", "Limón",
    ],
  },
  {
    name: "Cuba",
    currency: { code: "CUP", symbol: "$", label: "Pesos cubanos (CUP)" },
    cities: [
      "La Habana", "Santiago de Cuba", "Camagüey", "Holguín",
      "Santa Clara", "Guantánamo",
    ],
  },
  {
    name: "Ecuador",
    currency: { code: "USD", symbol: "$", label: "Dólares (USD)" },
    cities: [
      "Quito", "Guayaquil", "Cuenca", "Santo Domingo", "Machala",
      "Ambato", "Manta", "Portoviejo", "Loja",
    ],
  },
  {
    name: "El Salvador",
    currency: { code: "USD", symbol: "$", label: "Dólares (USD)" },
    cities: [
      "San Salvador", "Santa Ana", "San Miguel", "Soyapango",
      "Santa Tecla", "Apopa",
    ],
  },
  {
    name: "Guatemala",
    currency: { code: "GTQ", symbol: "Q", label: "Quetzales (GTQ)" },
    cities: [
      "Ciudad de Guatemala", "Mixco", "Villa Nueva", "Quetzaltenango",
      "Escuintla", "Cobán", "Huehuetenango",
    ],
  },
  {
    name: "Honduras",
    currency: { code: "HNL", symbol: "L", label: "Lempiras (HNL)" },
    cities: [
      "Tegucigalpa", "San Pedro Sula", "La Ceiba", "Choloma",
      "Comayagua", "Puerto Cortés",
    ],
  },
  {
    name: "México",
    currency: { code: "MXN", symbol: "$", label: "Pesos mexicanos (MXN)" },
    cities: [
      "Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Querétaro",
      "Mérida", "Tijuana", "León", "Cancún", "Aguascalientes",
      "San Luis Potosí", "Toluca", "Chihuahua", "Hermosillo", "Saltillo",
    ],
  },
  {
    name: "Nicaragua",
    currency: { code: "NIO", symbol: "C$", label: "Córdobas (NIO)" },
    cities: [
      "Managua", "León", "Masaya", "Chinandega", "Matagalpa", "Granada",
    ],
  },
  {
    name: "Panamá",
    currency: { code: "USD", symbol: "$", label: "Dólares (USD)" },
    cities: [
      "Ciudad de Panamá", "San Miguelito", "David", "Colón",
      "La Chorrera", "Santiago",
    ],
  },
  {
    name: "Paraguay",
    currency: { code: "PYG", symbol: "₲", label: "Guaraníes (PYG)" },
    cities: [
      "Asunción", "Ciudad del Este", "San Lorenzo", "Luque",
      "Encarnación", "Pedro Juan Caballero",
    ],
  },
  {
    name: "Perú",
    currency: { code: "PEN", symbol: "S/", label: "Soles (PEN)" },
    cities: [
      "Lima", "Arequipa", "Trujillo", "Chiclayo", "Cusco",
      "Callao", "Piura", "Iquitos", "Huancayo", "Chimbote",
      "Tacna", "Pucallpa", "Ica",
    ],
  },
  {
    name: "Puerto Rico",
    currency: { code: "USD", symbol: "$", label: "Dólares (USD)" },
    cities: [
      "San Juan", "Bayamón", "Carolina", "Ponce", "Caguas", "Mayagüez",
    ],
  },
  {
    name: "Rep. Dominicana",
    currency: { code: "DOP", symbol: "RD$", label: "Pesos dominicanos (DOP)" },
    cities: [
      "Santo Domingo", "Santiago de los Caballeros", "San Pedro de Macorís",
      "La Romana", "San Cristóbal", "Puerto Plata",
    ],
  },
  {
    name: "Uruguay",
    currency: { code: "UYU", symbol: "$", label: "Pesos uruguayos (UYU)" },
    cities: [
      "Montevideo", "Salto", "Paysandú", "Las Piedras",
      "Rivera", "Maldonado",
    ],
  },
  {
    name: "Venezuela",
    currency: { code: "VES", symbol: "Bs", label: "Bolívares (VES)" },
    cities: [
      "Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay",
      "Ciudad Guayana", "Barcelona", "Maturín", "San Cristóbal",
    ],
  },
];

export function getCountryByName(name: string): LatamCountry | undefined {
  return latamCountries.find((c) => c.name === name);
}

const timezoneToCountry: Record<string, string> = {
  "America/Argentina/Buenos_Aires": "Argentina",
  "America/Argentina/Cordoba": "Argentina",
  "America/Argentina/Mendoza": "Argentina",
  "America/La_Paz": "Bolivia",
  "America/Sao_Paulo": "Brasil",
  "America/Fortaleza": "Brasil",
  "America/Recife": "Brasil",
  "America/Manaus": "Brasil",
  "America/Santiago": "Chile",
  "America/Bogota": "Colombia",
  "America/Costa_Rica": "Costa Rica",
  "America/Havana": "Cuba",
  "America/Guayaquil": "Ecuador",
  "America/El_Salvador": "El Salvador",
  "America/Guatemala": "Guatemala",
  "America/Tegucigalpa": "Honduras",
  "America/Mexico_City": "México",
  "America/Monterrey": "México",
  "America/Merida": "México",
  "America/Cancun": "México",
  "America/Tijuana": "México",
  "America/Managua": "Nicaragua",
  "America/Panama": "Panamá",
  "America/Asuncion": "Paraguay",
  "America/Lima": "Perú",
  "America/Puerto_Rico": "Puerto Rico",
  "America/Santo_Domingo": "Rep. Dominicana",
  "America/Montevideo": "Uruguay",
  "America/Caracas": "Venezuela",
};

export function detectCountryByTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezoneToCountry[tz] ?? "";
  } catch {
    return "";
  }
}

export function getCurrencyOptions(countryName: string): { code: string; label: string }[] {
  const country = getCountryByName(countryName);
  if (!country) return [{ code: "USD", label: "Dólares (USD)" }];
  const options: { code: string; label: string }[] = [
    { code: country.currency.code, label: country.currency.label },
  ];
  if (country.currency.code !== "USD") {
    options.push({ code: "USD", label: "Dólares (USD)" });
  }
  return options;
}
