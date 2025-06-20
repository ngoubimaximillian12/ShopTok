import { Injectable } from '@nestjs/common';

interface UserPoints {
  userId: number;
  points: number;
}

@Injectable()
export class GamificationService {
  private userPointsMap = new Map<number, number>();

  addPoints(userId: number, points: number) {
    const current = this.userPointsMap.get(userId) || 0;
    this.userPointsMap.set(userId, current + points);
    return this.userPointsMap.get(userId);
  }

  getPoints(userId: number): number {
    return this.userPointsMap.get(userId) || 0;
  }

  getLeaderboard(): UserPoints[] {
    const leaderboard: UserPoints[] = [];
    for (const [userId, points] of this.userPointsMap.entries()) {
      leaderboard.push({ userId, points });
    }
    return leaderboard.sort((a, b) => b.points - a.points);
  }
}
