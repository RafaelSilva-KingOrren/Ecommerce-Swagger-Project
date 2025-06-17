import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from '../fileUpload/file.upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:productId')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
          }),
          new FileTypeValidator({
            fileType: /(jpeg|jpg|png|gif|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('productId') productId: string,
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }
}
