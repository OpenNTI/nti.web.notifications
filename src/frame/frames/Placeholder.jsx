import PropTypes from 'prop-types';
import React from 'react';

import styles from '../Style.css';


Bar.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number,
};

function Bar ( { width, height } ) {
	height = height ?? 20;
	return (
		<div className={styles.bar} style={{width: width, height: height}}></div>
	);
}

export default function ItemPlaceholder () {
	return (
		<div className={styles.notificationItemContainer}>
			<div className={[styles.notificationItem, styles.emptyFrame].join(' ')}>
				<div className={styles.circle} />
				<div className={styles.wrap}>
					<Bar width={200} />
					<Bar width={75} />
					<div className={styles.notificationItemTime}>
						<Bar width={75} height={15}/>
					</div>
				</div>
			</div>
		</div>
	);
}
