function removeDuplicatesUsingId<T>(
  arr: (T & { id: string })[]
) {
  const hashmap: { [key: string]: T & { id: string } } = {};
  arr.forEach((obj) => {
    hashmap[obj.id] = obj;
  });
  return Object.values(hashmap);
}
export default removeDuplicatesUsingId;