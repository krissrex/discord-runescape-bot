declare module "image-data-uri" {
  export interface DecodedImageDataUri {
    imageType: "image/png" | "image/gif" | string
    dataBase64: string
    dataBuffer: Buffer
  }

  export interface ImageDataUri {
    decode(dataUri: string): DecodedImageDataUri

    /** @returns data uri */
    encode(data: Buffer, mediaType: "PNG" | "GIF" | string): string

    /** @returns resolves to data uri */
    encodeFromURL(imageURL: string): Promise<string>

    /** @returns resolves to data uri */
    encodeFromFile(filePath: string): Promise<string>
    /** @returns resolves to file path */
    outputFile(dataURI: string, filePath: string): Promise<string>
  }

  const imageDataUri: ImageDataUri
  export default imageDataUri
}
