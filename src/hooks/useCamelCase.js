import { useMemo } from "react";

const titleCaseToCamelCase = str => str[0].toLowerCase() + str.slice(1);

const useCamelCase = obj =>
  useMemo(
    () =>
      Object.keys(obj).reduce((acc, key) => {
        acc[titleCaseToCamelCase(key)] = obj[key];

        return acc;
      }, {}),
    [obj]
  );

export default useCamelCase;
