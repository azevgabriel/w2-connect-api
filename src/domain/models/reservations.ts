export interface ReservationsModel {
  id: string;
  startDate: Date;
  endDate: Date;
  type: "flight" | "hotel" | "car" | "activity";
  value: number;
  status: "confirmed" | "pending" | "cancelled";
}
