import { EventTypes, DefaultEventProps } from '../events';

describe('events', () => {
    it('should return a array of event types', () => {
        expect(EventTypes).toMatchSnapshot();
    });

    it('should return an object with each event type as a key and a noop function as the value', () => {
        expect(DefaultEventProps).toMatchSnapshot();
    });
});
