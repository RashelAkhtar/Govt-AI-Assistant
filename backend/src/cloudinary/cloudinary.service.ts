import { Injectable, BadRequestException } from '@nestjs/common';
import { Readable } from 'node:stream';
import { UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    if (!file?.buffer) {
      throw new BadRequestException('No file provided');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'government-documents',
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          if (!result) {
            return reject(new Error('Cloudinary upload failed'));
          }

          resolve(result);
        },
      );

      Readable.from([file.buffer]).pipe(uploadStream);
    });
  }
}
