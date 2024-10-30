function init(input_str) {
    let paramObj = JSON.parse(input_str).params;
    Utils.assert(paramObj.name !== undefined && paramObj.name.length > 0, 'Param obj has no name.');
    Utils.assert(paramObj.symbol !== undefined && paramObj.symbol.length > 0, 'Param obj has no symbol.');
    Utils.assert(paramObj.describe !== undefined && paramObj.describe.length > 0, 'Param obj has no describe.');
    Utils.assert(paramObj.protocol !== undefined && paramObj.protocol.length > 0 && paramObj.protocol.toLowerCase() === ZTP_PROTOCOL, 'Param obj protocol must be ZTP721.');
    Utils.assert(paramObj.version !== undefined && paramObj.version.length > 0, 'Param obj has no version.');
  
    saveObj(CONTRACT_PRE, paramObj);
    return;
  }
  
  function main(input_str) {
      let funcList = {
          'approve': approve,
          'mint': mint,
          'safeTransferFrom': safeTransferFrom,
          'setApprovalForAll': setApprovalForAll,
          'transferFrom': transferFrom
      };
      let inputObj = JSON.parse(input_str);
      Utils.assert(funcList.hasOwnProperty(inputObj.method) && typeof funcList[inputObj.method] === "function", "Cannot find func:" + inputObj.method);
      funcList[inputObj.method](inputObj.params);
  }
      
  function query(input_str) {
      let queryList = {
          'getApproved': getApproved,
          'balanceOf': balanceOf,
          'contractInfo': contractInfo,
          'isApprovedForAll': isApprovedForAll,
          'ownerOf': ownerOf,
          'tokenURI': tokenURI,
          'totalSupply': totalSupply
      };
      let inputObj = JSON.parse(input_str);
      Utils.assert(queryList.hasOwnProperty(inputObj.method) && typeof queryList[inputObj.method] === "function", "Cannot find func:" + inputObj.method);
      return JSON.stringify(queryList[inputObj.method](inputObj.params));
  }