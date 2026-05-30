import { useContext } from 'react'
import type { ProductContextType } from '../../types/context'
import { ProductContext } from '../../App'

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext)
  
  if (!context) {
    throw new Error('useProductContext must be used within ProductContext.Provider')
  }
  
  return context
}
