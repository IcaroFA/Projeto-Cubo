export class User {
    constructor(
        private id: string,
        private name: string,
        private lastName: string,
        private participation: number
    ){ }

    get_id():string{
        return this.id
    }

    get_name():string{
        return this.name
    }

    get_lastName():string{
        return this.lastName
    }

    get_participation():number{
        return this.participation
    }
} 