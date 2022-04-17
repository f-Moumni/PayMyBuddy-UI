import { OperationType} from "../enum/Operation.enum";

export class Transfer {
  amount!: number;
  description!: string;
  operationType!:OperationType;
}
