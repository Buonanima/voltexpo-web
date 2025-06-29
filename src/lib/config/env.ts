import { dev } from '$app/environment';

interface Config {
	API_BASE_URL: string;
}

const config: Config = {
	API_BASE_URL: dev ? 'http://localhost:8080' : 'http://localhost:8080' // Replace with your production URL
};

export default config;
