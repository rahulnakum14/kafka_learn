import { Controller, Body, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern({ cmd: 'create_product' })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.inventoryService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'update_stock' })
  async updateStock(@Payload() data: { id: string; stock: number }) {
    const { id, stock } = data;
    return this.inventoryService.updateStock(id, stock);
  }
}
