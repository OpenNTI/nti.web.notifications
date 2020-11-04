import React from 'react';

export default function useMockServer (mockService) {
	React.useEffect(() => {
		const old = global.$AppConfig;
		global.$AppConfig = {
			...(global.$AppConfig) ?? {},
			nodeService: mockService,
			nodeInterface: {
				getServiceDocument: () => { Promise.resolve(global.$AppConfig.nodeService); },
			}
		};
		return () => global.$AppConfig = old;
	}, []);
}
