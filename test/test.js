// Luke Mitchell, 2016
// https://github.com/lukem512/pronounceable

const {Pronounceable, train} = require("../pronounceable");

describe('test()', () => {
    const testCases = [
        ['a', true],
        ['froggies', true],
        ['frggies', false],
        ['fry', true],
        ['friy', false],
        ['frrrr', false],
        ['ax', true],
        ['xa', true],
        ['xax', false],
        ['xaxa', false],
        ['mom', true],
        ['moom', true],
        ['maam', false],
        ['goo', true],
        ['hxueb', false],
        ['thth', false],
        ['thump', true],
        ['grumph', true],
        ['samosa', true],
        ['xghsii', false],
        ['as', true],
        ['ha', true],
        ['sa', true],
        ['xz', false],
        ['kt', false],
    ]
    const pronounceable = new Pronounceable();
    test.each(testCases)('%p is pronounceable? %p', (word, expected) => {
        expect(pronounceable.test(word)).toEqual(expected)
    })
})

describe('train()', () => {
    const dataset = `al
    ab`
    const testCases = [
        ['al', true],
        ['ab', true],
        ['frggies', false],
        ['fry', false],
    ]

    const pronounceable = train(dataset);
    test.each(testCases)('%p is pronounceable? %p', (word, expected) => {
        expect(pronounceable.test(word)).toEqual(expected)
    })
})
