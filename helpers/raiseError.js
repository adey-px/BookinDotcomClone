/* 
Custom error handler
*/
export const raiseError = (status, message) => {
	const err = new Error();
	err.status = status;
	err.message = message;

	return err;
};

export default raiseError;
