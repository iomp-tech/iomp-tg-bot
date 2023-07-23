import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs';
import sharp from 'sharp';

class FileService {
	saveImage(file, fullPath, savePath) {
		try {
			const fileName = uuid.v4();

			sharp(file.data)
				.resize(1024)
				.withMetadata()
				.jpeg({ mozjpeg: true })
				.toFile(`${fullPath}/${fileName}_1024.jpg`, (err) => {
					if (err) throw err;
				});

			return {
				path: fullPath,
				file: `${savePath}/${fileName}_1024.jpg`
			};
		} catch (e) {
			console.log(e)
		}
	}

	saveFile(file, fullPath) {
		try {
			const fileName = `${uuid.v4()}.${file.name.split(".")[1]}`;
			const filePath = path.resolve(fullPath, `${fileName}.${file.name.split(".")[1]}`);

			file.mv(filePath);

			return {
				path: fullPath,
				fileName: `${fileName}.${file.name.split(".")[1]}`
			};
		} catch (e) {
			console.log(e)
		}
	}

	deleteFile(file) {
		try {
			fs.unlinkSync(`./${file}`)
			
			return `Файлы удалены`;
		} catch (e) {
			console.log(e)
		}
	}
}

export default new FileService();