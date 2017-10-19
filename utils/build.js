import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.babel';
import fs from 'fs-extra';
import { promisify } from 'util';

const rootDir = path.resolve(__dirname, '../');

(async() => {
    try {
        await fs.emptyDir('../build');
        await Promise.all([
            fs.copy(path.resolve(rootDir, 'src', 'manifest.json'), path.resolve(rootDir, 'build', 'manifest.json')),
            promisify(webpack)(config)
        ]);
    } catch (error) {
        console.error(error);
    }
})();
