import { CustomizableCSSKeys } from "../types/theme";

export function removeUndefinedKeys<T extends {}>(obj: T) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== "") {
      // @ts-ignore
      acc[key] = value;
    }
    return acc;
  }, {});
}
export function removeKeysAndUndefinedValues<T extends { [key: string]: any }>(
  obj: T,
  keysToRemove: Array<keyof T>
) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!keysToRemove.includes(key) && value !== undefined && value !== "") {
      // @ts-ignore
      acc[key] = value;
    }
    return acc;
  }, {}) as Omit<T, keyof typeof keysToRemove>;
}
export const getAutoOrScaleIndent = (
  value: number | string | undefined,
  scaleDenominator: number = 4
) => {
  const scaleIndex = 4;
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" && value > -1 && value < 1) {
    return `${100 * value}px`;
  }
  if (typeof value === "number" && (value >= 1 || value <= -1)) {
    return `${value * scaleDenominator}px`;
  }
  return value;
};

/**
 * Here we are excluding the keys that don't need to go through the function `getAutoOrScaleIndent()`
 * assuming they provided value is logically corrent, for example `{"display":"flex"}` doesn't need to go through that function.
 */
export function calculateIndentStyles(
  props: Partial<{
    [Key in CustomizableCSSKeys[number]]: string | number;
  }>
) {
  // defining the keys to exclude
  const keysToExclude = [
    "display",
    "zIndex",
    "flex",
    "position",
    "alignItems",
    "justifyContent",
    "flexDirection",
    "flexWrap",
  ] as Array<keyof typeof props>;

  // this array is free from the excluded keys
  const propsWithoutExcludedKeys = removeKeysAndUndefinedValues(
    props,
    keysToExclude
  );

  const excludedKeysValues = getRemovedObjectProperties(props, keysToExclude);

  const values = {} as { [key: string]: any };
  // we're creating a new object from the array with excluded values with the mapped computed values
  Object.entries(propsWithoutExcludedKeys).forEach(([key, value]) => {
    values[key] = getAutoOrScaleIndent(value);
  });

  return Object.assign({}, propsWithoutExcludedKeys, {
    ...values,
    ...excludedKeysValues,
  });
}

const findCommonStrings = (arr1: string[], arr2: string[]) => {
  const set = new Set(arr1);

  return arr2.filter(item => set.has(item));
};
const excludeStringsFromArray = (stringsToExclude: string[], arr: string[]) => {
  const set = new Set(arr);

  return arr.filter(item => !set.has(item));
};

const getRemovedObjectProperties = <T extends { [key: string]: any }>(
  obj: T,
  arr: Array<string>
) => {
  const properties: { [key: typeof arr[number]]: any } = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (arr.includes(key)) {
      properties[key as typeof arr[number]] = value;
    }
  });
  return properties;
};
