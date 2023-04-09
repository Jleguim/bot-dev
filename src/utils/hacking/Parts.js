module.exports = [
  {
    name: 'CPU 1.6 GHz',
    modifiers: [{ key: 'cpu_speed', value: 1.6 }],
    price: 100
  },
  {
    name: 'RAM 2 GBs x2',
    modifiers: [{ key: 'dual_channel', value: true }, { key: 'ram_capacity', value: 4 }],
    price: 100
  },
  {
    name: 'RAM 4 GB',
    modifiers: [{ key: 'dual_channel', value: false }, { key: 'ram_capacity', value: 4 }],
    price: 100
  },
  {
    name: 'RAM 4 GB x2',
    modifiers: [{ key: 'dual_channel', value: true }, { key: 'ram_capacity', value: 8 }],
    price: 100
  },
  {
    name: 'RAM 8 GB',
    modifiers: [{ key: 'dual_channel', value: false }, { key: 'ram_capacity', value: 8 }],
    price: 100
  },
  {
    name: 'RAM 8 GBs x2',
    modifiers: [{ key: 'dual_channel', value: true }, { key: 'ram_capacity', value: 16 }],
    price: 100
  },
  {
    name: 'Cable Ethernet',
    modifiers: [{ key: 'ethernet', value: true }],
    price: 100
  }
]
