import { ItemPurchaseDTO } from './item-purchase.dto';
import { PaymentDTO } from './payment.dto';
import { RefDTO } from './ref.dto';

export interface PurchaseDTO {
  client: RefDTO;
  shippingAddress: RefDTO;
  payment: PaymentDTO;
  items: ItemPurchaseDTO[];
}
