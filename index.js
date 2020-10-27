const CoinImp = require('coin-imp');
const http = require('http');  

(async () => {
 
  // Create miner
  const miner = await CoinImp('7591494ad1e56601bc8358580d567b319753bc773de35ce1f0d53bb8e4b97186'); // CoinImp's Site Key

  // Start miner
  await miner.start();
 
  // Listen on events
  miner.on('found', () => console.log('Found!!'))
  miner.on('accepted', () => console.log('Accepted!!'))
  miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));
 
  const requestHandler = (request, response) => {  
    console.log(request.url)
    response.end('Running the Monero Miner!!')
  }

  const server = http.createServer(requestHandler)

  server.listen(process.env.PORT, (err) => {  
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening`)
  })

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();
