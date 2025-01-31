export const trimValuesInObject = (obj: { [key: string]: any }) => {
  return JSON.parse(JSON.stringify(obj).replace(/"\s+|\s+"/g,'"'))
};
