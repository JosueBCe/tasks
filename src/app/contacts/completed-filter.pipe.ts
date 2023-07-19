import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from './contact.model';

@Pipe({
  name: 'completedFilter'
})
export class CompletedFilterPipe implements PipeTransform {
  transform(contacts: Contact[], completed: boolean): Contact[] {
    if (!contacts) { return []; }
    if (completed === undefined) { return contacts; }

    return contacts.filter(contact => contact.completed === completed);
  }
}
