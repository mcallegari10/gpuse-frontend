import bitcore from 'bitcore-lib';
import explorers from 'bitcore-explorers';

const Payments = {
  transfer: function ({ privateKeyWIF, fromAddressStr, toAddressStr, amount, fee }, callback) {

    const insights = new explorers.Insight(bitcore.Networks.testnet);
    const fromAddress = bitcore.Address.fromString(fromAddressStr, bitcore.Networks.testnet);
    const toAddress = bitcore.Address.fromString(toAddressStr, bitcore.Networks.testnet);
    const privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);

    insights.getUnspentUtxos(fromAddress, (error, utxos) => {
      if (error) {
        callback(error);
      } else {
        const totalUnspent = utxos.reduce((sum, utxo) => { return sum + utxo.satoshis }, 0);
        if (totalUnspent < amount) {
          callback(new Error("Unsufficient funds"));
          return;
        }

        const transaction = new bitcore.Transaction()
          .from(utxos)
          .to(toAddress, amount - fee)
          .change(toAddress)
          .fee(fee)
          .sign(privateKey)

        console.log("Broadcasting transaction ...");
        insights.broadcast(transaction, callback);
      }
    });
  }
};

export default Payments;
