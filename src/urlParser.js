export function parseDictionaryFromLocationHash() {
  const hashDictionary = window.location.hash
    .substring(1)
    .split("&")
    .map((each) => each.split("="))
    .reduce((result, each) => {
      result[each[0]] = decodeURIComponent(each[1]);
      return result;
    }, {});
  console.log(hashDictionary);

  return hashDictionary;
}
