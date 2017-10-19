import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.babel';
import fs from 'fs-extra';

const rootDir = path.resolve(__dirname, '../');

(async() => {
    try {
        await fs.emptyDir('../build');
        await Promise.all([
            fs.copy(path.resolve(rootDir, 'src', 'manifest.json'), path.resolve(rootDir, 'build', 'manifest.json')),
        ]);
        webpack(config).watch({
            aggregateTimeout: 300,
            poll: 1000
        }, (err, stats) => {
            if (err) {
                console.error(err);
            } else {
                console.log(stats.toString({
                    chunks: false,  // Makes the build much quieter
                    colors: true    // Shows colors in the console
                }));
            }
        });
    } catch (error) {
        console.error(error);
    }
})();
