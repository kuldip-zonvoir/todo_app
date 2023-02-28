
const mongoose = require('mongoose');

const keys = require('../config/keys');
const { database } = keys;

const setupDB = async () => {
    try {
        mongoose.set("strictQuery", false);
		const conn = await mongoose.connect(database.url,
			{
                useNewUrlParser: true,
                useUnifiedTopology: true}
        );
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

//     try {
//         // Connect to MongoDB
//         // mongoose.set('useCreateIndex', true);
//     mongoose
//       .connect(database.url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false
//       })
//       .then(() =>
//         console.log('MongoDB Connected!')
//       )
//       .catch(err => console.log(err));
//   } catch (error) {
//     return null;
//   }
// };

module.exports = setupDB;
