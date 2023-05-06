'use client';

import { Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function BottomBar() {
  return (
<Flex w='100%' position={'fixed'} bottom={0} bgColor={'black'} align={'center'} justify={'center'}>
       <Center><Text as='h1' textAlign={'center'}>Testing Bottom Bar</Text></Center>
      </Flex>
  )
}
