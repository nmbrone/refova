import {
  reduceValues,
  reduceErrors,
  reduceChanged,
  isEqual,
  getComponentName,
  getKeyFromEventTarget,
} from '../src/helpers';

describe('reduceValues', () => {
  const currentValues = { email: 'example@email.com' };
  test('returns next values', () => {
    let values = reduceValues(currentValues, 'password', 'qwerty');
    expect(values).toEqual({
      email: 'example@email.com',
      password: 'qwerty',
    });
    values = reduceValues(values, 'email', '');
    expect(values).toEqual({
      email: '',
      password: 'qwerty',
    });
  });
});

describe('reduceErrors', () => {
  const currentErrors = {};
  test('returns next errors', () => {
    let errors = reduceErrors(currentErrors, 'email', 'Not valid email');
    expect(errors).toEqual({
      email: 'Not valid email',
    });
    errors = reduceErrors(errors, 'password', 'Required field');
    expect(errors).toEqual({
      email: 'Not valid email',
      password: 'Required field',
    });
    errors = reduceErrors(errors, 'email', true);
    expect(errors).toEqual({
      password: 'Required field',
    });
  });
});

describe('reduceChanged', () => {
  const currentChanged = [];
  test('returns next changed', () => {
    let changed = reduceChanged(currentChanged, 'email');
    expect(changed).toEqual(['email']);
    changed = reduceChanged(changed, 'password');
    expect(changed).toEqual(['email', 'password']);
    changed = reduceChanged(changed, 'email');
    expect(changed).toEqual(['email', 'password']);
  });
});

describe('isEqual', () => {
  test('checks equality of two plain objects', () => {
    const obj = { a: 1 };
    expect(isEqual(obj, obj)).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(false);
  });
});

describe('getKeyFromEventTarget', () => {
  test('returns key from event target', () => {
    expect(
      getKeyFromEventTarget({
        target: { name: 'foo', id: 'bar' },
      })
    ).toBe('foo');
    expect(
      getKeyFromEventTarget({
        target: { id: 'bar' },
      })
    ).toBe('bar');
  });
});

describe('getComponentName', () => {
  const MyComponent = () => '';
  test('returns a name of passed component', () => {
    expect(getComponentName(MyComponent)).toBe('MyComponent');
  });

  test('returns a displayName of passed component', () => {
    MyComponent.displayName = 'OtherComponent';
    expect(getComponentName(MyComponent)).toBe('OtherComponent');
  });

  test('returns a fallback value', () => {
    expect(getComponentName({})).toBe('Component');
  });
});