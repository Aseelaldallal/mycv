import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert() // Decorator Hook
  logInsert() {
    console.log('Inserted User with id: ', this.id);
  }

  @AfterUpdate() 
  logUpdate() {
    console.log('Updated user with id: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id: ', this.id);
  }

}

// Hooks allow us to define function on an entity
// that will be called automatically by TypeORM