const Util = require('./util');
let tx = {
    "compression": "none",
    "transaction": {
        "expiration": "2019-03-25T08:36:34",
        "ref_block_num": 23268,
        "ref_block_prefix": 954453432,
        "net_usage_words": 0,
        "max_cpu_usage_ms": 0,
        "delay_sec": 0,
        "context_free_actions": [],
        "actions": [{
            "account": "eosio.token",
            "name": "transfer",
            "authorization": [{"actor": "fanyongpengi", "permission": "active"}],
            "data": "e0d854954deaa759c031729266431785640000000000000004454f53000000005866616e796f6e6770656e676d2d343237306262373239653763323163316262323032373032376430636539363830653064306137323631666537666339393266626436343638376565666539352d31353533353033343135"
        }],
        "transaction_extensions": []
    },
    "signatures": ["SIG_K1_Km3g6zi5iGRH2ZmMRR4gT5DypuM8aMBgVbC8CL1n986LL7tiQVQohC87Ux1mQyS6yseevnt7PcnPk1vizFcKLLGXNLVYpi"]
};

let obj = Util.serializeTransaction(tx, "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f");

console.log(obj);