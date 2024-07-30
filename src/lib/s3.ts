import { formatPath } from '@/utils/functions';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || '',
  },
});

export async function putObject(params: {
  Bucket: string;
  Key: string;
  Body: Uint8Array;
  ContentType: string;
}) {
  try {
    const command = await s3Client.send(
      new PutObjectCommand({
        ...params,
      })
    );

    return command;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadImage(image: File, path: string = '') {
  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const folder = formatPath(path);
  const imageKey = `images/${folder}${image.name}`;

  const s3Object = await putObject({
    Bucket: process.env.AWS_BUCKET || '',
    Key: imageKey,
    Body: new Uint8Array(imageBuffer),
    ContentType: image.type,
  });

  return { s3Object, imageKey };
}

export function getImageUrl(key: string) {
  if (process.env.NODE_ENV === 'development') {
    return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } else {
    return `https://blog.jordantate.dev/${key}`;
  }
}

export function getImageKey(image: File, path: string = '') {
  const folder = formatPath(path);
  return `images/${folder}${image.name}`;
}

export default s3Client;
