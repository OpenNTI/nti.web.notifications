export default styled('div')`
	--size: 42px;
	margin-right: 15px;
	vertical-align: middle;
	border-radius: 50%;
	max-width: var(--size);

	& img,
	& svg {
		width: var(--size);
		height: var(--size);
	}
`;
