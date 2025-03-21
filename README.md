[![Codecov](https://codecov.io/gh/collidor/injector/branch/main/graph/badge.svg)](https://codecov.io/gh/collidor/injector)
[![npm version](https://img.shields.io/npm/v/@collidor/injector)](https://www.npmjs.com/package/@collidor/injector)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Injector

A lightweight, type-aware dependency injection container for JavaScript/TypeScript (with JSDoc support), supporting class and function dependencies with type inference.

## Features
- **Type Inference**: Automatically infers dependency types
- **Class & Function Support**: Register instances from classes or factory functions
- **Error Handling**: Throws clear errors for unregistered dependencies
- **Zero Dependencies**: Tiny footprint (< 1KB minified)

## Installation
```bash
npm install "@collidor/injector"
```

## Usage

### Basic Class Example
```javascript
import { Injector } from '"@collidor/injector"';

// Create injector
const injector = new Injector();

// Register a class instance
class DatabaseService {
  connect() { return 'Connected!'; }
}

injector.register(DatabaseService, new DatabaseService());

// Inject the instance (type inferred as DatabaseService)
const db = injector.inject(DatabaseService);
console.log(db.connect()); // "Connected!"
```

### Function Dependency Example
```javascript
// Register a factory function
const configFactory = () => ({ env: 'production' });
injector.register(configFactory, configFactory());

// Inject the function result (type inferred as { env: string })
const config = injector.inject(configFactory);
console.log(config.env); // "production"
```

### Register in class properties:

```typescript
import {Database} from './database.ts'

class Service {
    private database = inject(Database)

    getData() {
        return this.database.query();
    }
}
```

### Interdenpendency or race condition

If two classes depend on each other in any place except the constructor, we can use getters or get the instances directly in the Methods:

```typescript
import {Database} from './database.ts'

class Service {
    get database(): Database {
        return inject(Database);
    }

    getData() {
        return this.database.query();
    }
}
```

### Error Handling
```javascript
try {
  injector.inject(UnregisteredService); // Throws error
} catch (err) {
  console.error(err.message); // "No instance registered for type: UnregisteredService"
}
```

## API

### `Injector`

#### `register(type, instance)`
- **Parameters**:
  - `type`: Constructor | Function | Symbol | Object (dependency identifier)
  - `instance`: Value to store
- **Returns**: `void`

Registers a dependency instance.

#### `inject(type)`
- **Parameters**:
  - `type`: Constructor | Function | Symbol | Object (dependency identifier)
- **Returns**:
  ```ts
  T extends Type<infer M> ? M : T extends (...args: any[]) => infer R ? R : any
  ```
- **Throws**: Error if no instance is registered for `type`

Retrieves a dependency instance.

## Type Inference
Works with both class constructors and factory functions:
```typescript
// Class registration
class AuthService {
  login() { /* ... */ }
}
injector.register(AuthService, new AuthService());
const auth = injector.inject(AuthService); // Inferred as AuthService

// Function registration
const loggerFactory = () => ({ log: (msg: string) => console.log(msg) });
injector.register(loggerFactory, loggerFactory());
const logger = injector.inject(loggerFactory); // Inferred as { log: (msg: string) => void }
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License
MIT