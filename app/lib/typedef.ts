interface ReportSchema {
    created_at: string
    id: string
    title: string
    info: string
    city: string
    dept: string
    accountable: ProfileSchema | null //JOIN
}

interface ReportBuilder {
    title: string
    info: string
    city: string
    dept: string
    accountable: string|null
}


 interface ProfileSchema {
    id: string,
    created_at: string,
    name: string,
    image: string|null,
    dept: string,
    city: string,
    accountable: ReportSchema[], //JOIN
    integrity: number,
    totalRatings: number
}

interface ProfileBuilder {
    name: string,
    image: string|null,
    dept: string,
    city: string
}
