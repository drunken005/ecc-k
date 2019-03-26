const ser = require("./eosjs-serialize.js");
const transactionAbi = require('./transaction.abi.json');
const Crypto = require("crypto-browserify");


let sha256 = function (data, encoding = "hex") {
    return Crypto.createHash("sha256").update(data).digest(encoding);
};

let uint8ArrayToHex = function (data) {
    let result = "";
    for (let x of data) {
        result += ("00" + x.toString(16)).slice(-2);
    }
    return result.toLowerCase();
};

let transactionTypes = ser.getTypesFromAbi(ser.createInitialTypes(), transactionAbi);
let serialize = function (buffer, type, value) {
    transactionTypes.get(type).serialize(buffer, value);
};

let getSignHashList = function (serializedTransaction, chainId) {
    let chainIdBuffer = Buffer.from(chainId, "hex");
    let serializedTransactionBuffer = Buffer.from(serializedTransaction);
    let paddingBuffer = Buffer.from(new Uint8Array(32));
    let signBuffer = Buffer.concat([chainIdBuffer, serializedTransactionBuffer, paddingBuffer]);
    let signHash = sha256(signBuffer);

    return [signHash];
};

let serializeTransaction = function (transaction, chainId) {
    const buffer = new ser.SerialBuffer({textEncoder: this.textEncoder, textDecoder: this.textDecoder});
    serialize(buffer, "transaction", Object.assign({
        max_net_usage_words: 0,
        max_cpu_usage_ms: 0,
        delay_sec: 0,
        context_free_actions: [],
        actions: [],
        transaction_extensions: []
    }, transaction.transaction));
    let serBuff = buffer.asUint8Array();

    let res = {
        txHash: sha256(serBuff),
        rawTransaction: uint8ArrayToHex(serBuff),
        signHashList: getSignHashList(serBuff, chainId),
    };

    if (transaction.hasOwnProperty('signatures')) {
        res.signList = transaction.signatures;
    }

    return res;
};

module.exports = {
    serializeTransaction
};