import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
// import other modules here

@Module({
  imports: [AuthModule, UsersModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
