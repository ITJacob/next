import crypto from "crypto";
import * as fs from 'node:fs';

function genKeyPair() {
  // Generate a new keypair
  return crypto.generateKeyPairSync("rsa", {
    // Using a larger key size, such as 2048, would be more secure
    // but will result in longer signatures.
    modulusLength: 512,
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
    publicKeyEncoding: { type: "pkcs1", format: "pem" },
  });
}

(function main() {
  const { privateKey, publicKey } = genKeyPair();
  fs.writeFileSync(
    "./.env",
    `PRIVATE_KEY="${privateKey}"` + "\n" + `PUBLIC_KEY="${publicKey}"`
  );
})();
