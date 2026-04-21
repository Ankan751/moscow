import imagekit from '../config/imagekit.js';
import logger from './logger.js';

/**
 * Deletes multiple images from ImageKit by their URLs.
 * Since fileId is not stored, it first searches for each file to get its ID.
 * @param {string[]} imageUrls - Array of ImageKit URLs to delete
 */
export const deleteImagesFromImageKit = async (imageUrls) => {
    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
        return;
    }

    try {
        const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
        logger.info(`Starting cleanup for ${imageUrls.length} images`, { urlEndpoint });
        
        const deletePromises = imageUrls.map(async (url) => {
            try {
                // Extract path from URL
                let path = url.replace(urlEndpoint, '');
                if (path.startsWith('/')) path = path.substring(1);
                path = path.split('?')[0];
                const fileName = path.split('/').pop();

                logger.debug(`Searching for file: ${fileName} in folder: Property`);

                // Search for the file
                const files = await imagekit.listFiles({
                    path: 'Property',
                    searchQuery: `name = "${fileName}"`
                });

                logger.debug(`Search result for ${fileName}: ${files?.length || 0} files found`);

                if (files && files.length > 0) {
                    // Try to find the exact match
                    const targetFile = files.find(f => url.includes(f.filePath) || url.includes(f.name));
                    
                    if (targetFile) {
                        logger.info(`Attempting to delete fileId: ${targetFile.fileId} (${targetFile.filePath})`);
                        const response = await imagekit.deleteFile(targetFile.fileId);
                        logger.info(`ImageKit delete response for ${targetFile.fileId}:`, { response });
                    } else {
                        logger.warn(`File found by name but path didn't match`, { 
                            url, 
                            foundPaths: files.map(f => f.filePath) 
                        });
                    }
                } else {
                    logger.warn(`File not found in ImageKit search`, { fileName, url });
                }
            } catch (err) {
                logger.error(`Failed to process image deletion for ${url}`, { 
                    error: err.message,
                    code: err.code || err.$metadata?.httpStatusCode 
                });
            }
        });

        await Promise.allSettled(deletePromises);
        logger.info(`Cleanup process completed`);
    } catch (error) {
        logger.error(`Critical error in bulk ImageKit cleanup`, { error: error.message });
    }
};
