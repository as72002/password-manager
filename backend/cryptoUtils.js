import crypto from "crypto"
import dotenv from "dotenv";
dotenv.config();

const algorithm = "aes-256-cbc";
const secretKey = process.env.SECRET_KEY || "your-32-character-secret-key";

export function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted; // Store IV + encrypted data
}

export function decrypt(encryptedText) {
    try {
        const textParts = encryptedText.split(":");
        if (textParts.length !== 2) throw new Error("Invalid encrypted format");

        const iv = Buffer.from(textParts[0], "hex"); // Extract IV
        const encryptedData = textParts[1];

        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
        let decrypted = decipher.update(encryptedData, "hex", "utf8");
        decrypted += decipher.final("utf8");

        return decrypted;
    } catch (error) {
        console.error("Decryption Error:", error.message);
        return null; // Return null if decryption fails
    }
}


