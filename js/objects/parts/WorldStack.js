/**
 * WorldStack
 * ---------------------------------------------------
 * I am a Stack part that represents the root of a
 * hierarchy of parts. I am the end of the ownership
 * chain for any given configuration of Parts.
 * I am also the final resolver of all unhandled
 * messages sent along the delegation chain for parts.
 * All parts can eventually resolve to me via the delegation
 * chain or ownership hierarchy.
 * There should only be one instance of me in any given
 * SimpleTalk environment.
 */
import Part from './Part.js';
import Card from './Card.js';
import Field from './Field.js';
import Stack from './Stack.js';
import Background from './Background.js';
import Button from './Button.js';

class WorldStack extends Part {
    constructor(){
        super(null);

        // loadedStacks is a simple array
        // of Stack parts that this WorldStack
        // knows about.
        this.loadedStacks = [];

        // The currentStack is the
        // stack that should be currently displayed.
        this.currentStack = null;

        this.isWorld = true;
    }

    get type(){
        return 'world';
    }

    // Override normal Part serialization.
    // Here we need to also include an array of ids of
    // loaded stacks and the id of the current stack
    serialize(){
        let currentStackId;
        if(this.currentStack){
            currentStackId = this.currentStack.id;
        } else {
            currentStackId = null;
        }
        let result = {
            type: this.type,
            id: this.id,
            properties: [],
            subparts: this.subparts.map(subpart => {
                return subpart.id;
            }),
            ownerId: null,
            loadedStacks: (this.loadedStacks.map(stack => {
                return stack.id;
            })),
            currentStack: currentStackId
        };

        // Serialize current part properties
        // values
        this.partProperties._properties.forEach(prop => {
            let name = prop.name;
            let value = prop.getValue(this);
            result.properties[name] = value;
        });
        return JSON.stringify(result, null, 4);
    }

    // Override for delegation.
    // Because this is the root in the chain,
    // any messages sent for delegation will
    // be treated as messages that the system
    // does not understand. For now, we throw an
    // error
    delegateMessage(aMessage){
        throw new Error(`Our World does not understand this message: ${aMessage}`);
    }
};


/**
 * Constructs the appropriate Part based
 * on the incoming serialization string, which
 * should be JSON valid
 */
WorldStack.fromSerialization = function(aString){
    let json = JSON.parse(aString);
    let newPart = null;
    switch(json.type){
    case 'stack':
        newPart = new Stack();
    case 'card':
        newPart = new Card();
    case 'background':
        newPart = new Background();
    case 'button':
        newPart = new Button();
    case 'field':
        newPart = new Field();
    }

    if(!newPart){
        throw new Error(`Could not deserialize: type ${json.type} is not a valid part!`);
    }

    newPart.setFromDeserialized(json);
};

export {
    WorldStack,
    WorldStack as default
};
