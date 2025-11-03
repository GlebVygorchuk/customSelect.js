# ⚡customSelect.js

Lightweight, accessible custom select for modern web applications

# DEMO
Open and run the demoENG.html file and try it yourself!

🎯 Features

- 🚀 Lightweight - Only 9 KB (without README and demos), zero dependencies
- ♿ Accessible - Full WAI-ARIA support and keyboard navigation
- 🎨 Customizable - Easy to style with CSS
- 🛠 Simple API - Get started in under 5 minutes
- 📱 Responsive - Works on all modern devices
- 🎪 Flexible - Place anywhere in your layout

........................................................................................

📦 Installation
```html
<link rel="stylesheet" href="customSelect.css">
<script src="customSelect.js"></script>

........................................................................................

🚀 Quick Start

Basic usage (simple array of options):

new CustomSelect(['Apple', 'Banana', 'Orange'], 'container')

Advanced configuration (with placeholder and custom container):

new CustomSelect({
options: ['Moscow', 'St. Petersburg', 'Kazan'],
placeholder: 'Choose city...'
}, 'myContainer')

........................................................................................

📖 Documentation

Constructor parameters:

new CustomSelect(config, container)

config - required parameter, array of options or configuration object

container - optional parameter, accepts container id or DOM element
where the select will be inserted

Configuration object

{
options: ['Option 1', 'Option 2', 'Option 3'], // Required
placeholder: 'Choose...' // Optional, defaults to 'Options...'
}

........................................................................................

💡 Examples

Multiple selects in different containers

// In specific containers
new CustomSelect(['Option A', 'Option B'], 'leftSidebar')
new CustomSelect(['Option X', 'Option Y'], 'rightSidebar')

// Directly in DOM element
const myDiv = document.getElementById('custom-container')
new CustomSelect(['One', 'Two', 'Three'], myDiv)

Event handling

const select = new CustomSelect({
options: ['Red', 'Green', 'Blue'],
placeholder: 'Choose color...'
}, 'colorSelect')

// Listen for changes
select.on('change', (selectedValue) => {
console.log('Selected:', selectedValue)
document.getElementById('result').textContent = selectedValue
})

Methods

const select = new CustomSelect(['A', 'B', 'C'])

// Get current value
const value = select.getValue()
console.log(value.text) // Returns selected text

// Set value programmatically
select.setValue(1) // Selects option at index 1

// Destroy instance
select.destroy()

........................................................................................

🎨 Customization

Custom styles

.select-button {
background-color: your-color;
border: 1px solid your-border;
font-family: your-font;
}

.select-options {
background-color: dropdown-color;
box-shadow: your-shadow;
}

........................................................................................

⌨️ Keyboard Navigation

Enter/Space - Open/close dropdown, select option
Arrow Up/Down - Navigate through options
Escape - Close dropdown
Home/End - Jump to first/last option
Tab - Close dropdown and move to next element

........................................................................................

📞 API Reference

Methods:

getValue() - Returns { text: string }
setValue(index) - Selects option by index
destroy() - Removes select instance
on(event, callback) - Event subscription
trigger(event, data) - Trigger custom events

Events:

change - Fires when option is selected

........................................................................................

❓ FAQ

Q: Can I use it with React/Vue/Angular?
A: Yes! It's framework-agnostic and works with any JavaScript framework.

Q: How to change styles?
A: Simply override CSS classes or use CSS variables.

Q: Is it accessible?
A: Yes! Full WAI-ARIA attributes and keyboard navigation support.

Q: Can I add search?
A: Not built-in yet, but you can extend the class to add this feature.

........................................................................................

📄 License
MIT License - can be used in personal and commercial projects.

