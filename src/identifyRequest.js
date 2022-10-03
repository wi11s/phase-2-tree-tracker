const fs = require('fs'); // File System | Node.js
const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams

const image_1 = '../images/image_1.jpeg';
const image_2 = '../images/image_2.jpeg';

(async () => {
let form = new FormData();

form.append('organs', 'flower');
form.append('images', fs.createReadStream(image_1));

form.append('organs', 'leaf');
form.append('images', fs.createReadStream(image_2));

try {
	const { status, data } = await axios.post(
		'https://my-api.plantnet.org/v2/identify/all?api-key=2b10MuKVtITaFxmp9pNQrYKQu',
		form, {
			headers: form.getHeaders()
		}
	);

	console.log('status', status); // should be: 200
	console.log('data', require('util').inspect(data, false, null, true)); // should be: read "Step 6" below
} catch (error) {
	console.error('error', error);
}
})();