import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { Harvest } from '../harvest.entity';
import { Farm } from '../../farm/farm.entity';
import { Crop } from '../../crop/crop.entity';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto } from '../dtos/createHarvest.dto';

describe('HarvestService', () => {
  let service: HarvestService;

  const mockHarvestRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockFarmRepository = {
    findOne: jest.fn(),
  };

  const mockCropRepository = {
    create: jest.fn(),
    remove: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        {
          provide: getRepositoryToken(Harvest),
          useValue: mockHarvestRepository,
        },
        {
          provide: getRepositoryToken(Farm),
          useValue: mockFarmRepository,
        },
        {
          provide: getRepositoryToken(Crop),
          useValue: mockCropRepository,
        },
      ],
    }).compile();

    service = module.get<HarvestService>(HarvestService);
    jest.clearAllMocks();
  });

  describe('findAllByFarm', () => {
    it('deve retornar as colheitas de uma fazenda específica', async () => {
      const farmId = 'farm1';
      const expectedHarvests = [
        { id: 'harv1', name: 'Colheita Teste', farm: { id: farmId } },
      ];
      mockHarvestRepository.find.mockResolvedValue(expectedHarvests);

      const result = await service.findAllByFarm(farmId);
      expect(result).toEqual(expectedHarvests);
      expect(mockHarvestRepository.find).toHaveBeenCalledWith({
        where: { farm: { id: farmId } },
      });
    });
  });

  describe('findOne', () => {
    it('deve retornar uma colheita se encontrada', async () => {
      const harvest = { id: 'harv1', year: 2025 } as Harvest;
      mockHarvestRepository.findOne.mockResolvedValue(harvest);

      const result = await service.findOne('harv1');
      expect(result).toEqual(harvest);
      expect(mockHarvestRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'harv1' },
      });
    });

    it('deve lançar NotFoundException se a colheita não for encontrada', async () => {
      mockHarvestRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('invalid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('deve criar uma colheita quando a fazenda existir', async () => {
      const farmId = 'farm1';
      const createDto: CreateHarvestDto = {
        year: 2025,
        crops: [{ name: 'Milho' }],
      };

      const farm = { id: farmId, name: 'Fazenda Teste' } as Farm;
      mockFarmRepository.findOne.mockResolvedValue(farm);

      const createdHarvest = { id: 'harv1', ...createDto, farm } as Harvest;
      mockHarvestRepository.create.mockReturnValue(createdHarvest);
      mockHarvestRepository.save.mockResolvedValue(createdHarvest);

      const result = await service.create(farmId, createDto);
      expect(mockFarmRepository.findOne).toHaveBeenCalledWith({
        where: { id: farmId },
      });
      expect(mockHarvestRepository.create).toHaveBeenCalledWith({
        ...createDto,
        farm,
      });
      expect(mockHarvestRepository.save).toHaveBeenCalledWith(createdHarvest);
      expect(result).toEqual(createdHarvest);
    });

    it('deve lançar NotFoundException se a fazenda não for encontrada', async () => {
      const farmId = 'invalid-farm';
      const createDto: CreateHarvestDto = { year: 2025, crops: [] };
      mockFarmRepository.findOne.mockResolvedValue(null);

      await expect(service.create(farmId, createDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('deve lançar NotFoundException se a colheita não for encontrada', async () => {
      mockHarvestRepository.findOne.mockResolvedValue(null);
      const updateDto: CreateHarvestDto = { year: 2025, crops: [] };

      await expect(service.update('invalid', updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve atualizar a colheita removendo e adicionando cultivos quando necessário', async () => {
      const existingCrop = { id: 'crop1', name: 'Maize' };
      const harvest = {
        id: 'harv1',
        year: 2025,
        crops: [existingCrop],
      } as Harvest;

      mockHarvestRepository.findOne.mockResolvedValue(harvest);

      const updateDto: CreateHarvestDto = {
        year: 2025,
        crops: [{ name: 'Soybean' }],
      };

      const newCrop = { id: 'crop2', name: 'Soybean' };
      mockCropRepository.create.mockReturnValue(newCrop);
      mockCropRepository.remove.mockResolvedValue(undefined);
      mockCropRepository.save.mockResolvedValue([newCrop]);

      const updatedHarvest = {
        ...harvest,
        ...updateDto,
        crops: [newCrop],
      } as Harvest;

      mockHarvestRepository.save.mockResolvedValue(updatedHarvest);

      const result = await service.update('harv1', updateDto);

      expect(mockHarvestRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'harv1' },
        relations: ['crops'],
      });

      expect(mockCropRepository.remove).toHaveBeenCalledWith([existingCrop]);
      expect(mockCropRepository.create).toHaveBeenCalledWith({
        name: 'Soybean',
        harvest,
      });
      expect(mockCropRepository.save).toHaveBeenCalledWith([newCrop]);
      expect(mockHarvestRepository.save).toHaveBeenCalledWith(
        Object.assign(harvest, updateDto),
      );
      expect(result).toEqual(updatedHarvest);
    });

    it('deve atualizar a colheita sem alterar os cultivos quando não houver mudança', async () => {
      const existingCrop = { id: 'crop1', name: 'Soja' };
      const harvest = {
        id: 'harv2',
        year: 2025,
        crops: [existingCrop],
      } as Harvest;
      mockHarvestRepository.findOne.mockResolvedValue(harvest);

      const updateDto: CreateHarvestDto = {
        year: 2025,
        crops: [{ name: 'Soja' }],
      };

      mockCropRepository.remove.mockResolvedValue(undefined);
      mockHarvestRepository.save.mockResolvedValue({
        ...harvest,
        ...updateDto,
      });

      const result = await service.update('harv2', updateDto);

      expect(mockHarvestRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'harv2' },
        relations: ['crops'],
      });
      expect(mockCropRepository.remove).not.toHaveBeenCalled();
      expect(mockCropRepository.create).not.toHaveBeenCalled();
      expect(mockCropRepository.save).not.toHaveBeenCalled();
      expect(mockHarvestRepository.save).toHaveBeenCalledWith(
        Object.assign(harvest, updateDto),
      );
      expect(result).toEqual({ ...harvest, ...updateDto });
    });
  });

  describe('delete', () => {
    it('deve chamar o método delete do repositório', async () => {
      mockHarvestRepository.delete.mockResolvedValue(undefined);
      await service.delete('harv1');
      expect(mockHarvestRepository.delete).toHaveBeenCalledWith('harv1');
    });
  });
});
