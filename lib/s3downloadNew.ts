import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ 
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || ''
    }
});

export const generatePresignedUrl = async (bucketName: string, objectKey: string) => {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });
  
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL expires in 1 hour
    return url;
}