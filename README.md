# Test Repo for Web3.js Issue 4081

## How to Run

1. Until [this PR](https://github.com/ChainSafe/web3.js/pull/4332) is merged, the only way to use `createAccessList` method is to pull down the Web3.js branch: `wyatt/1.x/4081-createAccessList`, install it (`npm i`), build the library (`npm run build`), and update the `package.json` in this repo to point to your local installation of Web3.js
2. Run `npm i` in this repo
3. Run `npx @chainsafe/geth-dev-assistant --accounts 1 --tag 'stable'` to start a docker container running Geth (with a pregenerated account)
4. Run `node index.js`

After step 4 you should see output similar to:

```bash
Contract Address:  0x35288259Dc7fd6a6986cb3827965A4B711F73d81
Access List:  {
    "accessList": [
        {
            "address": "0x35288259dc7fd6a6986cb3827965a4b711f73d81",
            "storageKeys": [
                "0x0000000000000000000000000000000000000000000000000000000000000002",
                "0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad0",
                "0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad1"
            ]
        }
    ],
    "gasUsed": "0x76ee"
}
```

You can verify this is the correct output by submitting the same query directly to Geth with a request similar to:

**NOTE** Update the `to` field to point to the contract address logged in the console after running step 4

```bash
curl --location --request POST 'http://localhost:8545' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "eth_createAccessList",
    "params": [
        {
            "from": "0xf1ac0ea200ec2ee1e25081ef14717a572edda87e",
            "data": "0x013cf08b0000000000000000000000000000000000000000000000000000000000000001",
            "gasPrice": "0x3b9aca00",
            "gas": "0x3d0900",
            "to": "0x35288259dc7fd6a6986cb3827965a4b711f73d81"
        },
        "latest"
    ],
    "id": 1
}'
```

This should return a response similar to:

```bash
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "accessList": [
            {
                "address": "0x35288259dc7fd6a6986cb3827965a4b711f73d81",
                "storageKeys": [
                    "0x0000000000000000000000000000000000000000000000000000000000000002",
                    "0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad0",
                    "0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad1"
                ]
            }
        ],
        "gasUsed": "0x76ee"
    }
}
```
