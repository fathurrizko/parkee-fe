export interface Tariff {
    transactionId: string,
    vehicleNo: string,
    vehicleDescription: string,
    clockOut: string,
    rates: string,
    posCodeIn: string,
    calculatePerMin: string,
    priceId: string,
    clockIn: string,
    vehicleType: string,
    billDetail: BillDetail
}

interface BillDetail {
    billAmount: number,
    hours: number,
    seconds: number,
    minutes: number
}