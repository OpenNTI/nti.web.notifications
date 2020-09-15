import { Text } from "@nti/web-commons";
import PropTypes from "prop-types";
import React from 'react';

import Registry from './Registry';


ChatGroup.propTypes = {
	item: PropTypes.object.isRequired,
};
// TODO
Registry.register()(ChatGroup);
export default function ChatGroup ({ item }) {}
