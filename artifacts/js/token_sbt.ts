import {
  token
} from "./types/token_sbt";
import {
  gettokenLeo
} from "./js2leo/token_sbt";
import {
  gettoken
} from "./leo2js/token_sbt";
import {
  zkRun,
  ContractConfig,
  zkGetMapping,
  LeoAddress,
  LeoRecord,
  js2leo,
  leo2js
} from "@doko-js/core";
import {
  BaseContract
} from "../../contract/base-contract";
import {
  TransactionModel
} from "@aleohq/sdk";

export class Token_sbtContract extends BaseContract {

  constructor(config: ContractConfig = {}) {
    super(config);
    this.config = {
      ...this.config,
      appName: 'token_sbt',
      contractPath: 'artifacts/leo/token_sbt',
      fee: '0.01'
    };
  }
  async initialize_token(r0: LeoAddress): Promise < [TransactionModel] > {
    const r0Leo = js2leo.address(r0);

    const params = [r0Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'initialize_token',
      params,
    });
    return [result.transaction];
  }

  async mint_public(r0: LeoAddress, r1: bigint): Promise < [TransactionModel] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'mint_public',
      params,
    });
    return [result.transaction];
  }

  async mint_private(r0: LeoAddress, r1: bigint): Promise < [LeoRecord, TransactionModel] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'mint_private',
      params,
    });
    const out0 = result.data[0];
    return [out0, result.transaction];
  }

  async transfer_public(r0: LeoAddress, r1: bigint): Promise < [TransactionModel] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'transfer_public',
      params,
    });
    return [result.transaction];
  }

  async transfer_private(r0: token, r1: LeoAddress, r2: bigint): Promise < [LeoRecord, LeoRecord, TransactionModel] > {
    const r0Leo = js2leo.json(gettokenLeo(r0));
    const r1Leo = js2leo.address(r1);
    const r2Leo = js2leo.u64(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'transfer_private',
      params,
    });
    const out0 = result.data[0];
    const out1 = result.data[1];
    return [out0, out1, result.transaction];
  }

  async transfer_private_to_public(r0: token, r1: LeoAddress, r2: bigint): Promise < [LeoRecord, TransactionModel] > {
    const r0Leo = js2leo.json(gettokenLeo(r0));
    const r1Leo = js2leo.address(r1);
    const r2Leo = js2leo.u64(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'transfer_private_to_public',
      params,
    });
    const out0 = result.data[0];
    return [out0, result.transaction];
  }

  async transfer_public_to_private(r0: LeoAddress, r1: bigint): Promise < [LeoRecord, TransactionModel] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await zkRun({
      config: this.config,
      transition: 'transfer_public_to_private',
      params,
    });
    const out0 = result.data[0];
    return [out0, result.transaction];
  }

  async account(key: LeoAddress, defaultValue ? : bigint): Promise < bigint > {
    const keyLeo = js2leo.address(key);

    const params = [keyLeo]
    const result = await zkGetMapping({
      config: this.config,
      transition: 'account',
      params,
    });

    if (result != null)
      return leo2js.u64(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`account returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async unalienable(key: number, defaultValue ? : boolean): Promise < boolean > {
    const keyLeo = js2leo.u8(key);

    const params = [keyLeo]
    const result = await zkGetMapping({
      config: this.config,
      transition: 'unalienable',
      params,
    });

    if (result != null)
      return leo2js.boolean(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`unalienable returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async token_owner(key: boolean, defaultValue ? : LeoAddress): Promise < LeoAddress > {
    const keyLeo = js2leo.boolean(key);

    const params = [keyLeo]
    const result = await zkGetMapping({
      config: this.config,
      transition: 'token_owner',
      params,
    });

    if (result != null)
      return leo2js.address(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`token_owner returned invalid value[input: ${key}, output: ${result}`);
    }
  }


}