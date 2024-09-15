"use server";
import crypto from "crypto";

const privateKey = process.env.PRIVATE_KEY ?? "";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function create(prevState: any, formData: FormData) {
  let username = formData.get("username") as string;
  // 附加过期时间
  username += `<|>${Date.now() + 24 * 3600 * 1000}`;
  
  // Create a RSA signer
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(username);

  // Encode the original data
  const encoded = Buffer.from(username).toString("base64");

  // Generate a signature for the data
  const signature = signer.sign(privateKey, "hex");

  // Combine the encoded data and signature to create a cdKey
  const cdKey = `${encoded}.${signature}`;

  return { cdKey: cdKey };
}
