export const territories = {
  regions: [
    { id: "R01", nom: "Diana" },
    { id: "R02", nom: "Sava" },
    { id: "R03", nom: "Itasy" },
    { id: "R04", nom: "Analamanga" },
    { id: "R05", nom: "Vakinankaratra" },
    { id: "R06", nom: "Bongolava" },
    { id: "R07", nom: "Sofia" },
    { id: "R08", nom: "Boeny" },
    { id: "R09", nom: "Betsiboka" },
    { id: "R10", nom: "Melaky" },
    { id: "R11", nom: "Alaotra-Mangoro" },
    { id: "R12", nom: "Atsinanana" },
    { id: "R13", nom: "Analanjirofo" },
    { id: "R14", nom: "Amoron'i Mania" },
    { id: "R15", nom: "Haute Matsiatra" },
    { id: "R16", nom: "Vatovavy" },
    { id: "R17", nom: "Fitovinany" },
    { id: "R18", nom: "Atsimo-Atsinanana" },
    { id: "R19", nom: "Ihorombe" },
    { id: "R20", nom: "Menabe" },
    { id: "R21", nom: "Atsimo-Andrefana" },
    { id: "R22", nom: "Androy" },
    { id: "R23", nom: "Anosy" },
  ],
  districts: [
    { id: "D01", nom: "Ambanja", regionId: "R01" },
    { id: "D02", nom: "Nosy Be", regionId: "R01" },
    { id: "D03", nom: "Antsiranana I", regionId: "R01" },
    { id: "D04", nom: "Antsirabe I", regionId: "R05" },
    { id: "D05", nom: "Antsirabe II", regionId: "R05" },
    { id: "D06", nom: "Antananarivo Renivohitra", regionId: "R04" },
    { id: "D07", nom: "Ambatondrazaka", regionId: "R11" },
    { id: "D08", nom: "Moramanga", regionId: "R11" },
    { id: "D09", nom: "Mananjary", regionId: "R17" },
    { id: "D10", nom: "Toliara I", regionId: "R21" },
  ],
  communes: [
    { id: "C01", nom: "Ambanja", districtId: "D01" },
    { id: "C02", nom: "Antsahampano", districtId: "D01" },
    { id: "C03", nom: "Bemanevika", districtId: "D01" },
    { id: "C04", nom: "Antananarivo", districtId: "D06" },
    { id: "C05", nom: "Ambatondrazaka", districtId: "D07" },
    { id: "C06", nom: "Moramanga", districtId: "D08" },
    { id: "C07", nom: "Antsirabe", districtId: "D04" },
    { id: "C08", nom: "Mananjary", districtId: "D09" },
  ],
  fokontany: [
    { id: "F01", nom: "Ambanja Centre", communeId: "C01" },
    { id: "F02", nom: "Ambatoharanana", communeId: "C01" },
    { id: "F03", nom: "Antsahampano Nord", communeId: "C02" },
    { id: "F04", nom: "Isotry", communeId: "C04" },
    { id: "F05", nom: "Analakely", communeId: "C04" },
    { id: "F06", nom: "Ambatondrazaka Centre", communeId: "C05" },
    { id: "F07", nom: "Moramanga Sud", communeId: "C06" },
  ],
};

export function getDistrictsByRegion(regionId: string) {
  return territories.districts.filter((d) => d.regionId === regionId);
}

export function getCommunesByDistrict(districtId: string) {
  return territories.communes.filter((c) => c.districtId === districtId);
}

export function getFokontanyByCommune(communeId: string) {
  return territories.fokontany.filter((f) => f.communeId === communeId);
}
