import { OverlayContentType } from "@/interface"
// type
import { PayloadAction, createSlice } from "@reduxjs/toolkit"



export interface overlayStateType {
    isOpen : boolean,
    overlayContent : OverlayContentType | null
}


const initialState : overlayStateType = {
    isOpen : false,
    overlayContent : null,
}

const overlayState = createSlice({
    name : 'overlayState',
    initialState,

    reducers : {
        openOverlay : (state, action : PayloadAction<OverlayContentType>) => {
            state.isOpen = true
            state.overlayContent = action.payload
        },
        closeOverlay : state => {
            state.isOpen = false
            state.overlayContent = null
        },
    },
})

export default overlayState
export const { openOverlay, closeOverlay } = overlayState.actions