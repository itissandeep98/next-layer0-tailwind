import React from "react";
import Meta from "./Meta";

const LayoutWrapper = (params) => {
	const { children, ...props } = params;

	return (
		<>
			<Meta />
			{React.cloneElement(children, { ...props })}
		</>
	);
};

export default LayoutWrapper;
