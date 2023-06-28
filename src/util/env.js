import dotenv from 'dotenv';

/**
 * function to be used in the entry point, it will allow access to the .env file props in the app
 */
export default dotenv.config({ silent: true });
