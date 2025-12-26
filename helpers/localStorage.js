import _ from "lodash";

const secretKey = "app.resarchHound753";
const deriveKey = async (password, salt) => {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
};


const encryptData = async (data, password) => {
    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);

    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encoder.encode(data)
    );

    const combined = new Uint8Array(
        salt.length + iv.length + encrypted.byteLength
    );
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encrypted), salt.length + iv.length);

    return btoa(String.fromCharCode(...combined));
};

const decryptData = async (encryptedData, password) => {
    try {
        const combined = new Uint8Array(
            atob(encryptedData)
                .split("")
                .map((char) => char.charCodeAt(0))
        );

        const salt = combined.slice(0, 16);
        const iv = combined.slice(16, 28);
        const encrypted = combined.slice(28);

        const key = await deriveKey(password, salt);

        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            encrypted
        );

        const decoder = new TextDecoder();
        return decoder.decode(decrypted);
    } catch (error) {
        return null;
    }
};

const localHelper = {
    getItem: async function (key) {
        let data = localStorage.getItem(key);
        if (_.isEmpty(data)) {
            return null;
        }

        try {
            const decryptedString = await decryptData(data, secretKey);
            if (decryptedString) {
                const decryptedData = JSON.parse(decryptedString);
                return _.isEmpty(decryptedData) ? null : decryptedData;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    setItem: async function (key, value) {
        console.log("setStorageData key", key)
        console.log("setStorageData value", value)
        try {
            const ciphertext = await encryptData(JSON.stringify(value), secretKey);
            localStorage.setItem(key, ciphertext);
        } catch (error) {
            console.log("Set item error", error);
            throw error
        }
    },
}

export default localHelper
