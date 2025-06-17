import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { FileUploadModule } from './modules/fileUpload/file.upload.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    FileUploadModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60m' },
      secret: process.env.JWT_SECRET,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm')!,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
