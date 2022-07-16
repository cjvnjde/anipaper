export function buildUrl(method: string, {
  auth = process.env.apiKey,
  info_level = 2,
  ...params
}: { [kye: string]: any } = {}) {
  const query = Object.entries({
    auth,
    method,
    info_level,
    ...params,
  }).reduce((acc, [key, value], index) => {
    if (index === 0) {
      return `${acc}?${key}=${value}`;
    }

    return `${acc}&${key}=${value}`;
  }, "");

  return `https://wall.alphacoders.com/api2.0/get.php${query}`;
}