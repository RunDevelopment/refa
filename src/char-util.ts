import { Char } from "./char-types";

export function isChar(value: unknown): value is Char {
	return typeof value === "number";
}
