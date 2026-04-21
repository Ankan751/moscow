import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function clearJalandharCache() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const SearchCache = mongoose.model('SearchCache', new mongoose.Schema({ cacheKey: String }));
        const result = await SearchCache.deleteMany({ cacheKey: { $regex: 'search:jalandhar', $options: 'i' } });
        console.log(`Deleted ${result.deletedCount} cache entries for jalandhar`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

clearJalandharCache();
