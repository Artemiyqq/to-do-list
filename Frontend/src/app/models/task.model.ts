export class Task {
    constructor (
        public id: number,
        public title: string,
        public description: string,
        public isCompleted: boolean,
        public dueDate: Date,
        public userId: number,
    ) {}
}
