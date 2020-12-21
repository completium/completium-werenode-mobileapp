import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    plug: null,
		duration: 0,
		durationUnit: 'min',
		state: 'off'
  },
  reducers: {
    setPlug: (state, action) => {
			state.plug = action.payload
		}
  }
})

export const selectSessionPlug = state => {
	return state.session.plug
}

export const { setPlug } = sessionSlice.actions

export default sessionSlice.reducer