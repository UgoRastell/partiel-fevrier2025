import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findOne(email: string): Promise<User> {
        return this.userRepository.findOneBy({ email });
    }

    async create(email: string, password: string, role: string = 'client'): Promise<User> {
        const existingUser = await this.findOne(email);
        if (existingUser) {
            throw new BadRequestException('Cet email est déjà utilisé');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ email, password: hashedPassword, role });

        return this.userRepository.save(user);
    }

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.findOne(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            return user;
        }
        return null;
    }
}
