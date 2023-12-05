function removeTypename<T>(
  json: T & {
    [key: string]: any;
  }
): T {
  if (Array.isArray(json)) {
    return json.map((item) => removeTypename(item)) as T;
  } else if (typeof json === "object" && json !== null) {
    const result: any = {};
    const keys = Object.keys(json);
    for (let key in keys) {
      if (key !== "__typename") {
        result[key] = removeTypename(json[key]);
      }
    }

    return result as T;
  }

  return json as T;
}
export default removeTypename