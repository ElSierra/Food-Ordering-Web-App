import {
  Tabs as TabsChakra,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Tabs({ setTabIndex }: { setTabIndex: any }) {
  const bgColor = useColorModeValue("#E0E0E0", "#202020");
  return (
    <TabsChakra
      bg={bgColor}
      borderRadius={'md'}
      padding={"6px"}
      w={{base: "100%" ,lg:'fit-content'}}
      onChange={(index) => {
        setTabIndex(index);
      }}
      variant="soft-rounded"
      colorScheme="green"
    >
      <TabList>
        <Tab fontSize={"14px"}  w={{base: "100%" ,lg:'fit-content'}} >Delivery now</Tab>
        <Tab fontSize={"14px"}  w={{base: "100%" ,lg:'fit-content'}}>Pickup</Tab>
      </TabList>
    </TabsChakra>
  );
}
