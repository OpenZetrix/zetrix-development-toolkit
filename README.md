# zetrix-development-toolkit
A Zetrix development environment for professionals. It facilitates performing frequent tasks, such as running tests, interacting with a smart contract.

Getting Started
1. npm init -y
2. npm install zetrix-development-toolkit
3. npx zetrix-init [PROJECT NAME]
4. Copy - "scripts": {
    "compile": "concat -o [PROJECT NAME]/build/compiled.js [PROJECT NAME]/contracts/1-base-starting.js [PROJECT NAME]/contracts/2-body-ZTP20.js [PROJECT NAME]/contracts/3-base-ending.js",
    "deploy": "node ./[PROJECT NAME]/scripts/01_deploy.js",
    "test": "node ./[PROJECT NAME]/tests/test-01.js"
  },
5. Create .env file with PRIVATE_KEY=private key, ZTX_ADDRESS=address, NODE_URL=test-node.zetrix.com
5. npm run compile
6. npm run deploy
7. npm run test