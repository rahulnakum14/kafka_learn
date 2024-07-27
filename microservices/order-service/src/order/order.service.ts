import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../interfaces/order.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { RpcException } from '@nestjs/microservices';
// import { Kafka } from 'kafkajs';

@Injectable()
export class OrderService {
  // private readonly kafka = new Kafka({ brokers: ['localhost:9092'] });
  // private readonly producer = this.kafka.producer();
  // private readonly consumer = this.kafka.consumer({ groupId: 'order-service' });

  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {
    // this.listenForStockUpdates();
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    const order = await createdOrder.save();

    // // Publish order created event
    // await this.producer.connect();
    // await this.producer.send({
    //   topic: 'order-created',
    //   messages: [{ value: JSON.stringify(order) }],
    // });

    return order;
  }

  async findOne(id: string): Promise<Order> {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const order = await this.orderModel.findById(id).exec();
      
      if (!order) {
        throw new RpcException({
          code:404,
          message: `Order with ID ${id} not found`,
        });
      }
      return order;
    }else{
      throw new RpcException({
        message: `Wrong ObjectId of the order`,
      });
    }

  }


  // async listenForStockUpdates() {
  //   await this.consumer.connect();
  //   await this.consumer.subscribe({ topic: 'stock-updated', fromBeginning: true });

  //   await this.consumer.run({
  //     eachMessage: async ({ topic, partition, message }) => {
  //       const stockUpdate = JSON.parse(message.value.toString());
  //       // Handle stock update logic
  //       console.log('Stock Update:', stockUpdate);
  //     },
  //   });
  // }
}
// docker run -d --name zookeeper --network kafka-network -p 2181:2181 -e ZOOKEEPER_CLIENT_PORT=2181 confluentinc/cp-zookeeper:latest
// docker run -d --name kafka --network kafka-network -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka:latest
