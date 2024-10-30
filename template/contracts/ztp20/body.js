function makeAllowanceKey(owner, spender) {
    return 'allow_' + owner + '_to_' + spender;
}

function approve(spender, value) {
    Utils.assert(Utils.addressCheck(spender) === true, "Arg-spender is not a valid address.");
    Utils.assert(Utils.stoI64Check(value) === true, "Arg-value must be alphanumeric.");
    Utils.assert(Utils.int64Compare(value, "0") >= 0, "Arg-value of spender " + spender + " must greater or equal to 0.");
    let key = makeAllowanceKey(Chain.msg.sender, spender);
    Chain.store(key, value);
    Chain.tlog('Approve', Chain.msg.sender, spender, value);
    return true;
}

function transfer(to, value) {
    Utils.assert(Utils.addressCheck(to) === true, "Arg-to is not a valid address.");
    Utils.assert(Utils.stoI64Check(value) === true, "Arg-value must be alphanumeric.");
    Utils.assert(Utils.int64Compare(value, "0") > 0, "Arg-value must be greater than 0.");
    Utils.assert(Chain.msg.sender !== to, "Transaction initiator cannot be the receiver.");
    let senderValue = Chain.load(Chain.msg.sender);
    Utils.assert(senderValue !== false, "Failed to get the balance of " + Chain.msg.sender + " from metadata.");
    Utils.assert(Utils.int64Compare(senderValue, value) >= 0, "Balance:" + senderValue + " of sender:" + Chain.msg.sender + " < transfer value:" + value + ".");
    let toValue = Chain.load(to);
    toValue = (toValue === false) ? value: Utils.int64Add(toValue, value);
    Chain.store(to, toValue);
    senderValue = Utils.int64Sub(senderValue, value);
    Chain.store(Chain.msg.sender, senderValue);
    Chain.tlog('Transfer', Chain.msg.sender, to, value);
    return true;
}

function transferFrom(from, to, value) {
    Utils.assert(Utils.addressCheck(from) === true, "Arg-from is not a valid address.");
    Utils.assert(Utils.addressCheck(to) === true, "Arg-to is not a valid address.");
    Utils.assert(Utils.stoI64Check(value) === true, "Arg-value must be alphanumeric.");
    Utils.assert(Utils.int64Compare(value, "0") > 0, "Arg-value must be greater than 0.");
    Utils.assert(from !== to, "Sender cannot be the receiver.");
    let fromValue = Chain.load(from);
    Utils.assert(fromValue !== false, "Failed to get the value, probably because " + from + " has no value.");
    Utils.assert(Utils.int64Compare(fromValue, value) >= 0, from + " Balance:" + fromValue + " < transfer value:" + value + ".");
    let allowValue = allowance(from, Chain.msg.sender);
    Utils.assert(Utils.int64Compare(allowValue, value) >= 0, "Allowance value:" + allowValue + " < transfer value:" + value + " from " + from + " to " + to + ".");
    let toValue = Chain.load(to);
    toValue = (toValue === false) ? value: Utils.int64Add(toValue, value);
    Chain.store(to, toValue);
    fromValue = Utils.int64Sub(fromValue, value);
    Chain.store(from, fromValue);
    let allowKey = makeAllowanceKey(from, Chain.msg.sender);
    allowValue = Utils.int64Sub(allowValue, value);
    Chain.store(allowKey, allowValue);
    Chain.tlog('Transfer', from, to, value);
    return true;
}

function allowance(owner, spender) {
    Utils.assert(Utils.addressCheck(owner) === true, "Arg-owner is not a valid address.");
    Utils.assert(Utils.addressCheck(spender) === true, "Arg-spender is not a valid address.");
    let key = makeAllowanceKey(owner, spender);
    let value = Chain.load(key);
    Utils.assert(value !== false, "Failed to get the allowance given to " + spender + " by " + owner + ".");
    return value;
}

function balanceOf(address) {
    Utils.assert(Utils.addressCheck(address) === true, "Arg-address is not a valid address.");
    let value = Chain.load(address);
    return value === false ? "0": value;
}

function contractInfo() {
    return Chain.load(CONTRACT_PRE);
}