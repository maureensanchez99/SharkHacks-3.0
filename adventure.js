    const textElement = document.getElementById('text')
    const optionButtonsElement = document.getElementById('option-buttons')

    let state = {}

    function startGame() {
    state = {}
    showTextNode(1)
    }

    function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)
        }
    })
    }

    function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
    }

    function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
    }

    const textNodes = [
    {
        id: 1,
        text: 'You are hanging out at the beach one day and see .',
        options: [
        {
            text: 'Take the goo',
            setState: { blueGoo: true },
            nextText: 2
        },
        {
            text: 'Leave the goo',
            nextText: 2
        }
        ]
    },
    {
        id: 2,
        text: 'Page 2.',
        options: [
        {
            text: 'Trade the goo for a sword',
            requiredState: (currentState) => currentState.blueGoo,
            setState: { blueGoo: false, sword: true },
            nextText: 3
        },
        {
            text: 'Trade the goo for a shield',
            requiredState: (currentState) => currentState.blueGoo,
            setState: { blueGoo: false, shield: true },
            nextText: 3
        },
        {
            text: 'Ignore the merchant',
            nextText: 3
        }
        ]
    },
    {
        id: 3,
        text: 'Page 3.',
        options: [
        {
            text: 'Explore the castle',
            nextText: 4
        },
        {
            text: 'Find a room to sleep at in the town',
            nextText: 5
        },
        {
            text: 'Find some hay in a stable to sleep in',
            nextText: 6
        }
        ]
    },
    {
        id: 4,
        text: 'Page 4.',
        options: [
        {
            text: 'Restart',
            nextText: -1
        }
        ]
    },
    {
        id: 5,
        text: 'Page 5',
        options: [
        {
            text: 'Restart',
            nextText: -1
        }
        ]
    },
    {
        id: 6,
        text: 'Page 6.',
        options: [
        {
            text: 'Explore the castle',
            nextText: 7
        }
        ]
    },
    {
        id: 7,
        text: 'Page 7',
        options: [
        {
            text: 'Try to run',
            nextText: 8
        },
        {
            text: 'Attack it with your sword',
            requiredState: (currentState) => currentState.sword,
            nextText: 9
        },
        {
            text: 'Hide behind your shield',
            requiredState: (currentState) => currentState.shield,
            nextText: 10
        },
        {
            text: 'Throw the blue goo at it',
            requiredState: (currentState) => currentState.blueGoo,
            nextText: 11
        }
        ]
    },
    {
        id: 8,
        text: 'Page 8.',
        options: [
        {
            text: 'Restart',
            nextText: -1
        }
        ]
    },
    {
        id: 9,
        text: 'Page 9.',
        options: [
        {
            text: 'Restart',
            nextText: -1
        }
        ]
    },
    {
        id: 10,
        text: 'Page 10.',
        options: [
        {
            text: 'Restart',
            nextText: -1
        }
        ]
    },
    {
        id: 11,
        text: 'Page 11.',
        options: [
        {
            text: 'Congratulations, you helped guide BLÅHAJ home. Want to play again?.',
            nextText: -1
        }
        ]
    }
    ]

    startGame()