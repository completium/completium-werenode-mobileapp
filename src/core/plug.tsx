import { Plug, PlugPricing, Currency, PlugType } from '../types';

/* const testPlugs : Plug[] = [
    { key: 'AR346YU79SBN631XGT78Z138',
      x: '48.8862398',
      y: '2.2699594',
      pricing: PlugPricing.PerMinute,
      price: 6,
      decimal: 2,
      currency: Currency.Euro,
      plugtype: PlugType.Type2,
      power: 11
    },
    { key: 'CETNUIOND098653123455899',
      x: '47.691927',
      y: '2.7437763',
      pricing: PlugPricing.PerMinute,
      price: 13,
      decimal: 2,
      currency: Currency.WRC,
      plugtype: PlugType.Type2,
      power: 7
    },
  ] */

function getStorageUrl(address : string) {
  return 'https://testnet-tezos.giganode.io/chains/main/blocks/head/context/contracts/'+address+'/storage'
}

function getAddressBookUrl() {
  return getStorageUrl('KT1X88DyBqCkU1P9tMJBHgYcZDFepFc1d5ub');
}

function getEvseAddress(addressBook,id) {
  const evses = addressBook.args[1].args[1].args[0];
  const evse = evses.find(e => e.args[0].string === id);
  const evseAddress = evse.args[1].args[0].string
  return evseAddress;
}

type RawPlug = {
  gps: string,
  currency: string,
  plugs: string[],
  state: string,
  services: { type: string, price: string }[]
}

function getEvse(json) : RawPlug {
  return {
    gps: json.args[1].args[1].args[0].string,
    currency: json.args[1].args[1].args[1].args[0].int,
    plugs: json.args[1].args[1].args[1].args[1].args[0].map(p => p.int),
    state: json.args[1].args[1].args[1].args[1].args[1].args[0].int,
    services: json.args[1].args[1].args[1].args[1].args[1].args[1].args[1].map(s => {
      return {
        type: s.args[0].int,
        price: s.args[1].int
      }
    })
  }
}

function serviceTypeToPricing(st : string) : PlugPricing {
  switch (st) {
    case "1": return PlugPricing.PerMinute;
    default: return PlugPricing.Unknown;
  }
}

function servicePriceToPrice(sp: string) : number {
  return Number(sp);
}

function currencyToCurrency(c : string) : Currency {
  switch (c) {
    case "1": return Currency.Euro;
    default : return Currency.WRC;
  }
}

function plugToPlugType(p : string) {
  switch (p) {
    case "1": return { power: 11, plugtype: PlugType.Type2 };
    default: return { power: 0, plugtype: PlugType.Unknown };
  }
}

function evseToPlug(id: string, evse : RawPlug) : Plug {
  return {
    key: id,
    x: evse.gps.split(',')[0],
    y: evse.gps.split(',')[1],
    pricing: serviceTypeToPricing(evse.services[0].type),
    price: servicePriceToPrice(evse.services[0].price),
    currency: currencyToCurrency(evse.currency),
    decimal: 4,
    power: Number(plugToPlugType(evse.plugs[0]).power),
    plugtype: plugToPlugType(evse.plugs[0]).plugtype
  }
}

export const getPlug = function(id : string) {
  return new Promise(resolve => {
    const url = getAddressBookUrl();
    fetch(getAddressBookUrl())
    .then(response => {
      return response.json()
    })
    .then(responseJson => {
      const evseAddress = getEvseAddress(responseJson,id);
      console.log(evseAddress);
      return fetch(getStorageUrl(evseAddress))
    })
    .then(response => response.json())
    .then(responseJson => {
      const evse = getEvse(responseJson);
      const plug = evseToPlug(id, evse);
      return resolve({loaded:true, data: plug})
    })
    .catch(error => {
      console.log(error);
      return resolve({loaded:false, data: error});
    });
  });
};
