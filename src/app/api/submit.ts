"use server";
import crypto from "crypto";

const privateKey = process.env.PRIVATE_KEY ?? "";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function create(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  // Create a RSA signer
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(email);

  // Encode the original data
  const encoded = Buffer.from(email).toString("base64");

  // Generate a signature for the data
  const signature = signer.sign(privateKey, "hex");

  // Combine the encoded data and signature to create a license key
  const licenseKey = `${encoded}.${signature}`;

  return { license: licenseKey };
}
