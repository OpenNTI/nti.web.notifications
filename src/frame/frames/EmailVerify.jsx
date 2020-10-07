import PropTypes from 'prop-types';
import React from 'react';

import styles from '../Style.css';

EmailVerifyFrame.propTypes = {
	dismissCallBack: PropTypes.func.isRequired,
	parentChildren: PropTypes.object.isRequired,
};

export default function EmailVerifyFrame ( { dismissCallBack, parentChildren } ) {
	return (
		<div className={styles.notificationItemContainer} style={{backgroundColor: '#f7f2d6'}}>
			<div className={styles.notificationItem}>
				<div className={styles.wrap}>
					{parentChildren}
				</div>
				<div onClick={dismissCallBack} className={styles.dismissButton}>&times;</div>
			</div>
		</div>
	);
}