import React, { useEffect, useState } from 'react';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { COINA, COINB, COINC, DEFAULT_VALUE, ETH } from './SupportedCoins';

const Selector = ({ defaultValue, ignoreValue, setToken, id }) => {
  const menu = [
    { key: ETH, name: ETH },
    { key: COINA, name: COINA },
    { key: COINB, name: COINB },
    { key: COINC, name: COINC },
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
        <Button>
          {selectedItem}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label='Dynamic Actions'
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
            color={item.key === 'delete' ? 'error' : 'default'}
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
