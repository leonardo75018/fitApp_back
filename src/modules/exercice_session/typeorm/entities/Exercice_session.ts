import Exercice from '@modules/exercices/typeorm/entities/Exercices';
import Session from '@modules/sessions/typeorm/entities/Session';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('exercice_session')
class Exercice_session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  repetitions: string;

  @Column()
  intensity: string;

  @Column()
  session_id: string;

  @OneToOne(() => Session)
  @JoinColumn({ name: 'sessions_id' })
  sessions: Session;

  @Column()
  exercice_id: string;

  @OneToOne(() => Exercice)
  @JoinColumn({ name: 'exercices_id' })
  exercices: Exercice;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Exercice_session;