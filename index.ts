import 'reflect-metadata';
import { plainToClass, Type, Transform } from 'class-transformer';
import { PickType, ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class A {
  @Field(() => Int)
  @Type(() => Number)
  public typeA = 1;

  @Field(() => Int)
  @Transform(val => Number(val))
  public transformA = 2;
}

@ObjectType()
class B extends A {
  @Field(() => Int)
  @Type(() => Number)
  public typeB = 3;

  @Field(() => Int)
  @Transform(val => Number(val))
  public transformB = 4;
}

class C extends PickType(B, ['typeA', 'typeB', 'transformA', 'transformB'], ObjectType) {}

console.log(plainToClass(B, { typeA: '10', transformA: '20', typeB: '30', transformB: '40' }));
console.log(plainToClass(C, { typeA: '10', transformA: '20', typeB: '30', transformB: '40' }));

// prints
// B { typeA: 10, transformA: 20, typeB: 30, transformB: 40 }
// C { typeA: '10', transformA: '20', typeB: 30, transformB: 40 }
