type TData = {
  d: string
  t: string
  n: string
}
const decryptedAESGCM = async (
  ciphertext: Uint8Array<ArrayBuffer>,
  aesKey: Uint8Array<ArrayBuffer>,
  nonce: Uint8Array<ArrayBuffer>,
) => {
  const cryptoKey = await crypto.subtle.importKey('raw', aesKey, { name: 'AES-GCM' }, false, [
    'decrypt',
  ])

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: nonce, tagLength: 128 },
    cryptoKey,
    ciphertext,
  )

  const decryptedText = new TextDecoder().decode(decryptedBuffer)
  return JSON.parse(decryptedText)
}

export const decodeAllFields = async (data: TData) => {
  const decodeB64 = (str: string) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0))
  const ciphertextBlob = decodeB64(data.d)
  const nonce = decodeB64(data.n)
  const tag = decodeB64(data.t)

  // Extract AES key and actual ciphertext
  const aesKey = ciphertextBlob.slice(0, 16)
  const ciphertext = ciphertextBlob.slice(16)

  const ciphertextWithTag = new Uint8Array(ciphertext.length + tag.length)
  ciphertextWithTag.set(ciphertext)
  ciphertextWithTag.set(tag, ciphertext.length)
  return await decryptedAESGCM(ciphertextWithTag, aesKey, nonce)
}
