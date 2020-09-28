/**
 * PartView
 * ----------------------------------------
 * I am an *abstract* webcompoent CustomElement
 * that serves as the generic view for any Part
 * models.
 * I should not be instantiated directly, nor should
 * I be added to any web page's registry of CustomElements.
 * I am indended to be extended (subclassed) by the actual
 * views for each Part kind, and therefore I contain all
 * of the common behavior, including lifecycle methods,
 * for these.
 */
class PartView extends HTMLElement {
    constructor(){
        super();
        this.model = null;
        this.isPartView = true;
        this.name = this.constructor.name;

        // Bind component methods
        this.setModel = this.setModel.bind(this);
        this.unsetModel = this.unsetModel.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    modelPropertyChanged(){
        throw new Error(`Should be implemented in subclass!`);
    }

    setModel(aModel){
        this.model = aModel;
        aModel.addPropertySubscriber(this);
        this.setAttribute('part-id', aModel.id);
    }

    unsetModel(aModel){
        this.model = null;
        aModel.removePropertySubscriber(this);
        this.setAttribute('part-id', "");
    }

    sendMessage(aMessage, target){
        window.System.sendMessage(aMessage, this, target);
    }

    receiveMessage(aMessage){
        // Do nothing here.
        // subclasses should implement
        // their own handling of received
        // messages
    }

    onHaloDelete(){
        // What to do when the user clicks the
        // delete button on a halo for this partview.
        // The default implementation is to send a message
        // to the System to delete the corresponding
        // model and *all* views referencing that
        // model.
        this.sendMessage({
            type: 'command',
            commandName: 'removeModel',
            modelId: this.model.id
        }, window.System);
    }


};

export {
    PartView,
    PartView as default
};
