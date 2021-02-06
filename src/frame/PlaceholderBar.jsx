export const Fading = styled.div`
	animation: fading 1.5s infinite;

	@keyframes fading {
		0% { opacity: 0.1; }
		50% { opacity: 0.2; }
		100% { opacity: 0.1; }
	}
`;

export default styled(Fading).attrs(({width, height, ...props}) => ({
	...props,
	style: {
		...props.style,
		width,
		height: height ?? 20
	}
}))`
	background-color: var(--primary-grey);
	margin-bottom: 5px;
`;
