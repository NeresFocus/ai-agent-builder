import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('AgentsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);

    // Create test user and get auth token
    const registerResponse = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'TestPassword123!',
        name: 'Test User',
      });

    authToken = registerResponse.body.token;
    userId = registerResponse.body.user.id;
  });

  afterAll(async () => {
    // Cleanup
    await prisma.agent.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });
    await app.close();
  });

  describe('/api/agents (POST)', () => {
    it('should create a new agent', () => {
      return request(app.getHttpServer())
        .post('/api/agents')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Agent',
          description: 'A test agent',
          specialty: 'CUSTOM',
          complexity: 'BASIC',
          systemPrompt: 'You are a helpful assistant',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('Test Agent');
          expect(res.body.status).toBe('DRAFT');
        });
    });

    it('should fail without authentication', () => {
      return request(app.getHttpServer())
        .post('/api/agents')
        .send({
          name: 'Test Agent',
          specialty: 'CUSTOM',
          systemPrompt: 'Test',
        })
        .expect(401);
    });
  });

  describe('/api/agents (GET)', () => {
    it('should list all agents', () => {
      return request(app.getHttpServer())
        .get('/api/agents')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });
  });
});
