import { createSignal } from '@react-rxjs/utils';
import { merge } from 'rxjs';
import { DomainEvents } from './Domain';

export type DomainEvent = {
  id?: string;
  name: DomainEvents;
  data: {
    [key: string]: unknown;
  };
};

const [event$, setEvent] = createSignal<DomainEvent | undefined>();

export const eventMap$ = merge(event$);

export const dispatch = (event: DomainEvent): void => {
  if (!event.id) {
    // event.id = uuid();
  }
  setEvent(event);
  setEvent(undefined);
};
