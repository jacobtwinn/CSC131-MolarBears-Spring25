'use client'
<<<<<<< HEAD

=======
>>>>>>> ced117d3e1fb3cf91ac8a27ebd1a36de93b7a4a3
import React from 'react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
