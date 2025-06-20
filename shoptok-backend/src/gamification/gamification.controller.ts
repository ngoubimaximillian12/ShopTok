import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GamificationService } from './gamification.service';

@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Post('add-points')
  addPoints(@Req() req, @Body('points') points: number) {
    return {
      points: this.gamificationService.addPoints(req.user.userId, points),
    };
  }

  @Get('points')
  getPoints(@Req() req) {
    return { points: this.gamificationService.getPoints(req.user.userId) };
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.gamificationService.getLeaderboard();
  }
}
