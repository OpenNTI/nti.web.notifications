import PropTypes from 'prop-types';
import React from 'react';

const styles = css`
	.container {
		background-color: var(--panel-background-alt);
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 6px;
		overflow: hidden;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	.bar {
		height: 6px;
		background-color: var(--secondary-orange);
		transition: "width 1s linear";
		position: "absolute";
	}
`;

const toPercent = (x) => `${(Math.min(1, x) * 100).toFixed(0)}%`;

function useTick (done) {
	const [, update] = React.useReducer(() => Date.now());
	React.useEffect(() => {
		let t = null;

		const next = () => {
			if (!done) {
				update();
				t = requestAnimationFrame(next);
			}
		};

		next();
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
		<div className={styles.container}>
			<div style={{ width: percent }} className={styles.bar}></div>
		</div>
	);
}
