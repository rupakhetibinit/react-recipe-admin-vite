import React from 'react';
const ReactLazyPreload = (importStatement) => {
	const Component = React.lazy(importStatement);
	Component.preload = importStatement;
	return Component;
};

export default ReactLazyPreload;
