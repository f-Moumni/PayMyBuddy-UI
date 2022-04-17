import { OperationType } from "../enum/Operation.enum";
import { TransactionType } from "../enum/TransactionType";

export interface Transaction{

  name : string ;
  dateTime : Date ;
  description : string ;
  amount : string ;
  operationType : OperationType;
  transactionType : TransactionType;

}
