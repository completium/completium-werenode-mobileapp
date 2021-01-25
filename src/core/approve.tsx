const network='https://delphinet-tezos.giganode.io/chains/main/';

const HeadHash = network + '/blocks/head/hash'

export async function approve() {
  return new Promise(resolve => {
    fetch(HeadHash)
    .then(response => {
      return response.json()
    })
    .then(branch => {
      return resolve(branch);
    })
    .catch(error => {
      return resolve(error);
    });
  });
}