/**
 * WorldView
 * ---------------------------------------------
 * I am a Webcomponent (custom element) that represents
 * a view of a WorldStack model.
 * My element children should contain a single StackView representing
 * the current displayed stack (this comes from the model).
 * I am the root-level element for the SimpleTalk system in a web
 * page. There should only be one of me on any given HTML page.
 */
import PartView from './PartView.js';

class WorldView extends PartView {
    constructor(){
        super();

        // Set up templating and shadow dom
        // TODO: Put the template definition in this
        // module as formatted text
        const template = document.getElementById('world-view-template');
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // Bound methods
        this.updateCurrentStack = this.updateCurrentStack.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.onPropertyChange = this.onPropertyChange.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            // If the model has no loaded stacks,
            // create a new blank one
            if(this.model && this.model.loadedStacks.length == 0){
                this.sendMessage({
                    type: 'newModel',
                    modelType: 'stack',
                    owner: this.model
                }, window.System);
            }

            // If the model specifies a current stack,
            // update it.
            let currStackId = this.model.partProperties.getPropertyNamed(
                this.model,
                'currentStack'
            );
            if(currStackId >= 0){
                let found = document.getElementById(currStackId);
                if(found){
                    found.classList.add('current-stack');
                }
            } else {
                // Otherwise, attempt to set the first stack
                // in the world's list of stacks as the current
                // one.
                let firstAvailableStack = this.firstElementChild;
                if(firstAvailableStack){
                    this.model.partProperties.setPropertyNamed(
                        this.model,
                        'currentStack',
                        firstAvailableStack.id
                    );
                }
            }
        }
    }

    receiveMessage(aMessage){
        switch(aMessage.type){
        case 'propertyChanged':
            this.onPropertyChange(
                aMessage.propertyName,
                aMessage.value
            );
            break;
        default:
            break;
        }
    }

    onPropertyChange(propName, value){
        switch(propName){
        case 'currentStack':
            this.updateCurrentStack(value);
            break;
        default:
            break;
        }
    }

    // Given a stack ID, attempt to find the
    // child component that matches and set
    // it as the current stack. If the id
    // is -1, this means we set no current stack,
    // and instead display the view of all available stacks
    updateCurrentStack(stackId){
        console.log('CALLED!');
        let currentStackView = this.querySelector('.current-stack');
        let nextStackView = document.getElementById(stackId);
        console.log(stackId);
        console.log(currentStackView);
        console.log(nextStackView);
        if(currentStackView){
            currentStackView.classList.remove('current-stack');
        }
        if(nextStackView){
            nextStackView.classList.add('current-stack');
        }
    }
};

export {
    WorldView,
    WorldView as default
};
