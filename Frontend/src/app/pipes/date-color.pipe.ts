import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dateColor'
})
export class DateColorPipe implements PipeTransform {
    transform(dueDate: any): string {
        if (typeof dueDate === 'string') {
            dueDate = new Date(dueDate);
        }

        const currentDate = new Date().toISOString().split('T')[0];
        const dueDateStr = dueDate.toISOString().split('T')[0];

        if (dueDateStr < currentDate) {
            return 'rgb(204, 7, 7)';
        }

        return 'black';
    }
}