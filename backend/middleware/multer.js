import multer from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// Auto-create uploads directory if missing
let uploadDir = path.join(process.cwd(), "uploads");

try {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
} catch (error) {
    console.warn(`Warning: Could not create uploads directory at ${uploadDir}. Falling back to /tmp/uploads.`);
    uploadDir = path.join("/tmp", "uploads");
    if (!fs.existsSync(uploadDir)) {
        try {
            fs.mkdirSync(uploadDir, { recursive: true });
        } catch (tmpError) {
            console.error(`Critical Error: Could not create fallback uploads directory at ${uploadDir}.`, tmpError);
        }
    }
}

// Secure filename generation
const generateSecureFilename = (originalname) => {
    const ext = path.extname(originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    if (!allowedExtensions.includes(ext)) {
        throw new Error('Invalid file extension');
    }

    // Generate cryptographically secure filename
    const randomName = crypto.randomBytes(16).toString('hex');
    return `${randomName}${ext}`;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        try {
            const secureFilename = generateSecureFilename(file.originalname);
            cb(null, secureFilename);
        } catch (error) {
            cb(error);
        }
    },
});

// Enhanced file validation
const fileFilter = (req, file, cb) => {
    // Check MIME type
    const allowedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed'), false);
    }

    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    if (!allowedExtensions.includes(ext)) {
        return cb(new Error('Invalid file extension'), false);
    }

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, // Increased to 20MB
        files: 10 // Maximum 10 files per upload
    },
});

export default upload;
