'use client'
import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../redux/store'
  
interface StoreProviderProps  { 
    children : ReactNode
}
export default function StoreProvider({ children } : StoreProviderProps) {
  
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}