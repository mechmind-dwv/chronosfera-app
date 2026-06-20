export const fetchKp = async () => {
  try {
    const res = await fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json');
    const data = await res.json();
    return data[1]?.kp?.[0] || 2;
  } catch {
    return 2.5;
  }
};
