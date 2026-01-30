import { scalarType } from "nexus";

export const DateTime = scalarType({
  name: "DateTime",
  asNexusMethod: "date",
  description: "A custom scalar type representing a date and time.",
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return null;
  },
  parseValue(value) {
    if (typeof value === "string") {
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) {
        return dateValue;
      }
    }
    return null;
  },
  parseLiteral(ast) {
    if (ast.kind === "StringValue") {
      const dateValue = new Date(ast.value);
      if (!isNaN(dateValue.getTime())) {
        return dateValue;
      }
    }
    return null;
  },
});
