import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { UserService } from './controller/user.service';
import { WalletService } from './controller/wallet.service';

describe('Define Check', () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  describe('Wallet', () => {
    it('should be defined', async () => {
      const walletService = moduleRef.get(WalletService);
      const wallet = await walletService
        .getAccountBalance('TJxwVnmuZJDKY8JGLuZ6Z3aERK1i6GjkmK')
        .catch((e) => {
          return {
            error: e.response,
          };
        });
      console.log(wallet);
      expect(wallet).toBeDefined();
    });
  });
  describe('User', () => {
    it('should be defined', () => {
      expect(moduleRef.get(UserService)).toBeDefined();
    });
  });
});
