import CryptoJS from 'crypto-js';

const secret_key = 'setofshops_encrypt_data';

export const encryptData = (data) => {
    try {
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secret_key).toString();
        return encryptedData;
    } catch (error) {
        console.error('Error encrypting data:', error);
    }
};

export const decryptData = (data) => {
    try {
        if (data) {
            // Ensure data is properly base64 decoded before decrypting
            const bytes = CryptoJS.AES.decrypt(data, secret_key);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));  // Use Utf8 encoding here

            if (!decryptedData) {
                console.error('Decryption failed. The data could not be parsed.');
            }
            return decryptedData;
        }
    } catch (error) {
        console.error('Error decrypting data:', error);
    }
    return null;
};
