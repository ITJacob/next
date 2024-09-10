"use server";

const privateKey = process.env.PRIVATE_KEY;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function create(prevState: any, formData: FormData) {
  const email = formData.get("email");
  return { license: email + (privateKey ?? "") };
}
