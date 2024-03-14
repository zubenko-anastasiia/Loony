import React, { useEffect, useState } from 'react';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { BTC, USDT, DEFAULT_VALUE, ETH, LINK } from './SupportedCoins';

const Selector = ({ defaultValue, ignoreValue, setToken, id }) => {


  const menu = [
    { key: ETH, name: ETH },
    { key: LINK, name: LINK },
    { key: BTC, name: BTC },
    { key: USDT, name: USDT },
  ];

  const [selectedItem, setSelectedItem] = useState();
  const [menuItems, setMenuItems] = useState(getFilteredItems(ignoreValue));

  function getFilteredItems(ignoreValue) {
    return menu.filter(item => item.key !== ignoreValue);
  }

  useEffect(() => {
    setSelectedItem(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setMenuItems(getFilteredItems(ignoreValue));
  }, [ignoreValue]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className='text-gray-200'>
          {selectedItem}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label='Dynamic Actions'
        className='backdrop-blur-lg bg-opacity-20'
        items={menuItems}
        onAction={key => {
          setSelectedItem(key);
          setToken(key);
        }}
      >
        {(item) => (
          <DropdownItem
            aria-label={id}
            key={item.key}
            className='text-white'
            name={item.key}
          >
            {item.name}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Selector;
