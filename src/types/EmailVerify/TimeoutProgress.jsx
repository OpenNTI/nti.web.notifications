import PropTypes from 'prop-types';
import React from 'react';

import styles from './Style.css';

const toPercent = (x) => `${(Math.min(1, x) * 100).toFixed(0)}%`;

function useTick (done) {
	const [, update] = React.useReducer(() => Date.now());
	React.useEffect(() => {
		const next = () => {
			let t;
			update();
			if (!done) {
				t = requestAnimationFrame(next);
			}
			return t;
		};
		let t = next();
		return () => cancelAnimationFrame(t);
	}, [done]);
}

TimeoutProgress.propTypes = {
	progress: PropTypes.func.isRequired,
};

export default function TimeoutProgress ({ progress }) {
	const percent = toPercent(progress());
	useTick(percent === '100%');

	return (
		<div className={styles.timeoutBarContainer}>
			<div style={{ width: percent }} className={styles.timeoutBar}></div>
		</div>
	);
}
