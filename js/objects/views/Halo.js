/**
 * New Halo
 */

/** Note: Icons are from 
*** https://tablericons.com/
**/
const deleteIcon =`
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="4" y1="7" x2="20" y2="7" />
  <line x1="10" y1="11" x2="10" y2="17" />
  <line x1="14" y1="11" x2="14" y2="17" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>
`;
const editIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
  <line x1="16" y1="5" x2="19" y2="8" />
</svg>
`;
const growIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrows-diagonal-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <polyline points="16 20 20 20 20 16" />
  <line x1="14" y1="14" x2="20" y2="20" />
  <polyline points="8 4 4 4 4 8" />
  <line x1="4" y1="4" x2="10" y2="10" />
</svg>
`;

const templateString = `
<style>
 :host {
     --halo-button-height: 25px;
     --halo-button-width: 25px;
     --halo-rim-margin: 10px;
     --halo-button-width-padded: calc(var(--halo-button-width) + var(--halo-rim-margin));
     --halo-button-height-padded: calc(var(--halo-button-height) + var(--halo-rim-margin));
     position: absolute;
     box-sizing: border-box;
     top: calc(-1 * var(--halo-button-height-padded));
     left: calc(-1 * var(--halo-button-width-padded));
     width: calc(100% + (2 * var(--halo-button-width-padded)));
     height: calc(100% + (2 * var(--halo-button-height-padded)));
     color: initial;
 }


 .halo-row,
 .halo-column {
     display: flex;
     position: absolute;
 }

 .halo-column {
     flex-direction: column;
 }

 #halo-top-row,
 #halo-bottom-row {
     width: calc(100% - var(--halo-button-width-padded));
     height: var(--halo-button-height-padded);
 }

 #halo-top-row {
     left: 0;
     top: 0;
 }

 #halo-bottom-row {
     right: 0;
     bottom: 0;
     flex-direction: row-reverse;
     align-items: flex-end;
 }

 #halo-right-column,
 #halo-left-column {
     height: calc(100% - var(--halo-button-height-padded));
     width: var(--halo-button-width-padded);
 }

 #halo-right-column {
     right: 0;
     top: 0;
     align-items: flex-end;
 }

 #halo-left-column {
     left: 0;
     top: var(--halo-button-height-padded);
 }

 .halo-button,
 ::slotted(*) {
     display: block;
     border: 1px solid rgba(100, 100, 100, 0.8);
     width: var(--halo-button-width);
     height: var(--halo-button-height);
     background-color: rgb(220, 220, 220);
 }

 .halo-button:hover
 ::slotted(*).halo-button:hover {
     cursor: pointer;
 }

 .halo-button:active
 ::slotted(*).halo-button:active {
     border: 1px solid black;
 }

 .halo-button.hidden
 ::slotted(*).halo-button.hidden {
     display: none;
 }

</style>

<div id="halo-top-row" class="halo-row">
    <div id="halo-delete" class="halo-button" title="Delete this part">
        ${deleteIcon}
    </div>
    <slot name="top-row"></slot>
</div>

<div id="halo-bottom-row" class="halo-row">
    <div id="halo-resize" class="halo-button" title="Resize this part">
        ${growIcon}
    </div>
    <slot name="bottom-row"></slot>
</div>

<div id="halo-left-column" class="halo-column">
    <slot name="left-column"></slot>
</div>

<div id="halo-right-column" class="halo-column">
    <div id="halo-script-edit" class="halo-button" title="Edit this part's script">
        ${editIcon}
    </div>
    <slot name="right-column"></slot>
</div>

`;

class Halo extends HTMLElement {
    constructor(){
        super();

        // Configure the Shadow DOM and template
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(
            this.template.content.cloneNode(true)
        );

        // Bind component methods


        // Bind event listeners
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onResizeMouseDown = this.onResizeMouseDown.bind(this);
        this.onResizeMouseUp = this.onResizeMouseUp.bind(this);
        this.onResizeMouseMove = this.onResizeMouseMove.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this.targetElement = this.getRootNode().host;
            this.targetElement.classList.add('editing');
            this.targetElement.hasOpenHalo = true;

            // Add event listeners
            this.addEventListener('mousedown', this.onMouseDown);

            // Resize button
            this.resizer = this.shadowRoot.getElementById('halo-resize');
            this.resizer.addEventListener('mousedown', this.onResizeMouseDown);
            if(!this.targetElement.wantsHaloResize){
                this.resizer.style.visibility = 'hidden';
            }

            // Delete button
            this.deleter = this.shadowRoot.getElementById('halo-delete');
            this.deleter.addEventListener('click', this.targetElement.onHaloDelete);
            if(!this.targetElement.wantsHaloDelete){
                this.deleter.style.visibility = 'hidden';
            }

            // Edit button
            this.editor = this.shadowRoot.getElementById('halo-script-edit');
            this.editor.addEventListener('click', this.targetElement.onHaloOpenEditor);
            if(!this.targetElement.wantsHaloScriptEdit){
                this.editor.style.visibility = 'hidden';
            }
        }
    }

    disconnectedCallback(){
        this.targetElement.classList.remove('editing');
        this.targetElement.hasOpenHalo = false;

        // Remove event listeners
        this.removeEventListener('mousedown', this.onMouseDown);
        this.resizer.removeEventListener('mousedown', this.onResizeMouseDown);
    }


    /* Event Handling */
    onMouseDown(event){
        if(event.button == 0 && this.targetElement.wantsHaloMove){
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        }
    }

    onMouseMove(event){
        let currentTop = this.targetElement.offsetTop;
        let currentLeft = this.targetElement.offsetLeft;
        let newTop = event.movementY + currentTop;
        let newLeft = event.movementX + currentLeft;

        this.targetElement.style.top = `${newTop}px`;
        this.targetElement.style.left = `${newLeft}px`;
    }

    onMouseUp(event){
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    onResizeMouseDown(event){
        event.stopPropagation();
        document.addEventListener('mousemove', this.onResizeMouseMove);
        document.addEventListener('mouseup', this.onResizeMouseUp);
    }

    onResizeMouseUp(event){
        document.removeEventListener('mousemove', this.onResizeMouseMove);
        document.removeEventListener('mouseup', this.onResizeMouseUp);
    }

    onResizeMouseMove(event){
        let rect = this.targetElement.getBoundingClientRect();
        let newWidth, newHeight;
        if(this.targetElement.preserveAspectOnResize){
            let ratio = rect.width / rect.height;
            let hyp = Math.sqrt((event.movementX**2) + (event.movementY**2));
            if(event.movementX < 0 || event.movementY < 0){
                hyp = hyp * -1;
            }
            newHeight = rect.height + hyp;
            newWidth = rect.width + hyp;
        } else {
            newWidth = event.movementX + rect.width;
            newHeight = event.movementY + rect.height;
        }
        this.targetElement.style.width = `${newWidth}px`;
        this.targetElement.style.height = `${newHeight}px`;
        if(this.targetElement.onHaloResize){
            this.targetElement.onHaloResize(
                event.movementX,
                event.movementY
            );
        }
    }
};

export {
    Halo,
    Halo as default
};
