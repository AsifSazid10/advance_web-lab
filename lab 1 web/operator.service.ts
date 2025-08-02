// src/operator/operator.service.ts
import { Injectable } from '@nestjs/common';
import { CreateOperatorDto } from './createoperator.dto';

@Injectable()
export class OperatorService {
  createOperator(operatorData: CreateOperatorDto) {
    
    return {
      message: 'Operator created successfully',
      data: operatorData,
    };
    
  }
}
