class CustomSelect {
    constructor(config, container = document.body) {
        this.events = {}
        this.isOpen = false

        if (typeof container === 'string') {
            container = document.getElementById(container)
        }

        if (!container) {
            container = document.body
        }

        this.container = container

        this.createCustomSelect(config)
        this.clickOutsideListener()
        this.setupKeyboardNavigation()

        this.container.appendChild(this.select)
    }

    createCustomSelect(config) {
        if (Array.isArray(config)) {
            this.options = config
            this.placeholder = 'Options...'
        } else {
            this.options = config.options
            this.placeholder = config.placeholder || 'Options...'
        }

        this.select = document.createElement('div')
        this.select.className = 'select'

        this.selectButton = document.createElement('button')
        this.selectButton.setAttribute('role', 'combobox')
        this.selectButton.setAttribute('aria-haspopup', 'listbox')
        this.selectButton.setAttribute('aria-expanded', 'false')
        this.selectButton.setAttribute('tabindex', '0')
        this.selectButton.className = 'select-button'
        this.selectButton.addEventListener('click', this.toggleOptions.bind(this))

        this.buttonText = document.createElement('p')
        this.buttonText.className = 'select-text'
        this.buttonText.innerHTML = this.placeholder

        this.dropdownArrow = document.createElement('span')
        this.dropdownArrow.className = 'select-arrow'
        this.dropdownArrow.innerHTML = '>'

        this.optionsBlock = document.createElement('ul')
        this.optionsBlock.className = 'select-options'
        this.optionsBlock.setAttribute('role', 'listbox')
        this.optionsBlock.setAttribute('aria-label', 'Доступные опции')

        this.options.forEach(option => {
            const optionItem = document.createElement('li')
            optionItem.className = 'select-option'
            optionItem.setAttribute('role', 'option')
            optionItem.setAttribute('aria-selected', 'false')
            optionItem.setAttribute('tabindex', '-1')
            optionItem.addEventListener('click', this.selectOption.bind(this))
            optionItem.innerHTML = option
            this.optionsBlock.appendChild(optionItem)
        })

        this.selectButton.appendChild(this.buttonText)
        this.selectButton.appendChild(this.dropdownArrow)
        
        this.select.appendChild(this.selectButton)
        this.select.appendChild(this.optionsBlock)
    }

    clickOutsideListener() {
        document.addEventListener('click', (e) => {
            if (!this.select.contains(e.target) && this.isOpen) {
                this.closeOptions()
            }
        })
    }

    setupKeyboardNavigation() {
        this.globalKeyHandler = e => {
            if (this.select.contains(document.activeElement) &&
            [' ', 'Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
                e.preventDefault()

                if (!this.isOpen) {
                    this.openOptions()
                    const firstOption = this.optionsBlock.querySelector('[role="option"]')
                    firstOption?.focus()
                }
            }
        }

        this.optionsBlock.addEventListener('keydown', (e) => {
            this.handleOptionsKeyDown(e)
        })

        document.addEventListener('keydown', this.globalKeyHandler)
    }

    handleOptionsKeyDown(e) {
        if (!this.isOpen) {
            return
        }

        const options = Array.from(this.optionsBlock.children)
        const currentIndex = options.indexOf(e.target)

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault()
                const nextIndex = (currentIndex + 1) % options.length
                options[nextIndex].focus()
                break
            
            case 'ArrowUp':
                e.preventDefault()
                const prevIndex = (currentIndex - 1 + options.length) % options.length 
                options[prevIndex].focus()     
                break

            case ' ':
            case 'Enter':
                e.preventDefault()
                this.selectOption({ target: e.target })
                break
            
            case 'Escape':
                e.preventDefault()
                this.closeOptions()
                this.selectButton.focus()
                break
            
            case 'Tab':
                e.preventDefault()
                this.closeOptions()
                break

            case 'Home':
                e.preventDefault()
                options[0].focus()
                break

            case 'End': 
                e.preventDefault()
                options[options.length - 1].focus()
                break
        }
    }

    openOptions() {
        this.selectButton.classList.add('active')
        this.dropdownArrow.classList.add('turn')
        this.optionsBlock.classList.add('show')
        this.isOpen = true
        this.selectButton.setAttribute('aria-expanded', 'true')
    }

    closeOptions() {
        this.selectButton.classList.remove('active')
        this.dropdownArrow.classList.remove('turn')
        this.optionsBlock.classList.remove('show')
        this.isOpen = false
        this.selectButton.setAttribute('aria-expanded', 'false')
    }

    toggleOptions() {
        if (!this.isOpen) {
            this.openOptions()
        } else {
            this.closeOptions()
        }
    }

    selectOption(e) {
        const options = this.optionsBlock.querySelectorAll('[role="option"]')
        options.forEach(option => {
            option.setAttribute('aria-selected', 'false')
        })

        e.target.setAttribute('aria-selected', 'true')

        this.buttonText.innerHTML = e.target.innerHTML
        this.trigger('change', this.buttonText.innerHTML)
        this.closeOptions()
    }   

    getValue() {
        return {
            text: this.buttonText.innerHTML
        }
    }

    setValue(index) {
        const options = this.optionsBlock.children

        if (!options[index]) {
            console.error('Такой опции не существует')
            return
        }

        this.buttonText.innerHTML = options[index].innerHTML
        this.trigger('change', this.buttonText.innerHTML)
    }

    destroy() {
        if (this.select) {
            this.select.remove()
            document.removeEventListener('keydown', this.globalKeyHandler)
            return true
        } else {
            return false
        }
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        this.events[eventName].push(callback)
    }

    trigger(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => callback(data))
        }
    }
}
