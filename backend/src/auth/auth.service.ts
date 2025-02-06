import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.usersService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }

        const payload = { email: user.email, role: user.role, sub: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }
}
