/**
 * Stack
 * ----------------------------
 * I am the Stack Part.
 * I represent a collection of Card parts,
 * along with some extra configurability.
 */
import Part from './Part.js';
import Card from './Card.js';
import Background from './Background.js';
import {
    BasicProperty
} from '../properties/PartProperties.js';

class Stack extends Part {
    constructor(owner, name){
        super(owner);

        // Set up Stack specific
        // PartProperties
        this.partProperties.newBasicProp(
            'cantPeek',
            false
        );
        this.partProperties.newBasicProp(
            'resizable',
            false
        );

        // If we are initializing with a name,
        // set the name property
        if(name){
            this.partProperties.setPropertyNamed(
                this,
                'name',
                name
            );
        }

        // We construct with an initial
        // Background part, since there needs
        // to be at least one
        let initBackground = new Background(this);
        this.addPart(initBackground);
    }

    get type(){
        return 'stack';
    }

    delegateMessage(aMessage){
        this.sendMessage(
            aMessage,
            this._owner
        );
    }
};

export {
    Stack,
    Stack as default
};
