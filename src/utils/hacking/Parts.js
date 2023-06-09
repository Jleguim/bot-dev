module.exports = [
  {
    name: 'CPU 1.6 GHz',
    desc: 'Boosts your CPU clock up to 1.6 GHz.',
    modifiers: [{ key: 'cpu_speed', value: 1.6 }],
    price: 100
  },
  {
    name: 'RAM 2 GB x2',
    desc: 'Give you dual channel capabilities.',
    modifiers: [{ key: 'dual_channel', value: true }, { key: 'ram_capacity', value: 4 }],
    price: 100
  },
  {
    name: 'RAM 4 GB',
    desc: '4 Gigs of RAM, lol.',
    modifiers: [{ key: 'dual_channel', value: false }, { key: 'ram_capacity', value: 4 }],
    price: 100
  },
  {
    name: 'RAM 4 GB x2',
    desc: 'Gives you dual channel capabilities.',
    modifiers: [{ key: 'dual_channel', value: true }, { key: 'ram_capacity', value: 8 }],
    price: 100
  },
  {
    name: 'RAM 8 GB',
    desc: '8 Gigs of RAM, lol.',
    modifiers: [{ key: 'dual_channel', value: false }, { key: 'ram_capacity', value: 8 }],
    price: 100
  },
  {
    name: 'RAM 8 GB x2',
    desc: 'Gives you dual channel capabilities.',
    modifiers: [{ key: 'dual_channel', value: true }, { key: 'ram_capacity', value: 16 }],
    price: 100
  },
  {
    name: 'Cable Ethernet',
    desc: 'Faster internet connection.',
    modifiers: [{ key: 'ethernet', value: true }],
    price: 100
  }
]
