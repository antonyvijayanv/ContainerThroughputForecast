export interface ChartInput {
    StartDate:String | null,
    EndDate:String | null,
    CargoType:String
}

export interface DashboardRequest {
    CargoYear:String | null,
    ucid?:String | null,
    CargoType:String
}