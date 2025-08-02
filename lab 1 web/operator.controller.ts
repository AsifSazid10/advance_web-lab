import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { OperatorService } from './operator.service';
import { MulterError } from 'multer';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateOperatorDto } from './createoperator.dto';

@Controller('operator')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({whitelist:true}))
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads/operator-images',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExtName}`);
        },
      }),
    
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new MulterError('LIMIT_UNEXPECTED_FILE', 'Only JPG, JPEG, PNG or GIF images allowed'),
            false,
          );
        }
      },
    }),
  )
  async create(
    @Body('data') data: string,
    @UploadedFile() profileImage?: Express.Multer.File,
  ) {
    if (!data) {
      throw new BadRequestException('No data provided');
    }

    const createoperatordto = plainToInstance(CreateOperatorDto, JSON.parse(data));
    const errors = await validate(createoperatordto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    if (profileImage) {
      createoperatordto.profileImage = profileImage.path;
    }

    return this.operatorService.createOperator(createoperatordto);
  }
}
