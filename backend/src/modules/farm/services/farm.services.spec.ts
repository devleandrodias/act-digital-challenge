import { FarmService } from './farm.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { Farm } from '../farm.entity';
import { CreateFarmDto } from '../dtos/createFarm.dto';
import { UpdateFarmDto } from '../dtos/updateFarm.dto';
import { Producer } from '../../producer/producer.entity';

describe('FarmService', () => {
  let service: FarmService;

  const mockFarmRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockProducerRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        {
          provide: getRepositoryToken(Farm),
          useValue: mockFarmRepository,
        },
        {
          provide: getRepositoryToken(Producer),
          useValue: mockProducerRepository,
        },
      ],
    }).compile();

    service = module.get<FarmService>(FarmService);
    jest.clearAllMocks();
  });

  describe('findAllByProducer', () => {
    it('deve retornar as fazendas de um produtor específico', async () => {
      const producerId = 'producer1';
      const farms: Farm[] = [
        {
          id: 'farm1',
          name: 'Fazenda Teste',
          city: 'Cidade Teste',
          state: 'Estado Teste',
          totalArea: 100,
          agriculturalArea: 80,
          vegetationArea: 20,
          harvests: [],
          producer: { id: producerId } as Producer,
        },
      ];
      mockFarmRepository.find.mockResolvedValue(farms);

      const result = await service.findAllByProducer(producerId);
      expect(result).toEqual(farms);
      expect(mockFarmRepository.find).toHaveBeenCalledWith({
        where: { producer: { id: producerId } },
      });
    });
  });

  describe('findOne', () => {
    it('deve retornar uma fazenda se encontrada', async () => {
      const farm: Farm = {
        id: 'farm1',
        name: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'Estado Teste',
        totalArea: 100,
        agriculturalArea: 80,
        vegetationArea: 20,
        producer: { id: 'producer1' } as Producer,
        harvests: [],
      };

      mockFarmRepository.findOne.mockResolvedValue(farm);

      const result = await service.findOne('farm1');
      expect(result).toEqual(farm);
      expect(mockFarmRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'farm1' },
      });
    });

    it('deve lançar NotFoundException se a fazenda não for encontrada', async () => {
      mockFarmRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('inexistente')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('deve criar uma fazenda quando o produtor existir', async () => {
      const producerId = 'producer1';
      const createFarmDto: CreateFarmDto = {
        name: 'Nova Fazenda',
        city: 'Cidade Teste',
        state: 'Estado Teste',
        totalArea: 100,
        agriculturalArea: 80,
        vegetationArea: 20,
        harvests: [],
      };

      const producer: Producer = {
        id: producerId,
        name: 'Produtor Teste',
      } as Producer;
      mockProducerRepository.findOne.mockResolvedValue(producer);

      const createdFarm: Farm = {
        id: 'farm1',
        ...createFarmDto,
        producer,
      } as Farm;
      mockFarmRepository.create.mockReturnValue(createdFarm);
      mockFarmRepository.save.mockResolvedValue(createdFarm);

      const result = await service.create(producerId, createFarmDto);
      expect(mockProducerRepository.findOne).toHaveBeenCalledWith({
        where: { id: producerId },
      });
      expect(mockFarmRepository.create).toHaveBeenCalledWith({
        ...createFarmDto,
        producer,
      });
      expect(mockFarmRepository.save).toHaveBeenCalledWith(createdFarm);
      expect(result).toEqual(createdFarm);
    });

    it('deve lançar NotFoundException se o produtor não for encontrado', async () => {
      const producerId = 'inexistente';
      const createFarmDto: CreateFarmDto = {
        name: 'Nova Fazenda',
        city: 'Cidade Teste',
        state: 'Estado Teste',
        totalArea: 100,
        agriculturalArea: 80,
        vegetationArea: 20,
        harvests: [],
      };

      mockProducerRepository.findOne.mockResolvedValue(null);
      await expect(service.create(producerId, createFarmDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar a fazenda se ela for encontrada', async () => {
      const farmId = 'farm1';
      const updateFarmDto: UpdateFarmDto = {
        name: 'Fazenda Atualizada',
        city: 'Cidade Atualizada',
        state: 'Estado Atualizado',
        totalArea: 150,
        agriculturalArea: 100,
        vegetationArea: 50,
        harvests: [],
      };

      const existingFarm: Farm = {
        id: farmId,
        name: 'Fazenda Antiga',
        city: 'Cidade Antiga',
        state: 'Estado Antigo',
        totalArea: 100,
        agriculturalArea: 80,
        vegetationArea: 20,
        producer: { id: 'producer1' } as Producer,
        harvests: [],
      };

      mockFarmRepository.findOne.mockResolvedValue(existingFarm);

      const updatedFarm: Farm = { ...existingFarm, ...updateFarmDto } as Farm;
      mockFarmRepository.save.mockResolvedValue(updatedFarm);

      const result = await service.update(farmId, updateFarmDto);
      expect(mockFarmRepository.findOne).toHaveBeenCalledWith({
        where: { id: farmId },
      });
      expect(mockFarmRepository.save).toHaveBeenCalledWith({
        ...existingFarm,
        ...updateFarmDto,
      });
      expect(result).toEqual(updatedFarm);
    });

    it('deve lançar NotFoundException se a fazenda não for encontrada para atualização', async () => {
      mockFarmRepository.findOne.mockResolvedValue(null);
      const updateFarmDto: UpdateFarmDto = {
        name: 'Fazenda Atualizada',
        city: 'Cidade Atualizada',
        state: 'Estado Atualizado',
        totalArea: 150,
        agriculturalArea: 100,
        vegetationArea: 50,
        harvests: [],
      };
      await expect(
        service.update('inexistente', updateFarmDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('deve chamar o método delete do repositório', async () => {
      const farmId = 'farm1';
      mockFarmRepository.delete.mockResolvedValue(undefined);
      await service.delete(farmId);
      expect(mockFarmRepository.delete).toHaveBeenCalledWith(farmId);
    });
  });
});
