import { Token_sbtContract } from '../artifacts/js/token_sbt';

const contract = new Token_sbtContract({
  networkName: 'mainnet'
});

(async () => {
  const result = await contract.deploy();
  console.log(result);
})();
