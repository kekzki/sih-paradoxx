export type Species = { name: string; count: number };
export type BiomassRecord = { month: string; biomass: number };
export type TrendRecord = { year: number; value: number };
export type LocationRecord = { location: string; density: number };

export const mockDB = {
  species: [
    { name: "Salmon", count: 120 },
    { name: "Tuna", count: 90 },
    { name: "Cod", count: 70 },
    { name: "Trout", count: 45 },
  ] as Species[],

  biomass: [
    { month: "Jan", biomass: 1000 },
    { month: "Feb", biomass: 1100 },
    { month: "Mar", biomass: 950 },
    { month: "Apr", biomass: 1150 },
  ] as BiomassRecord[],

  trends: [
    { year: 2021, value: 500 },
    { year: 2022, value: 650 },
    { year: 2023, value: 700 },
    { year: 2024, value: 850 },
  ] as TrendRecord[],

  locations: [
    { location: "North Bay", density: 40 },
    { location: "South Bay", density: 60 },
    { location: "East Bay", density: 30 },
    { location: "West Bay", density: 80 },
  ] as LocationRecord[],
};
