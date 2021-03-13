const citiesAndDistricts = [];

export default async function fetchCitiesAndDistricts(filter) {
  return filter ? citiesAndDistricts.filter(filter) : citiesAndDistricts;
}
