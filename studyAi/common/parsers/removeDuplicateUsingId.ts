function getAllValues<T>(map: Map<string, T>) {
  const values = [];
  for (const value of map.values()) {
    values.push(value);
  }
  return values;
}
function removeDuplicatesUsingId<T>(arr: (T & { id: string })[]) {
  const hashmap = new Map<string, T & { id: string }>();
  const dups: (T & { id: string })[] = [];
  arr.forEach((obj) => {
    if (hashmap.get(obj.id)) dups.push(obj);
    else {
      hashmap.set(obj.id, obj);
    }
  });
  return [getAllValues(hashmap), dups];
}
export default removeDuplicatesUsingId;
