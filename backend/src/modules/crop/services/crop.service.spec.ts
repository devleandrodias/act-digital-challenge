import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { Crop } from '../crop.entity';
import { CropService } from './crop.service';
import { Harvest } from '../../harvest/harvest.entity';
import { CreateCropDto } from '../dtos/createCrop.dto';
import { UpdateCropDto } from '../dtos/updateCrop.dto';

describe('CropService', () => {
  let service: CropService;

  const mockHarvestRepository = {
    findOne: jest.fn(),
  };

  const mockCropRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropService,
        {
          provide: getRepositoryToken(Harvest),
          useValue: mockHarvestRepository,
        },
        {
          provide: getRepositoryToken(Crop),
          useValue: mockCropRepository,
        },
      ],
    }).compile();

    service = module.get<CropService>(CropService);
    jest.clearAllMocks();
  });

  describe('findAllByHarvest', () => {
    it('deve retornar todas as culturas para uma safra específica', async () => {
      const harvestId = 'harvest1';

      const crops: Crop[] = [
        { id: 'crop1', name: 'Trigo', harvest: { id: harvestId } as Harvest },
      ];

      mockCropRepository.find.mockResolvedValue(crops);

      const result = await service.findAllByHarvest(harvestId);
      expect(result).toEqual(crops);
      expect(mockCropRepository.find).toHaveBeenCalledWith({
        where: { harvest: { id: harvestId } },
      });
    });
  });

  describe('findOne', () => {
    it('deve retornar a cultura se encontrada', async () => {
      const crop: Crop = { id: 'crop1', name: 'Trigo' } as Crop;
      mockCropRepository.findOne.mockResolvedValue(crop);

      const result = await service.findOne('crop1');
      expect(result).toEqual(crop);
      expect(mockCropRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'crop1' },
      });
    });

    it('deve lançar NotFoundException se a cultura não for encontrada', async () => {
      mockCropRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('inexistente')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('deve criar e retornar uma cultura se a safra existir', async () => {
      const harvestId = 'harvest1';
      const createCropDto: CreateCropDto = { name: 'Milho' };
      const harvest: Harvest = { id: harvestId } as Harvest;
      mockHarvestRepository.findOne.mockResolvedValue(harvest);

      const createdCrop: Crop = { id: 'crop1', name: 'Milho', harvest } as Crop;
      mockCropRepository.create.mockReturnValue(createdCrop);
      mockCropRepository.save.mockResolvedValue(createdCrop);

      const result = await service.create(harvestId, createCropDto);
      expect(mockHarvestRepository.findOne).toHaveBeenCalledWith({
        where: { id: harvestId },
      });
      expect(mockCropRepository.create).toHaveBeenCalledWith({
        ...createCropDto,
        harvest,
      });
      expect(mockCropRepository.save).toHaveBeenCalledWith(createdCrop);
      expect(result).toEqual(createdCrop);
    });

    it('deve lançar NotFoundException se a safra não for encontrada', async () => {
      const harvestId = 'inexistente';
      const createCropDto: CreateCropDto = { name: 'Milho' };
      mockHarvestRepository.findOne.mockResolvedValue(null);

      await expect(service.create(harvestId, createCropDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar e retornar a cultura se ela existir', async () => {
      const cropId = 'crop1';
      const updateCropDto: UpdateCropDto = { name: 'Milho Atualizado' };
      const existingCrop: Crop = { id: cropId, name: 'Milho' } as Crop;
      mockCropRepository.findOne.mockResolvedValue(existingCrop);

      const updatedCrop: Crop = { ...existingCrop, ...updateCropDto } as Crop;
      mockCropRepository.save.mockResolvedValue(updatedCrop);

      const result = await service.update(cropId, updateCropDto);
      expect(mockCropRepository.findOne).toHaveBeenCalledWith({
        where: { id: cropId },
      });
      expect(mockCropRepository.save).toHaveBeenCalledWith({
        ...existingCrop,
        ...updateCropDto,
      });
      expect(result).toEqual(updatedCrop);
    });

    it('deve lançar NotFoundException se a cultura não for encontrada para atualização', async () => {
      mockCropRepository.findOne.mockResolvedValue(null);
      const updateCropDto: UpdateCropDto = { name: 'Milho Atualizado' };

      await expect(
        service.update('inexistente', updateCropDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('deve chamar o método delete do repositório de cultura', async () => {
      const cropId = 'crop1';
      mockCropRepository.delete.mockResolvedValue(undefined);

      await service.delete(cropId);
      expect(mockCropRepository.delete).toHaveBeenCalledWith(cropId);
    });
  });
});
