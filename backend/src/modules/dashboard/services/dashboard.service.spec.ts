import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';

import { Farm } from '../../farm/farm.entity';
import { Crop } from '../../crop/crop.entity';

describe('DashboardService', () => {
  let service: DashboardService;

  // Mocks dos repositórios
  const mockFarmRepository = {
    count: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockCropRepository = {
    count: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: getRepositoryToken(Farm), useValue: mockFarmRepository },
        { provide: getRepositoryToken(Crop), useValue: mockCropRepository },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    jest.clearAllMocks();
  });

  it('deve retornar os dados do dashboard corretamente', async () => {
    // Simula as contagens
    mockFarmRepository.count.mockResolvedValue(8);
    mockCropRepository.count.mockResolvedValue(17);

    // Mock para a query de totalAreaData
    const mockTotalAreaQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockResolvedValue({
        totalArea: 100,
        agriculturalArea: 60,
        vegetationArea: 20,
      }),
    };

    // Mock para a query de farmsByState
    const mockFarmsByStateQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([
        { name: 'State1', value: 5 },
        { name: 'State2', value: 3 },
      ]),
    };

    // Mock para a query de cropsByType
    const mockCropsByTypeQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([
        { name: 'CropA', value: 10 },
        { name: 'CropB', value: 7 },
      ]),
    };

    // Configura o createQueryBuilder para farmRepository:
    // A primeira chamada retorna totalAreaData e a segunda, farmsByState
    mockFarmRepository.createQueryBuilder
      .mockReturnValueOnce(mockTotalAreaQueryBuilder)
      .mockReturnValueOnce(mockFarmsByStateQueryBuilder);

    // Configura o createQueryBuilder para cropRepository
    mockCropRepository.createQueryBuilder.mockReturnValue(
      mockCropsByTypeQueryBuilder,
    );

    // Executa o método a ser testado
    const result = await service.getDashboardData();

    const expected = {
      totalFarms: 8,
      totalArea: 100,
      totalCrops: 17,
      agriculturalArea: 60,
      vegetationArea: 20,
      unidentifiedArea: 100 - (60 + 20), // 20
      farmsByState: [
        { name: 'State1', value: 5 },
        { name: 'State2', value: 3 },
      ],
      cropsByType: [
        { name: 'CropA', value: 10 },
        { name: 'CropB', value: 7 },
      ],
    };

    expect(result).toEqual(expected);

    // Verifica se os métodos count e createQueryBuilder foram chamados
    expect(mockFarmRepository.count).toHaveBeenCalled();
    expect(mockCropRepository.count).toHaveBeenCalled();
    expect(mockFarmRepository.createQueryBuilder).toHaveBeenCalledTimes(2);
    expect(mockCropRepository.createQueryBuilder).toHaveBeenCalled();
  });

  it('deve retornar zeros e arrays vazios quando não houver dados', async () => {
    // Simula contagens zeradas
    mockFarmRepository.count.mockResolvedValue(0);
    mockCropRepository.count.mockResolvedValue(0);

    // Mock para a query de totalAreaData sem valores (objeto vazio)
    const mockTotalAreaQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockResolvedValue({}),
    };

    // Mock para a query de farmsByState retornando array vazio
    const mockFarmsByStateQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([]),
    };

    // Mock para a query de cropsByType retornando array vazio
    const mockCropsByTypeQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([]),
    };

    // Configura os mocks para o farmRepository: primeiro para totalAreaData, depois para farmsByState
    mockFarmRepository.createQueryBuilder
      .mockReturnValueOnce(mockTotalAreaQueryBuilder)
      .mockReturnValueOnce(mockFarmsByStateQueryBuilder);

    // Configura o mock para o cropRepository
    mockCropRepository.createQueryBuilder.mockReturnValue(
      mockCropsByTypeQueryBuilder,
    );

    // Executa o método a ser testado
    const result = await service.getDashboardData();

    const expected = {
      totalFarms: 0,
      totalArea: 0,
      totalCrops: 0,
      agriculturalArea: 0,
      vegetationArea: 0,
      unidentifiedArea: 0,
      farmsByState: [],
      cropsByType: [],
    };

    expect(result).toEqual(expected);
  });
});
