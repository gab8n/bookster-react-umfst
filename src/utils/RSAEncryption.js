import NodeRSA from 'node-rsa';

export const generateRSAKeys = () => {
  const key = new NodeRSA({ b: 512 });
  const publicKey = key.exportKey('public');
  const privateKey = key.exportKey('private');

  return {
    publicKey: publicKey,
    privateKey: privateKey,
  };
};
export const encryptRSAKeys = (keyPair, masterPublicKey) => {
  const key_public = new NodeRSA(masterPublicKey);

  const { publicKey, privateKey } = keyPair;

  const encryptedPublicKey = key_public.encrypt(publicKey, 'base64');
  const encryptedPrivateKey = key_public.encrypt(privateKey, 'base64');

  return { encryptedPublicKey, encryptedPrivateKey };
};
export const decryptRSAKeys = (encryptedPublicKey, encryptedPrivateKey) => {
  const key_private = new NodeRSA(process.env.REACT_APP_MASTER_PRIVATE_KEY);

  const decryptedPublicKey = key_private.decrypt(encryptedPublicKey, 'utf8');
  const decryptedPrivateKey = key_private.decrypt(encryptedPrivateKey, 'utf8');

  return { decryptedPublicKey, decryptedPrivateKey };
};

export const encryptString = (stringToEncrypt, publicKey) => {
  const key_public = new NodeRSA(publicKey);
  const encrypted = key_public.encrypt(stringToEncrypt, 'base64');
  return encrypted;
};
export const decryptString = (encryptedString, privateKey) => {
  const key_private = new NodeRSA(privateKey);
  const decrypted = key_private.decrypt(encryptedString, 'utf8');
  return decrypted;
};
