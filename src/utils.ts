import { PreparedTrade, OrderModel, Direction } from "./swagger";
/**
 * Returns the size units that match the given constraints.
 * @param preparedTrade the result from the prepare trade api call
 * @param orderModel the currently selected order model in the order form
 * @param direction the currently selected direction in the order form
 * @param cashAccountId the id of the currently selected cash account in the order form
 */
export function getSizeUnitsFromConstraints(
  preparedTrade: PreparedTrade,
  orderModel: OrderModel,
  direction: Direction,
  cashAccountId: string
) {
  for (const constraint of preparedTrade.sizeUnitConstraints || []) {
    if (
      !constraint.orderModels ||
      constraint.orderModels.includes(orderModel)
    ) {
      if (!constraint.directions || constraint.directions.includes(direction)) {
        if (
          !constraint.cashAccountIds ||
          constraint.cashAccountIds.includes(cashAccountId)
        ) {
          return constraint.sizeUnits;
        }
      }
    }
  }

  if (preparedTrade.sizeUnit) {
    return [preparedTrade.sizeUnit];
  }
  return [];
}
