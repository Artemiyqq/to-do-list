export class TaskDto {
    constructor (
        public title?: string,
        public description?: string,
        public dueDate?: string,
        public userId?: number,
    ) {}
}
