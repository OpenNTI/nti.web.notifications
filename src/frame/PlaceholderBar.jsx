import React from 'react';
import PropTypes from 'prop-types';

const styles = css`
	.bar {
		composes: fading from "./keyframes.css";
		background-color: var(--primary-grey);
		margin-bottom: 5px;
	}
`;

Bar.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number,
};

export default function Bar ( { width, height } ) {
	return (
		<div className={styles.bar} style={{width, height: height ?? 20}}></div>
	);
}
