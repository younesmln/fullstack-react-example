import React from 'react';
import Link from '../../components/common/link';
import { Menu, Dropdown } from 'semantic-ui-react'

function Navbar({loggedIn, logout, user}) {
  return (
    <Menu style={style} size="large" >
      {(!loggedIn) ? (
        <Menu.Menu position="right">
          <Link to="/login" label="login"  />
          <Link to="/register" label="register"  />
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Dropdown className='item' text={user.name}>
            <Dropdown.Menu>
              <Dropdown.Item>a thing</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      )}
    </Menu>
  )
}

const style = {
  marginBottom: '2em'
};

export default Navbar;