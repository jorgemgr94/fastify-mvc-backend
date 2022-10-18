import { createClient, RedisClientType } from 'redis';

const REDIS_URI = process.env.REDIS_URI;

export const redisClient: RedisClientType = createClient({
	url: REDIS_URI
});

export const start = async () => {
	try {
		await redisClient.connect();
		console.log(`Redis connected`);
	} catch (error) {
		throw Error(`Can't connect to Redis ${error}`);
	}
};

export const stop = async () => {
	try {
		await redisClient.disconnect();
	} catch (error) {
		throw Error(`Can't disconnect from Redis ${error}`);
	}
};

export default redisClient;
