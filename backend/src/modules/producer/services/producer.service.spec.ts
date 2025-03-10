import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { paginate, PaginateQuery } from 'nestjs-paginate';

import { Producer } from '../producer.entity';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from '../dtos/createProducer.dto';

const mockProducerRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

jest.mock('nestjs-paginate', () => ({
  paginate: jest.fn(),
}));

describe('ProducerService', () => {
  let service: ProducerService;
  let repository: typeof mockProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: getRepositoryToken(Producer),
          useValue: mockProducerRepository,
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    repository = module.get(getRepositoryToken(Producer));
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar produtores paginados', async () => {
      const query = { page: 1, limit: 10 } as PaginateQuery;

      const paginateResult = {
        items: [{ id: '1', name: 'Produtor Teste', document: '123456789' }],
        meta: {
          totalItems: 1,
          itemCount: 1,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
      };
      (paginate as jest.Mock).mockReturnValue(paginateResult);

      const result = await service.findAll(query);
      expect(result).toEqual(paginateResult);
      expect(paginate).toHaveBeenCalledWith(query, repository, {
        sortableColumns: ['name', 'document'],
        searchableColumns: ['name', 'document'],
        relations: ['farms', 'farms.harvests', 'farms.harvests.crops'],
      });
    });
  });

  describe('findOne', () => {
    it('deve retornar um produtor se encontrado', async () => {
      const producer = { id: '1', name: 'Produtor Teste' } as Producer;
      repository.findOne.mockResolvedValue(producer);

      const result = await service.findOne('1');
      expect(result).toEqual(producer);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['farm'],
      });
    });

    it('deve lançar NotFoundException se produtor não for encontrado', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('deve criar e retornar um produtor', async () => {
      const createProducerDto: CreateProducerDto = {
        name: 'Produtor Teste',
        document: '123456789',
        farms: [],
      };
      const producer = { id: '1', ...createProducerDto } as Producer;
      repository.create.mockReturnValue(producer);
      repository.save.mockResolvedValue(producer);

      const result = await service.create(createProducerDto);
      expect(result).toEqual(producer);
      expect(repository.create).toHaveBeenCalledWith(createProducerDto);
      expect(repository.save).toHaveBeenCalledWith(producer);
    });
  });

  describe('update', () => {
    it('deve atualizar um produtor se encontrado', async () => {
      const existingProducer = { id: '1', name: 'Produtor Antigo' } as Producer;
      repository.findOne.mockResolvedValue(existingProducer);
      repository.update.mockResolvedValue({});

      await service.update('1', { name: 'Produtor Atualizado' });
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(repository.update).toHaveBeenCalledWith('1', {
        name: 'Produtor Atualizado',
      });
    });

    it('deve lançar NotFoundException se produtor não for encontrado', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(
        service.update('1', { name: 'Produtor Atualizado' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('deve chamar o método delete do repositório', async () => {
      repository.delete.mockResolvedValue({});
      await service.delete('1');
      expect(repository.delete).toHaveBeenCalledWith('1');
    });
  });
});
