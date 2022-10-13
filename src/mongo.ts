import { connect, ConnectOptions, Mongoose } from "mongoose";

export class MongoDB {
	public mongoConnection: Mongoose;

	async start() {
		try {
			const MONGODB_URI = process.env.MONGODB_URI;
			const mongooseOptions: ConnectOptions = {};

			this.mongoConnection = await connect(MONGODB_URI!, mongooseOptions);
			console.log(
				`Mongodb connected to: ${this.mongoConnection.connection.name}`
			);
		} catch (error) {
			throw Error(`Can't connect to database server ${error}`);
		}
	}
}
