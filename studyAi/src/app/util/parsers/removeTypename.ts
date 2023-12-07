function isPrimitive<T>(value: T) {
  const isPrimitive =
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean";
  return isPrimitive
}

function removeTypename<T>(
  json: T & {
    [key: string]: any;
  }
): T {
  //if primitive, no need to return anything
  if (isPrimitive(json)) return json;
  if (Array.isArray(json)) {
    return json.map((item) => removeTypename(item)) as T;
  } else if (typeof json === "object" && json !== null) {
    const result: any = {};
    const keys = Object.keys(json);
    for (let key of keys) {
      if (key !== "__typename") {
        const newVal = removeTypename(json[key]);
        result[key] = newVal;
      }
    }
    return result as T;
  }
  return json as T;
}
export default removeTypename;
