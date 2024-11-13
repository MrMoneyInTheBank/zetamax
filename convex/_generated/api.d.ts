/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as addUserScore from "../addUserScore.js";
import type * as createUser from "../createUser.js";
import type * as deleteUser from "../deleteUser.js";
import type * as deleteUserScores from "../deleteUserScores.js";
import type * as getEverything from "../getEverything.js";
import type * as getUserDocument from "../getUserDocument.js";
import type * as getUserScores from "../getUserScores.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  addUserScore: typeof addUserScore;
  createUser: typeof createUser;
  deleteUser: typeof deleteUser;
  deleteUserScores: typeof deleteUserScores;
  getEverything: typeof getEverything;
  getUserDocument: typeof getUserDocument;
  getUserScores: typeof getUserScores;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
