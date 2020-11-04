export default function useMockServer (mockService) {
	const old = global.$AppConfig;
	global.$AppConfig = {
		...(global.$AppConfig ?? {}),
		nodeService: mockService,
		nodeInterface: {
			getServiceDocument: () => {
				Promise.resolve(global.$AppConfig.nodeService);
			},
		},
	};
	return () => (global.$AppConfig = old);
}
