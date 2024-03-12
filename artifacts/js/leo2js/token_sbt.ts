import {
  token,
  tokenLeo
} from "../types/token_sbt";
import {
  leo2js
} from "@doko-js/core";


export function gettoken(token: tokenLeo): token {
  const result: token = {
    owner: leo2js.address(token.owner),
    amount: leo2js.u64(token.amount),
    _nonce: leo2js.group(token._nonce),
  }
  return result;
}