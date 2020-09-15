import { Text } from "@nti/web-commons";
import PropTypes from "prop-types";
import React from 'react';

import Registry from './Registry';

Chat.propTypes = {
	item: PropTypes.object.isRequired,
};
// TODO
Registry.register()(Chat);
export default function Chat ({ item }) {}
