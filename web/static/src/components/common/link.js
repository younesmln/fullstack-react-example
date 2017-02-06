//noinspection JSUnresolvedVariable
import React, { PropTypes } from 'react';
import {Link, Route} from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

const CustomLink = ({label, to}) => (
  <Route path={to} exact children={({ match }) => (
    <Menu.Item active={!!match} to={to} as={Link}>{label}</Menu.Item>
  )}/>
);


CustomLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  activeOnlyWhenExact: PropTypes.bool
};


export default CustomLink


