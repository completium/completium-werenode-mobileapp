import { createSlice } from '@reduxjs/toolkit'
import { ModalType } from '../types'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
      visible: false,
      mtype: ModalType.LoadingPlug
    },
    reducers: {
      inverseVisible: state => {
        state.visible = !state.visible
      },
      setModalType: (state,action) => {
        state.mtype = action.payload
      }
    }
  })

export const selectVisible = state => state.modal.visible
export const selectModalType = state => state.modal.mtype

export const { inverseVisible, setModalType } = modalSlice.actions

export default modalSlice.reducer