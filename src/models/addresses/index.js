export default {
  state: {
    addresses: []
  },
  reducers: {
    addAddress: (state, value) => ({
      ...state,
      addresses: [...state.addresses, value]
    }),
    updateAddress: (state, value) => ({
      ...state,
      addresses: value
    })
  }
};
