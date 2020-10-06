import { Badge } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState , useRef, useEffect } from 'react';

import Panel from '../Panel';

import styles from './Bell.css';



Bell.propTypes = {
	count: PropTypes.number,
};

/**
 * Hook that alerts clicks outside of the passed ref
 * @param {Ref} ref referenced component
 * @param {Function} onOutisdeClick function to do when outside of component is clicked
 * @returns {*} nothing
 */
function useOutsideAlerter (ref, onOutisdeClick) {
	useEffect(() => {
		function handleClickOutside (event) {
			if (ref.current && !ref.current.contains(event.target)) {
				onOutisdeClick();
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
}

export default function Bell ( { count } ) {
	const [showPanel, setShowPanel] = useState(false);
	const [countState, setCount] = useState(count);
	const wrapperRef = useRef(null);

	function togglePanel () {
		setShowPanel(!showPanel);
	}

	function onBellClick () {
		togglePanel();
	}

	useOutsideAlerter(wrapperRef, togglePanel);

	return (
		<div>
			<Badge badge={countState}>
				<div className={styles.bell} onClick={onBellClick}/>
			</Badge>
			{showPanel && (
				<div ref={wrapperRef}>
					<Panel />
				</div>
			)}
		</div>
	);
}