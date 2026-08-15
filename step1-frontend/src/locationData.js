import { Country, State, City } from "country-state-city";

export const getCountries = () => {
  return Country.getAllCountries();
};

export const getStates = (countryCode) => {
  if (!countryCode) {
    return [];
  }

  return State.getStatesOfCountry(countryCode);
};

export const getCities = (countryCode, stateCode) => {
  if (!countryCode || !stateCode) {
    return [];
  }

  return City.getCitiesOfState(countryCode, stateCode);
};