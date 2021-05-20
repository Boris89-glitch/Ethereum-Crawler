const container = document.querySelector('.result-container');
const container2 = document.querySelector('.result-container2');
const getWallets = document.querySelector('#get-db');
const saveBtn = document.querySelector('#btn-post');
const values = /^[a-zA-Z0-9]*$/;
const getTransactionsBtn = document.querySelector('#btn-get');
const getTokensBtn = document.querySelector('#btn-get-tokens');
const getBalanceBtn = document.querySelector('#get-balance');
const output = document.querySelector('#output');
const web3 = new Web3('https://eth-mainnet.alchemyapi.io/v2/Is-sBu0jJVk4VcERAq1glBpwXkGVXG7W');
web3.eth.net.isListening().then(() => console.log('Connected.'))
  .catch(e => console.log('Something went wrong: ' + e));

///////////////////// balance on specific date //////////////////////////
getBalanceBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  var inputDate = null;
  inputDate = document.getElementById("date").value;
  var blockNum = await web3.eth.getBlockNumber();
  var dateEntered = new Date(inputDate).setHours(0, 0, 0, 0) / 1000;
  if (inputDate === '') { output.innerHTML = 'Please select a date.'; }
  else output.innerHTML = `Looking up balance on ${inputDate} for the provided address, one moment...`;

  while (true) {
    let block = await web3.eth.getBlock(blockNum);
    let blockTime = block.timestamp;
    //compares block creation time with entered date and lowers the block num subsequently
    if ((blockTime - dateEntered) > 2592000 * 12)
      blockNum = blockNum - 125000 * 12; //~ moves whole year
    else if ((blockTime - dateEntered) > 2592000)
      blockNum = blockNum - 125000;
    else if ((blockTime - dateEntered) > 86400 * 5)
      blockNum = blockNum - 4320 * 5;
    else if ((blockTime - dateEntered) > 86400)
      blockNum = blockNum - 4320;
    else if ((blockTime - dateEntered) > 43200)
      blockNum = blockNum - 2160;
    else if ((blockTime - dateEntered) > 7200)
      blockNum = blockNum - 360;
    else if ((blockTime - dateEntered) > 1800)
      blockNum = blockNum - 90;
    else blockNum = blockNum - 10;
    if (blockTime <= dateEntered) break;
  }
  let address = document.querySelector('#wallet').value;
  try {
    web3.eth.getBalance(address, blockNum).then(b => {
      let balance = web3.utils.fromWei(b, 'ether');
      output.innerHTML = `Balance on ${inputDate}, at block number ${blockNum}, is ${balance} ETH.`;
    });
  } catch (e) {
    output.innerHTML = `${e}`;
  }
});
/////////////////////////////////////////////////// transactions ////////////////////////////////////////////////////////
async function getTransactions() {
  let blockField = document.querySelector('#block').value;
  let walletField = document.querySelector('#wallet').value;
  try {
    const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${walletField}&startblock=${blockField}&endblock=99999999&sort=asc&apikey=VCBWHJ5QX2FRDZRAIK6D5SVPJSAX1W4XQW`);

    if (!response.ok) {
      const msg = `An error has occured: ${response.status}`;
      throw new Error(msg);
    }

    const transactions = await response.json();
    if (!transactions.result.length) {
      const div = document.createElement('div');
      div.innerHTML = `<p>${transactions.message}</p>`
      container2.append(div);
    }
    if (walletField.length < 42) {
      container2.innerHTML = '';
      container2.innerHTML = 'Please enter a valid wallet address, it needs to have 42 characters.';
      throw new Error("Not a wallet, needs to have 42 characters.");

    }
    if (!walletField.match(values)) {
      container2.innerHTML = '';
      container2.innerHTML = 'Cannot contain special characters.';
      throw new Error("Cannot contain special characters.");

    }
    if (walletField.substring(0, 2) !== '0x') {
      container2.innerHTML = '';
      container2.innerHTML = 'Only Ethereum wallets accepted.';
      throw new Error("Only Ethereum wallets accepted.");
    }
    transactions.result.forEach(t => {
      const div = document.createElement('div');
      div.innerHTML =
        `
      <p>Date: ${new Date(t.timeStamp * 1000)}</p>
      <p>From: ${t.from}</p>
      <p>To: ${t.to}</p>
      <p>Amount: ${t.value / 1000000000000000000} ETH</p>`;
      container2.append(div);
    })
  } catch (e) {
    console.error(e);
  }
}

getTransactionsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  container2.innerHTML = '';
  getTransactions();
});
/////////////////////////////////////////////////// tokens tx ////////////////////////////////////////////////////
async function getTokens() {
  const blockField = document.querySelector('#block').value;
  const walletField = document.querySelector('#wallet').value;
  try {
    const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&address=${walletField}&startblock=${blockField}&endblock=99999999&sort=asc&apikey=VCBWHJ5QX2FRDZRAIK6D5SVPJSAX1W4XQW`);

    if (!response.ok) {
      const msg = `An error has occured: ${response.status}`;
      throw new Error(msg);
    }

    const transactions = await response.json();
    if (!transactions.result.length) {
      const div = document.createElement('div');
      div.innerHTML = `<p>${transactions.message}</p>`
      container2.append(div);
    }
    if (walletField.length < 42) {
      container2.innerHTML = '';
      container2.innerHTML = 'Please enter a valid wallet address, it needs to have 42 characters.';
      throw new Error("Not a wallet, needs to have 42 characters.");

    }
    if (!walletField.match(values)) {
      container2.innerHTML = '';
      container2.innerHTML = 'Cannot contain special characters.';
      throw new Error("Cannot contain special characters.");

    }
    if (walletField.substring(0, 2) !== '0x') {
      container2.innerHTML = '';
      container2.innerHTML = 'Only Ethereum wallets accepted.';
      throw new Error("Only Ethereum wallets accepted.");
    }
    transactions.result.forEach(t => {
      const div = document.createElement('div');
      div.innerHTML =
        `
      <p>Date: ${new Date(t.timeStamp * 1000)}</p>
      <p>From: ${t.from}</p>
      <p>To: ${t.to}</p>
      <p>Token: ${t.tokenName}</p>
      <p>Amount: ${t.value} wei</p>`;
      container2.append(div);
    })
  } catch (e) {
    console.error(e);
  }
}

getTokensBtn.addEventListener('click', (e) => {
  e.preventDefault();
  container2.innerHTML = '';
  getTokens();
});

////////// copyToClipboard ////////////
document.querySelector('div').onclick = e => {
  copyText(document.getElementById(e.target.id));
}

function copyText(htmlElement) {
  if (htmlElement == null || !htmlElement.text)
    return;

  let elementText = htmlElement.text;
  let inputElement = document.createElement('input');
  inputElement.setAttribute('value', elementText);
  document.body.append(inputElement);
  inputElement.select();
  document.execCommand('copy');
  inputElement.parentNode.removeChild(inputElement);
  alert('Wallet copied to clipboard.')
}

async function fetchDbWallets() {
  try {
    const response = await fetch('api/wallets');

    if (!response.ok) {
      const msg = `An error has occured: ${response.status}`;
      throw new Error(msg);
    }

    const wallets = await response.json();
    wallets.forEach(wallet => {
      const div = document.createElement('div');
      div.innerHTML = `<a href='#' id='${wallet.id}' class='address'>${wallet.address}</a>`;
      container.append(div);
    })
  } catch (e) {
    console.error(e);
  }
}

getWallets.addEventListener('click', () => {
  container.innerHTML = '';
  fetchDbWallets();
});
////////////// save wallet /////////////
function saveWallet() {
  let walletAddress = document.getElementById('wallet').value;
  let data = { address: `${walletAddress}` };

  if (walletAddress.length < 42) {
    container2.innerHTML = '';
    container2.innerHTML = 'Please enter a valid wallet address, it needs to have 42 characters.';
    throw new Error("Not a wallet, needs to have 42 characters.");

  }
  if (!walletAddress.match(values)) {
    container2.innerHTML = '';
    container2.innerHTML = 'Cannot contain special characters.';
    throw new Error("Cannot contain special characters.");

  }
  if (walletAddress.substring(0, 2) !== '0x') {
    container2.innerHTML = '';
    container2.innerHTML = 'Only Ethereum wallets accepted.';
    throw new Error("Only Ethereum wallets accepted.");
  }

  fetch('api/wallets', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(r => {
      console.log('From server:', r);
      container2.innerHTML = '';
      container2.innerHTML = 'From server : ' + r.message;
    })
    .catch(e => {
      console.error('Error:', e);
    });
};

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  saveWallet();
});




