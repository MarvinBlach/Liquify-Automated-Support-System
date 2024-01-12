
function toggleModal() {
    const closeButton = document.querySelector('[ass_closer]');
    const component = document.querySelector('.ass_component');

    closeButton.addEventListener('click', function() {
        component.classList.toggle('ass_closed');
    });
}


function mapAttributes(element, liElements = []) {
    const attributeMap = {};

    Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('li-')) {
            attributeMap[attr.name] = {
                value: attr.value,
                element: element // Store the element itself, not its outerHTML
            };
            liElements.push({ element, attr });
        }
    });

    const children = Array.from(element.children);
    if (children.length > 0) {
        attributeMap.children = children.map(child => mapAttributes(child, liElements));
    }

    return attributeMap;
}


function logAttributeStructure() {
    const rootElement = document.documentElement;
    const attributeStructure = mapAttributes(rootElement);
    console.log(attributeStructure);
}

function displayError(attributeName, reason) {
    const errorMessage = `Error found in ${attributeName}: ${reason}`;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'ass_result-error';

    const textDiv = document.createElement('div');
    textDiv.className = 'ass_text';
    textDiv.textContent = errorMessage;

    errorDiv.appendChild(textDiv);

    const contentInner = document.querySelector('.ass_content-inner');
    contentInner.appendChild(errorDiv);
}


function checkLiAttributes(liElements) {
    liElements.forEach(({ element, attr }) => {
        const pageWrapper = document.querySelector('.page-wrapper');
        if (!pageWrapper.contains(element) && element.tagName !== 'BODY') {
            displayError(attr.name, 'Attribute found outside of .page-wrapper and is not the body element');
        }
    });
}

function checkDuplicateLiSections(liElements) {
    const liSectionValues = {};

    liElements.forEach(({ element, attr }) => {
        if (attr.name === 'li-section') {
            if (liSectionValues[attr.value]) {
                displayError(attr.name, `Duplicate value found: ${attr.value}`);
            } else {
                liSectionValues[attr.value] = true;
            }
        }
    });
}


function checkLiElementsValues(liElements) {
    const allowedValues = ['direct-add-to-cart', 'mini-cart-toggle', 'mini-cart-item-count', 'mini-cart-empty', 'mini-cart', 'mini-cart-container', 'mini-cart-full', 'mini-cart-item', 'mini-cart-item-increase', 'mini-cart-item-decrease', 'mini-cart-item-remove', 'mini-cart-item-quantity'];
    const liElementsValues = {};

    liElements.forEach(({ element, attr }) => {
        if (attr.name === 'li-elements') {
            if (!allowedValues.includes(attr.value)) {
                displayError(attr.name, `Invalid value found: ${attr.value}`);
            } else if (liElementsValues[attr.value]) {
                displayError(attr.name, `Duplicate value found: ${attr.value}`);
            } else {
                liElementsValues[attr.value] = true;
            }
        }
    });
}


function checkDuplicateLiSettings() {
    const liSections = document.querySelectorAll('[li-section]');
    console.log(`Found ${liSections.length} elements with 'li-section' attribute.`);

    liSections.forEach(section => {
        const sectionName = section.getAttribute('li-section');
        console.log(`Processing section: ${sectionName}`);
        console.log(`Section innerHTML: ${section.innerHTML}`); // Log the innerHTML of the section

        const allElements = section.getElementsByTagName('*');
        const descendants = Array.from(allElements).filter(element => Array.from(element.attributes).some(attr => attr.name.startsWith('li-')));
        console.log(`Found ${descendants.length} descendants with 'li-' attribute in section ${sectionName}.`);

        const settingsMap = {};
        descendants.forEach(descendant => {
            Array.from(descendant.attributes).forEach(attr => {
                if (attr.name.startsWith('li-settings')) {
                    console.log(`Found attribute: ${attr.name}=${attr.value}`); // Log the attribute

                    const key = attr.name + '=' + attr.value.trim().toLowerCase();

                    console.log(`Key: ${key}`); // Log the extracted key

                    if (settingsMap[key]) {
                        console.log(`Duplicate attribute found in ${sectionName}: ${key}`);
                        displayError(`li-section`, `Duplicate attribute found in ${sectionName}: ${key}`);
                    } else {
                        settingsMap[key] = true;
                    }
                }
            });
        });
    });
}






function clearErrors() {
    const errorElements = document.querySelectorAll('.ass_result-error');
    errorElements.forEach(element => element.remove());
}

function runChecks() {
    const liElements = [];
    mapAttributes(document.documentElement, liElements);

    const checkButton = document.querySelector('[ass_check]');
    checkButton.addEventListener('click', function() {
        clearErrors();
        checkLiAttributes(liElements);
        checkDuplicateLiSections(liElements);
        checkLiElementsValues(liElements);
        checkDuplicateLiSettings();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const modalHTML = createModalHTML();
    document.body.innerHTML += modalHTML;
    generateCSS();
    toggleModal();
    runChecks();
});


function createModalHTML() {
    return `
    <div class="ass_component">
        <div ass_closer="" class="ass_close-button">
            <div class="ass_icon-embed-xsmall w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewbox="0 0 16 17" fill="none" preserveaspectratio="xMidYMid meet" aria-hidden="true" role="img">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1465 3.19403L8.50004 5.84048L5.85359 3.19403L5.14648 3.90114L8.14648 6.90114L8.50004 7.25469L8.85359 6.90114L11.8536 3.90114L11.1465 3.19403ZM11.1465 12.9011L8.50004 10.2547L5.85359 12.9011L5.14648 12.194L8.14649 9.19403L8.50004 8.84048L8.85359 9.19403L11.8536 12.194L11.1465 12.9011Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
        <div class="ass_component-inner">
            <div class="ass_header">
                <div class="ass_text">Liquify - Automated Support Service</div>
            </div>
            <div class="ass_content">
                <div id="w-node-_409b393b-78eb-73c3-19a0-b5eaabc02f13-1e00a484" class="ass_content-inner">
                    <div class="ass_result-correct">
                        <div class="ass_text">You did a great job.<br>No errors.</div>
                    </div>
                </div>
                <a ass_check="" href="#" class="ass_button w-button">Run Attribute Check</a>
            </div>
        </div>
    </div>`;
}

function generateCSS() {
    const css = `
    :root {
        --ass_black: #1e1e1e;
        --ass_white: white;
        --ass_blue: #4353ff;
        --ass_red: #e42f3a;
        --ass_box: rgba(255, 255, 255, .07);
        --ass_gren: #259d4d;
      }
      
      .ass_component {
        color: #333;
        font-family: Spacemono, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }
      
      .ass_component-inner {
        z-index: 9999999;
        width: 25rem;
        height: 100vh;
        background-color: var(--ass_black);
        border-left: 1px solid rgba(255, 255, 255, .2);
      }
      
      .ass_header {
        height: 4rem;
        color: var(--ass_white);
        border-bottom: 1px solid rgba(255, 255, 255, .2);
        justify-content: center;
        align-items: center;
        padding: 1.3rem;
        display: flex;
      }
      
      .ass_text {
        font-size: 1rem;
      }
      
      .ass_content {
        height: 93%;
        grid-column-gap: 1rem;
        flex-direction: column;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        grid-auto-columns: 1fr;
        justify-content: space-between;
        align-items: start;
        padding: 2rem 1.3rem 1.4rem;
        display: flex;
      }
      
      .ass_icon-embed-xsmall {
        width: 1.5rem;
        height: 1.5rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: flex;
        transform: rotate(90deg);
      }
      
      .ass_component {
        position: fixed;
        left: auto;
        top: 0%;
        right: 0%;
        bottom: 0%;
        display: flex;
        align-items: flex-start;
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease;
      }
      
      .ass_component.ass_closed {
        transform: translate(25rem, 0px);
      }
      
      .ass_close-button {
        width: 2.4rem;
        height: 4rem;
        background-color: var(--ass_black);
        color: var(--ass_white);
        cursor: pointer;
        border-top: 1px solid #000;
        border-bottom: 1px solid rgba(255, 255, 255, .2);
        border-left: 1px solid #000;
        border-bottom-left-radius: .25rem;
        justify-content: center;
        align-items: center;
        display: flex;
      }
      
      .ass_content-inner {
        width: 100%;
        height: 80vh;
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
        color: var(--ass_white);
        text-align: center;
        flex-direction: column;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        grid-auto-columns: 1fr;
        align-items: stretch;
        display: flex;
        overflow: scroll;
      }
      
      .ass_button {
        width: 100%;
        background-color: var(--ass_blue);
        text-align: center;
        cursor: pointer;
        border-radius: .25rem;
        transition: all .3s;
      }
      
      .ass_button:hover {
        background-color: #5e6ae9;
      }
      
      .ass_result-error {
        border-top: 2px solid var(--ass_red);
        background-color: var(--ass_box);
        border-top-left-radius: .5rem;
        border-top-right-radius: .5rem;
        padding: 1.5rem 1.2rem;
        overflow: hidden;
      }
      
      .ass_result-correct {
        border-top: 2px solid var(--ass_gren);
        background-color: var(--ass_box);
        border-top-left-radius: .5rem;
        border-top-right-radius: .5rem;
        padding: 1.5rem 1.2rem;
        overflow: hidden;
      }
      
      #w-node-_409b393b-78eb-73c3-19a0-b5eaabc02f13-1e00a484 {
        grid-area: span 1 / span 1 / span 1 / span 1;
      }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}