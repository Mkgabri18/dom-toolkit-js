# DOM Toolkit JS

A comprehensive JavaScript toolkit for DOM manipulation, storage handling, and events management.

## Features

- 🎯 **DOM Selectors**: Easy and powerful DOM element selection and manipulation
- 💾 **Storage Utilities**: Simplified localStorage and sessionStorage management
- 🍪 **Cookie Management**: Easy cookie handling with advanced options
- 📡 **Event Handling**: Simplified event management with custom events support
- 📋 **ClassList Management**: Enhanced class manipulation for DOM elements

## Installation

```bash
npm install dom-toolkit-js
```

## Usage

### DOM Selection

```javascript
import { Selectors } from 'dom-toolkit-js';

const selector = new Selectors();

// Select by ID
const element = selector.selectId('myElement');

// Select by class
const elements = selector.selectClasses('myClass');

// Select by query
const customElement = selector.select('.custom-selector');
```

### Storage Management

```javascript
import { local, session } from 'dom-toolkit-js';

// Local Storage
local.add('key', { data: 'value' });
const data = local.get('key');
local.remove('key');

// Session Storage
session.add('key', 'value');
const sessionData = session.get('key');
session.remove('key');
```

### Event Handling

```javascript
import { onEvent, offEvent, dispatch } from 'dom-toolkit-js';

// Add event listener
onEvent('#myButton', 'click', (e) => {
    console.log('Button clicked!');
});

// Remove event listener
offEvent('#myButton', 'click');

// Dispatch custom event
dispatch('#myElement', 'customEvent', { detail: 'Custom data' });
```

## API Documentation

For detailed API documentation, please visit our [documentation page](./docs).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.