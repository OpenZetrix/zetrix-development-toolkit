
function init(input_str) {
    let paramObj = JSON.parse(input_str).params;
    Utils.assert(paramObj.name !== undefined && paramObj.name.length > 0, "Param obj has no name.");
    Utils.assert(paramObj.symbol !== undefined && paramObj.symbol.length > 0, "Param obj has no symbol.");
    Utils.assert(paramObj.describe !== undefined && paramObj.describe.length > 0, "Param obj has no describe.");
    Utils.assert(paramObj.decimals !== undefined && Utils.int64Compare(paramObj.decimals, "0") >= 0, "Param obj decimals error.");
    Utils.assert(paramObj.version !== undefined && paramObj.version.length > 0, "Param obj has no version.");
    Utils.assert(paramObj.supply !== undefined && Utils.int64Compare(paramObj.supply, "0") >= 0, "Param obj supply error.");
    paramObj.protocol = ZTP_PROTOCOL;
    paramObj.issuer = Chain.msg.sender;
    Chain.store(CONTRACT_PRE, JSON.stringify(paramObj));
    // Contract deployer can mint total supply and own it all
    // Chain.store(Chain.msg.sender, paramObj.supply);
    Chain.tlog("Transfer", "0x", Chain.msg.sender, paramObj.supply);
}

function main(input_str) {
    let funcList = {
        'approve': approve,
        'transfer': transfer,
        'transferFrom': transferFrom
    };
    let inputObj = JSON.parse(input_str);
    Utils.assert(funcList.hasOwnProperty(inputObj.method) && typeof funcList[inputObj.method] === "function", "Cannot find func:" + inputObj.method);
    funcList[inputObj.method](inputObj.params);
}
    
function query(input_str) {
    let queryList = {
        'allowance': allowance,
        'balanceOf': balanceOf,
        'contractInfo': contractInfo
    };
    let inputObj = JSON.parse(input_str);
    Utils.assert(queryList.hasOwnProperty(inputObj.method) && typeof queryList[inputObj.method] === "function", "Cannot find func:" + inputObj.method);
    return JSON.stringify(queryList[inputObj.method](inputObj.params));
}