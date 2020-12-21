import { createSlice } from '@reduxjs/toolkit'

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [
    { key: 'WNPLUG',
      name: 'Rue Lauriston',
    },
    { key: 'WNCooL',
      name: 'Chez Benoît',
    },
    { key: 'WNWine',
      name: 'A Caen',
    },
  ],
  reducers: {}
})

export const selectFavorites = state => state.plug

export const { } = favoritesSlice.actions

export default favoritesSlice.reducer