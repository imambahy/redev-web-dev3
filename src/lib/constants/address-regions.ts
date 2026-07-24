export type RegionDistrict = {
  name: string;
  postalCodes: string[];
};

export type RegionCity = {
  name: string;
  districts: RegionDistrict[];
};

export type RegionProvince = {
  name: string;
  cities: RegionCity[];
};

/** Mock wilayah untuk slicing — nanti diganti API/JSON backend. */
export const mockAddressRegions: RegionProvince[] = [
  {
    name: "DKI Jakarta",
    cities: [
      {
        name: "Jakarta Selatan",
        districts: [
          { name: "Kebayoran Baru", postalCodes: ["12110", "12120", "12130"] },
          { name: "Tebet", postalCodes: ["12810", "12820", "12870"] },
          { name: "Pasar Minggu", postalCodes: ["12510", "12520"] },
        ],
      },
      {
        name: "Jakarta Pusat",
        districts: [
          { name: "Menteng", postalCodes: ["10310", "10320"] },
          { name: "Tanah Abang", postalCodes: ["10210", "10220"] },
        ],
      },
      {
        name: "Jakarta Barat",
        districts: [
          { name: "Kebon Jeruk", postalCodes: ["11530", "11540"] },
          { name: "Grogol Petamburan", postalCodes: ["11450", "11460"] },
        ],
      },
    ],
  },
  {
    name: "Jawa Barat",
    cities: [
      {
        name: "Kota Bandung",
        districts: [
          { name: "Coblong", postalCodes: ["40131", "40132"] },
          { name: "Cicendo", postalCodes: ["40171", "40172"] },
        ],
      },
      {
        name: "Kabupaten Bandung",
        districts: [
          { name: "Cileunyi", postalCodes: ["40621", "40622"] },
          { name: "Baleendah", postalCodes: ["40375", "40376"] },
        ],
      },
      {
        name: "Kota Bekasi",
        districts: [
          { name: "Bekasi Selatan", postalCodes: ["17141", "17142"] },
          { name: "Bekasi Utara", postalCodes: ["17121", "17122"] },
        ],
      },
    ],
  },
  {
    name: "Jawa Timur",
    cities: [
      {
        name: "Kota Surabaya",
        districts: [
          { name: "Gubeng", postalCodes: ["60281", "60282"] },
          { name: "Sukolilo", postalCodes: ["60111", "60115"] },
        ],
      },
      {
        name: "Kota Malang",
        districts: [
          { name: "Klojen", postalCodes: ["65111", "65112"] },
          { name: "Lowokwaru", postalCodes: ["65141", "65144"] },
        ],
      },
    ],
  },
];

export function getProvinceOptions() {
  return mockAddressRegions.map((province) => province.name);
}

export function getCityOptions(provinceName: string) {
  const province = mockAddressRegions.find((item) => item.name === provinceName);
  return province?.cities.map((city) => city.name) ?? [];
}

export function getDistrictOptions(provinceName: string, cityName: string) {
  const province = mockAddressRegions.find((item) => item.name === provinceName);
  const city = province?.cities.find((item) => item.name === cityName);
  return city?.districts.map((district) => district.name) ?? [];
}

export function getPostalCodeOptions(
  provinceName: string,
  cityName: string,
  districtName: string,
) {
  const province = mockAddressRegions.find((item) => item.name === provinceName);
  const city = province?.cities.find((item) => item.name === cityName);
  const district = city?.districts.find((item) => item.name === districtName);
  return district?.postalCodes ?? [];
}
