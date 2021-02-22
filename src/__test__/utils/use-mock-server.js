export default function useMockServer(mockService) {
	global.$AppConfig = {
		...global.$AppConfig,
		nodeService: mockService,
		nodeInterface: {
			async getServiceDocument() {
				return mockService;
			},
		},
	};
}
