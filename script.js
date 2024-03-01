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
                element: element.outerHTML
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


let errorDisplayDelay = 0;

function displayError(attributeName, reason, errorId, docLink) {
        const contentInner = document.querySelector('.ass_content-inner');

        const errorHTML = `
                <div class="ass_result-error">
                        <div class="ass_result-error-inner">
                                <div class="ass_text">${reason}</div>
                                <div class="ass_result-error-message">
                                        <div class="attribute_error" ass_key="">${attributeName}</div>
                                        <div class="ass_text ass_error">=</div>
                                        <div class="attribute_error" ass_value="">${errorId}</div>
                                </div>
                        </div>
                        <div class="ass_result-error-tip">
              <a href="#error${errorCount}" class="ass_button-link w-inline-block">
                                <div class="ass_icon-embed-xxsmall w-embed">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewbox="0 0 12 12" fill="none" preserveaspectratio="xMidYMid meet" aria-hidden="true" role="img">
                                <mask id="mask0_1640_8337" style="mask-type:alpha" maskunits="userSpaceOnUse" x="0" y="0" width="12" height="12">
                                  <rect width="12" height="12" fill="#D9D9D9"></rect>
                                </mask>
                                <g mask="url(#mask0_1640_8337)">
                                  <path d="M8.5 10V5H3.9125L5.7125 6.8L5.0125 7.5125L2 4.5L5 1.5L5.7125 2.2125L3.9125 4H9.5V10H8.5Z" fill="#DA615C"></path>
                                </g>
                              </svg>
                                </div>
                                <div class="ass_button-text">Jump to Error</div>
                            </a>
                            <a href="${docLink}" target="_blank" class="ass_button-docu w-inline-block">
                                <div class="ass_icon-embed-xxsmall w-embed">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewbox="0 0 13 13" fill="none" preserveaspectratio="xMidYMid meet" aria-hidden="true" role="img">
                                <mask id="mask0_1640_8639" style="mask-type:alpha" maskunits="userSpaceOnUse" x="0" y="0" width="13" height="13">
                                  <rect x="0.5" y="0.5" width="12" height="12" fill="#D9D9D9"></rect>
                                </mask>
                                <g mask="url(#mask0_1640_8639)">
                                  <path d="M6.475 9.5C6.65 9.5 6.79792 9.43958 6.91875 9.31875C7.03958 9.19792 7.1 9.05 7.1 8.875C7.1 8.7 7.03958 8.55208 6.91875 8.43125C6.79792 8.31042 6.65 8.25 6.475 8.25C6.3 8.25 6.15208 8.31042 6.03125 8.43125C5.91042 8.55208 5.85 8.7 5.85 8.875C5.85 9.05 5.91042 9.19792 6.03125 9.31875C6.15208 9.43958 6.3 9.5 6.475 9.5ZM6.025 7.575H6.95C6.95 7.3 6.98125 7.08333 7.04375 6.925C7.10625 6.76667 7.28333 6.55 7.575 6.275C7.79167 6.05833 7.9625 5.85208 8.0875 5.65625C8.2125 5.46042 8.275 5.225 8.275 4.95C8.275 4.48333 8.10417 4.125 7.7625 3.875C7.42083 3.625 7.01667 3.5 6.55 3.5C6.075 3.5 5.68958 3.625 5.39375 3.875C5.09792 4.125 4.89167 4.425 4.775 4.775L5.6 5.1C5.64167 4.95 5.73542 4.7875 5.88125 4.6125C6.02708 4.4375 6.25 4.35 6.55 4.35C6.81667 4.35 7.01667 4.42292 7.15 4.56875C7.28333 4.71458 7.35 4.875 7.35 5.05C7.35 5.21667 7.3 5.37292 7.2 5.51875C7.1 5.66458 6.975 5.8 6.825 5.925C6.45833 6.25 6.23333 6.49583 6.15 6.6625C6.06667 6.82917 6.025 7.13333 6.025 7.575ZM6.5 11.5C5.80833 11.5 5.15833 11.3687 4.55 11.1062C3.94167 10.8438 3.4125 10.4875 2.9625 10.0375C2.5125 9.5875 2.15625 9.05833 1.89375 8.45C1.63125 7.84167 1.5 7.19167 1.5 6.5C1.5 5.80833 1.63125 5.15833 1.89375 4.55C2.15625 3.94167 2.5125 3.4125 2.9625 2.9625C3.4125 2.5125 3.94167 2.15625 4.55 1.89375C5.15833 1.63125 5.80833 1.5 6.5 1.5C7.19167 1.5 7.84167 1.63125 8.45 1.89375C9.05833 2.15625 9.5875 2.5125 10.0375 2.9625C10.4875 3.4125 10.8438 3.94167 11.1062 4.55C11.3687 5.15833 11.5 5.80833 11.5 6.5C11.5 7.19167 11.3687 7.84167 11.1062 8.45C10.8438 9.05833 10.4875 9.5875 10.0375 10.0375C9.5875 10.4875 9.05833 10.8438 8.45 11.1062C7.84167 11.3687 7.19167 11.5 6.5 11.5ZM6.5 10.5C7.61667 10.5 8.5625 10.1125 9.3375 9.3375C10.1125 8.5625 10.5 7.61667 10.5 6.5C10.5 5.38333 10.1125 4.4375 9.3375 3.6625C8.5625 2.8875 7.61667 2.5 6.5 2.5C5.38333 2.5 4.4375 2.8875 3.6625 3.6625C2.8875 4.4375 2.5 5.38333 2.5 6.5C2.5 7.61667 2.8875 8.5625 3.6625 9.3375C4.4375 10.1125 5.38333 10.5 6.5 10.5Z" fill="#82898C"></path>
                                </g>
                              </svg>
                                </div>
                                <div class="ass_button-text">Go to Docs</div>
                            </a>
                        </div>
                </div>
        `;

        // Add the errorHTML to the DOM after a delay
        setTimeout(() => {
                contentInner.insertAdjacentHTML('beforeend', errorHTML);
                const errorDiv = contentInner.lastElementChild; // Save a reference to the error div

                setTimeout(() => {
                        errorDiv.classList.add('shown'); // Use the saved reference
                }, 50);
        }, errorDisplayDelay);

        errorDisplayDelay += 50;
}

function displaySuccessMessage() {
    const errorElements = document.querySelectorAll('.ass_result-error');

    if (errorElements.length === 0) {
        const contentInner = document.querySelector('.ass_content-inner');
        const successMessage = "<strong>You did a great job.</strong><br>No errors.";

        const successDiv = document.createElement('div');
        successDiv.className = 'ass_result-correct';

        const textDiv = document.createElement('div');
        textDiv.className = 'ass_text';
        textDiv.innerHTML = successMessage;

        successDiv.appendChild(textDiv);
        contentInner.appendChild(successDiv);
    }
}




function checkLiAttributes(liElements) {
    liElements.forEach(({ element, attr }) => {
        const pageWrapper = document.querySelector('.page-wrapper');
        if (!pageWrapper.contains(element) && element.tagName !== 'BODY') {
            highlightErrorElement(element);
            displayError(attr.name, 'Attribute found outside of .page-wrapper and is not the body element', attr.value, 'https://www.liquify.pro/docu/getting-started#Template-Structure');
        }
    });
}

function checkDuplicateLiSections(liElements) {
    const liSectionValues = {};

    liElements.forEach(({ element, attr }) => {
        if (attr.name === 'li-section') {
            if (liSectionValues[attr.value]) {
                highlightErrorElement(element);
                
                displayError(attr.name, 'Duplicate value found:', attr.value, 'https://www.liquify.pro/docu/getting-started#Liquid-Settings');
            } else {
                liSectionValues[attr.value] = true;
            }
        }
    });
}


function checkLiElementsValues(liElements) {
    const allowedValues = ['product-variant-container', 'add-to-cart', 'add-to-cart-quantity', 'product-options-loop', 'product-options-name', 'product-option-loop', 'product-option-input', 'product-option-name', 'direct-add-to-cart', 'mini-cart-toggle', 'mini-cart-item-count', 'mini-cart-empty', 'mini-cart', 'mini-cart-container', 'mini-cart-full', 'mini-cart-item', 'mini-cart-item-increase', 'mini-cart-item-decrease', 'mini-cart-item-remove', 'mini-cart-item-quantity'];
    const liElementsValues = {};

    liElements.forEach(({ element, attr }) => {
        if (attr.name === 'li-elements') {
            if (!allowedValues.includes(attr.value)) {
                highlightErrorElement(element);
                displayError(attr.name, 'Invalid value found:', attr.value, 'https://www.liquify.pro/docu/liquify-elements');
            } else if (liElementsValues[attr.value]) {
                highlightErrorElement(element);
                displayError(attr.name, 'Duplicate value found:', attr.value, 'https://www.liquify.pro/docu/liquify-elements');
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
            // Skip descendants that are inside a 'w-dyn-list' element
            if (descendant.closest('.w-dyn-item')) {
                return;
            }

            Array.from(descendant.attributes).forEach(attr => {
                if (attr.name.startsWith('li-settings')) {
                    console.log(`Found attribute: ${attr.name}=${attr.value}`); // Log the attribute

                    const key = attr.name + '=' + attr.value.trim().toLowerCase();

                    console.log(`Key: ${key}`); // Log the extracted key

                    if (settingsMap[key]) {
                        console.log(`Duplicate attribute found in ${sectionName}: ${key}`);
                        highlightErrorElement(descendant); // Add this line
                        const [attrName, attrValue] = key.split('=');
                        displayError(attrName, `Duplicate attribute found in section ${sectionName}:`, attrValue, 'https://www.liquify.pro/docu/getting-started#Liquid-Settings');
                    } else {
                        settingsMap[key] = true;
                    }
                }
            });
        });
    });
}


function checkLiSettingsWithoutLiSection() {
    const allElements = document.querySelectorAll('*');
    const liSettingsElements = Array.from(allElements).filter(element => Array.from(element.attributes).some(attr => attr.name.startsWith('li-settings')));

    let foundError = false;

    liSettingsElements.forEach(element => {
        let currentElement = element;
        let foundLiSection = false;

        while (currentElement) {
            if (currentElement.hasAttribute('li-section')) {
                foundLiSection = true;
                break;
            }
            currentElement = currentElement.parentElement;
        }

        if (!foundLiSection) {
            console.log(`Found li-settings without li-section: ${element.outerHTML}`);
            highlightErrorElement(element); // Add this line
            const liSettingsAttributes = Array.from(element.attributes).filter(attr => attr.name.startsWith('li-settings'));
            liSettingsAttributes.forEach(attr => {
                let attrValue = attr.value; // Get the value of the 'li-settings' attribute
                attrValue = attrValue ? attrValue : '{empty} '; // Set attrValue to a space if it's empty
                displayError(attr.name, `Found '${attr.name}' without 'li-section' on the page:`, attrValue, 'https://www.liquify.pro/docu/getting-started#Template-Structure');
            });
            foundError = true;
        }
    });
}


function checkWronglyWrittenSettings(liElements) {
    const wronglyWrittenSettingsVariants = ['li-setings', 'li-settngs', 'li-settins'];

    liElements.forEach(({ element, attr }) => {
        if (wronglyWrittenSettingsVariants.some(variant => attr.name.startsWith(variant))) {
            console.log(`Found wrongly written settings word: ${element.outerHTML}`);
            highlightErrorElement(element); // Add this line
            let attrValue = attr.value; // Get the value of the wrongly written settings attribute
            attrValue = attrValue ? attrValue : ' '; // Set attrValue to a space if it's empty
            displayError(attr.name, 'Found wrongly written settings word:', attrValue, 'https://www.liquify.pro/docu/getting-started#Liquid-Settings');
        }
    });
}

function checkAttributesHaveValue(liElements) {
    const attributesToCheck = ['li-section', 'li-object', 'li-for', 'li-if', 'li-unless', 'li-tag', 'li-form', 'li-section', 'li-block'];

    liElements.forEach(({ element, attr }) => {
        if (attributesToCheck.includes(attr.name) && !attr.value) {
            console.log(`Found attribute without value: ${element.outerHTML}`);
            highlightErrorElement(element); // Add this line
            displayError(attr.name, 'Attribute value is empty.', '{empty}', 'https://www.liquify.pro/docu/getting-started');
        } else if (attr.name.startsWith('li-settings') && !attr.value) {
            console.log(`Found li-settings attribute without value: ${element.outerHTML}`);
            highlightErrorElement(element); // Add this line
            displayError(attr.name, 'li-settings attribute value is empty.', '{empty}', 'https://www.liquify.pro/docu/liquify-elements');
        }
    });
}

function checkLiPageValues(liElements) {
    const validValues = ['blog', 'article', 'collection', 'categories', 'product', 'cart', 'gift-card', 'account', 'login', 'register', 'activate', 'reset', 'order', 'adresses', '404', 'password', 'search', 'remove'];

    liElements.forEach(({ element, attr }) => {
        if (attr.name === 'li-page') {
            const valueParts = attr.value.split('-');
            const baseValue = valueParts[0];
            const isAlternative = valueParts.includes('alternative');

            if (!validValues.includes(baseValue) && !isAlternative) {
                console.log(`Found invalid li-page value: ${element.outerHTML}`);
                highlightErrorElement(element); // Add this line
                displayError(attr.name, 'Invalid li-page value:', attr.value, 'https://www.liquify.pro/docu/getting-started#Template-Structure');
            }
        }
    });
}


function checkLiSettingsKeys(liElements) {
    const validKeys = ['text', 'url', 'image', 'textarea', 'checkbox', 'richtext', 'html', 'article', 'blog', 'collection', 'product', 'info'];

    liElements.forEach(({ element, attr }) => {
        if (attr.name.startsWith('li-settings:')) {
            const key = attr.name.split(':')[1];

            if (!validKeys.includes(key)) {
                console.log(`Found invalid li-settings key: ${key}`);
                highlightErrorElement(element); // Add this line
                let attrValue = attr.value; // Get the value of the 'li-settings' attribute
                attrValue = attrValue ? attrValue : ' '; // Set attrValue to a space if it's empty
                displayError(attr.name, `Invalid li-settings key: '${key}'`, attrValue, 'https://www.liquify.pro/docu/getting-started#Liquid-Settings');
            }
        }
    });
}

function checkLiObjectKeys(liElements) {
    const allowedKeys = ['text', 'src', 'alt', 'href', 'class', 'name', 'value', 'placeholder', 'width', 'height'];

    liElements.forEach(({ element, attr }) => {
        if (attr.name.startsWith('li-object:')) {
            const key = attr.name.split(':')[1]; // Get the key after "li-object:"
            if (!allowedKeys.includes(key)) {
                console.log(`Found invalid key for li-object: ${attr.name}`);
                highlightErrorElement(element);
                let attrValue = attr.value; // Get the value of the 'li-object' attribute
                attrValue = attrValue ? attrValue : ' '; // Set attrValue to a space if it's empty
                displayError(attr.name, `You have used an invalid key: '${key}'`, attrValue, 'https://www.liquify.pro/docu/getting-started#Liquid-Objects');
            }
        }
    });
}


let errorCount = 0; // Global counter for error ids

function highlightErrorElement(element) {
    errorCount++; // Increment the counter
    element.id = `error${errorCount}`; // Assign a unique id to the element
    element.style.outline = "4px solid red";
    element.style.borderRadius = "4px";
}


function clearErrors() {
    const errorElements = document.querySelectorAll('.ass_result-error');
    errorElements.forEach(element => element.remove());
}

function clearSuccess() {
    const successElements = document.querySelectorAll('.ass_result-correct');
    successElements.forEach(element => element.remove());
}

function checkAssQuantAttribute() {
    const elements = document.querySelectorAll('[ass_quant]'); // Select all elements with the 'ass_quant' attribute

    elements.forEach(element => {
        console.log(`Found element with ass_quant attribute: ${element.outerHTML}`);
        element.textContent = errorCount; // Set the text of the element to the total error count
    });

    console.log(`Total number of errors found: ${errorCount}`);
}



function runChecks() {
    const checkButton = document.querySelector('[ass_check]');
    checkButton.addEventListener('click', function() {
        // Disable the button
        checkButton.disabled = true;

        const liElements = [];
        mapAttributes(document.documentElement, liElements);

        clearErrors();
        clearSuccess();
        checkLiAttributes(liElements);
        checkDuplicateLiSections(liElements);
        checkLiElementsValues(liElements);
        checkDuplicateLiSettings();
        checkLiSettingsWithoutLiSection();
        checkWronglyWrittenSettings(liElements);
        checkAttributesHaveValue(liElements);
        checkLiPageValues(liElements);
        checkLiSettingsKeys(liElements);
        checkLiObjectKeys(liElements);
        checkAssQuantAttribute();

        setTimeout(function() {
            const errorElements = document.querySelectorAll('.ass_result-error');
            if (errorElements.length === 0) {
                displaySuccessMessage();
            }
            // Re-enable the button
            checkButton.disabled = false;
        }, 1000);
    });
}

document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);
    const liAttributesSupport = urlParams.get('li-attributes-support');

    if (liAttributesSupport === 'true') {
        const modalHTML = createModalHTML();
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        modalContainer.style.position = 'relative'; // z-index only works on positioned elements
        modalContainer.style.zIndex = '9999999999999'; // any high number to ensure it's on top
        document.body.appendChild(modalContainer);
        toggleModal();
        generateCSS();
        runChecks();
    }
});





function createModalHTML() {
    return `
    <div class="ass_component">
    <div ass_closer="" class="ass_close-button">
      <div class="ass_icon-embed-small w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewbox="0 0 17 11" fill="none" preserveaspectratio="xMidYMid meet" aria-hidden="true" role="img">
          <path d="M16.5134 9.61989L15.3648 10.7686L10.442 5.84572L15.3648 0.922891L16.5134 2.07155L12.7393 5.84572L16.5134 9.61989ZM6.1755 5.84572L1.25266 10.7686L0.104004 9.61989L3.87817 5.84572L0.104004 2.07155L1.25266 0.922892L6.1755 5.84572Z" fill="currentColor"></path>
        </svg></div>
    </div>
    <div class="ass_component-inner">
      <div class="ass_header">
        <div class="ass_icon-embed-medium w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 34 34" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
        <g clip-path="url(#clip0_1640_8280)">
        <path d="M0 10.0937C0 5.33551 0 2.95639 1.4782 1.4782C2.95639 0 5.33551 0 10.0937 0H26.5625C31.3207 0 33.6999 0 35.1781 1.4782C36.6562 2.95639 36.6562 5.33551 36.6562 10.0937V26.5625C36.6562 31.3207 36.6562 33.6999 35.1781 35.1781C33.6999 36.6562 31.3207 36.6562 26.5625 36.6562H10.0937C5.33551 36.6562 2.95639 36.6562 1.4782 35.1781C0 33.6999 0 31.3207 0 26.5625V10.0937Z" fill="white"/>
        <g filter="url(#filter0_f_1640_8280)">
        <ellipse cx="-12.6134" cy="40.7836" rx="37.1913" ry="40.7836" fill="#00ED97"/>
        </g>
        <g filter="url(#filter1_f_1640_8280)">
        <ellipse cx="61.2211" cy="0.978281" rx="44.2481" ry="53.1498" transform="rotate(-35.6464 61.2211 0.978281)" fill="#7EFFD8"/>
        </g>
        <g filter="url(#filter2_f_1640_8280)">
        <ellipse cx="41.624" cy="50.6619" rx="37.0371" ry="39.3775" transform="rotate(-35.6464 41.624 50.6619)" fill="#0057FF"/>
        </g>
        <g filter="url(#filter3_d_1640_8280)">
        <path d="M19.4639 9.43794C19.4999 11.8193 23.0404 11.7716 23.1211 9.43794C23.0795 7.04251 19.5092 7.03273 19.4639 9.43794Z" fill="white"/>
        <path d="M22.3671 12.9997L19.5076 12.9478L17.7691 26.9157C17.7486 27.085 17.8908 27.2317 18.063 27.217C19.8649 27.0648 21.3375 25.6877 21.5562 23.8919L22.8063 13.493C22.8362 13.2332 22.6324 13.004 22.3664 12.9991L22.3671 12.9997Z" fill="white"/>
        <path d="M16.3735 7.32983H16.1249C14.323 7.32983 12.459 9.04129 12.3347 12.342L10.8621 23.9504C10.6577 25.608 11.9184 27.0854 13.6041 27.185V27.1893H13.6656H16.1249C16.3163 27.1893 16.476 27.0463 16.494 26.8592L16.686 24.8886C16.7102 24.6221 16.7102 23.9498 15.8894 23.9296C13.5327 23.8727 14.7213 21.6265 14.6592 20.2206L16.3735 7.32983Z" fill="white"/>
        </g>
        </g>
        <defs>
        <filter id="filter0_f_1640_8280" x="-70.125" y="-20.3203" width="115.023" height="122.208" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="10.1602" result="effect1_foregroundBlur_1640_8280"/>
        </filter>
        <filter id="filter1_f_1640_8280" x="-6.55908" y="-69.6531" width="135.56" height="141.263" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="10.1602" result="effect1_foregroundBlur_1640_8280"/>
        </filter>
        <filter id="filter2_f_1640_8280" x="-16.5464" y="-8.26098" width="116.341" height="117.846" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="10.1602" result="effect1_foregroundBlur_1640_8280"/>
        </filter>
        <filter id="filter3_d_1640_8280" x="7.65283" y="4.67358" width="18.6558" height="26.2632" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="0.53125"/>
        <feGaussianBlur stdDeviation="1.59375"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1640_8280"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1640_8280" result="shape"/>
        </filter>
        <clipPath id="clip0_1640_8280">
        <rect width="34" height="34" rx="5.04687" fill="white"/>
        </clipPath>
        </defs>
        </svg></div>
        <div class="ass_header-inner">
          <div class="ass_icon-embed-custom w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewbox="0 0 45 18" fill="none" preserveaspectratio="xMidYMid meet" aria-hidden="true" role="img">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5177 0.840576H3.68424L2.55886 9.9735C2.56964 10.2174 2.52424 10.499 2.47844 10.7832C2.34732 11.5965 2.21289 12.4305 3.38322 12.4588C3.93322 12.4723 3.93322 12.9228 3.91698 13.1014L3.78833 14.4218C3.77625 14.5471 3.66925 14.643 3.54102 14.643H1.89313H1.85191V14.6401C0.722366 14.5733 -0.122398 13.5834 0.0145797 12.4727L0.978001 4.19902C1.06127 1.98736 2.3103 0.840576 3.5177 0.840576ZM43.9668 5.0498L41.9109 5.07273C41.7209 5.16977 40.551 7.68477 39.7759 9.35098C39.3994 10.1602 39.1161 10.7693 39.0835 10.8038C39.0268 10.9308 38.8362 10.907 38.8149 10.7698C38.8673 10.7613 38.1086 8.01227 37.6952 6.51463L37.6952 6.51436L37.6949 6.51358C37.5501 5.98871 37.4477 5.61778 37.4377 5.57281C37.3569 5.27793 37.0863 5.07232 36.7761 5.07028L34.0544 5.05103C33.7164 5.11082 34.1265 3.63884 34.1873 3.52908C34.5572 2.59405 35.2276 2.55596 35.7768 2.52474C36.145 2.50382 36.4587 2.48599 36.5912 2.20331L36.7777 1.13557C34.1494 0.652281 33.0565 1.77654 33.0565 1.77654C32.1572 2.54612 31.7829 3.74656 31.7046 4.92611C31.6958 4.99655 31.6351 5.0498 31.563 5.0498L30.3073 5.09075C30.2886 5.10017 30.2053 6.206 30.2053 6.206C30.1201 6.64375 30.5494 6.64051 30.9435 6.63753C31.0944 6.63639 31.2401 6.63529 31.3499 6.65898L30.269 16.6622C31.5268 16.582 32.7113 15.7309 32.8579 14.4829L33.7588 6.80643C33.7672 6.73557 33.8284 6.68192 33.9008 6.68233L35.4209 6.68643C35.485 6.68643 35.5412 6.72902 35.5583 6.79005L37.4689 13.6933C37.5128 13.776 36.8171 15.5278 36.3405 16.7278C36.0994 17.3348 35.9144 17.8007 35.9097 17.8377H36.6932C37.6184 17.8377 38.466 17.3294 38.8895 16.5201L44.0954 5.25499C44.1454 5.16079 44.075 5.04857 43.9672 5.0498H43.9668ZM27.2653 2.70942C27.2894 4.30509 29.6617 4.27314 29.7159 2.70942C29.688 1.10433 27.2956 1.09777 27.2653 2.70942ZM27.2078 5.05893L29.1238 5.09375V5.09334C29.302 5.09661 29.4386 5.20924 29.4186 5.38331L28.6225 12.2694C28.4668 13.546 27.366 14.5068 26.0591 14.5068L27.2078 5.05893ZM5.82397 2.83254C5.84812 4.42822 8.22045 4.39627 8.27458 2.83254C8.24668 1.22745 5.85437 1.2209 5.82397 2.83254ZM5.80721 5.05893L7.72323 5.09375L7.72281 5.09334C7.90101 5.09661 8.03757 5.2502 8.01759 5.42427L7.1799 12.3922C7.03335 13.5955 6.04661 14.5183 4.83921 14.6203C4.72388 14.6301 4.62854 14.5318 4.64228 14.4183L5.80721 5.05893ZM8.44822 9.59233C8.11432 11.2662 8.07934 13.6204 9.82466 14.433C11.4109 15.1145 12.9656 14.1082 13.8782 12.773L13.2691 17.6309C14.5835 17.6211 15.6872 16.6549 15.85 15.3717L17.1315 5.0613C10.4288 4.36258 8.80503 7.80294 8.44822 9.59192V9.59233ZM14.6655 6.74503L14.4244 8.59586C14.2933 9.60052 13.9207 10.5634 13.3174 11.3846C12.6221 12.3311 11.6978 13.0089 10.8897 12.3094C9.15767 10.81 11.55 6.34816 14.4215 6.46079C14.5718 6.46652 14.6847 6.5984 14.6655 6.74503ZM19.5096 11.0032C19.0462 13.8869 21.8328 12.684 22.6013 11.0495H22.6022C23.0594 10.3343 23.1765 9.40785 23.2913 8.49923C23.5038 6.81873 23.7086 5.1991 26.0429 5.08904L24.8738 14.4804C24.7929 14.4817 24.7151 14.4831 24.6402 14.4845L24.6392 14.4845L24.6385 14.4845C22.9332 14.5156 22.7397 14.5191 22.9223 12.598C21.8961 14.0671 20.1208 15.1201 18.4258 14.3784C17.2147 13.7444 17.0103 12.3101 17.1814 11.0032L17.9071 5.08904C20.4161 5.19985 20.0178 7.60421 19.6961 9.54614C19.6064 10.0877 19.5226 10.5933 19.5096 11.0032Z" fill="#110D1A"></path>
            </svg></div>
          <div class="ass_text-small">Automated Support Service</div>
        </div>
      </div>
      <div class="ass_content">
        <div class="ass_content-counter">
          <div class="ass_text-large">Errors</div>
          <div class="ass_text-large ass_smaller">(<span ass_quant="">0</span>)</div>
        </div>
        <div id="w-node-_409b393b-78eb-73c3-19a0-b5eaabc02f13-1e00a484" class="ass_content-inner">
      </div>
      <a ass_check="" href="#" class="ass_button w-button">Run Attribute Check</a>
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

      .ass_text a {
        color: white;
        text-decoration: none;
    }

      .ass_result-error {
        min-height: 9rem !important;
        transition: opacity 0.5s ease-in-out;
        opacity: 0;
      }

      .ass_result-error.shown {
        opacity: 1;
    }

    .ass_component-inner {
        z-index: 9999999;
        width: 25rem;
        height: 100vh;
        border-left: .125rem solid var(--ass_blue);
        background-color: var(--white);
        background-image: radial-gradient(circle farthest-side at 50% 59%, rgba(255, 255, 255, 0), #fff), url('https://uploads-ssl.webflow.com/65a17c2d42e84ed31e00a473/65be3fd1cd551df736fa6069_Group%201000004130.webp');
        background-position: 0 0, 0 0;
        background-repeat: repeat, no-repeat;
        background-size: auto, cover;
        position: relative;
        color: var(--ass_black);
      }
      
    .ass_component {
        align-items: flex-start;
        transition: all .3s;
        display: flex;
        position: fixed;
        top: 0%;
        bottom: 0%;
        left: auto;
        right: 0%;
      }
      
      .ass_close-button {
        width: 3.7rem;
        height: 3.7rem;
        background-color: var(--ass_blue);
        color: var(--ass_white);
        cursor: pointer;
        border-bottom-left-radius: .25rem;
        justify-content: center;
        align-items: center;
        display: flex;
      }
      
      .ass_content-inner {
        width: 100%;
        height: 100%;
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
        color: var(--ass_white);
        text-align: center;
        flex-direction: column;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        grid-auto-columns: 1fr;
        align-items: stretch;
        margin-bottom: 2.5rem;
        display: flex;
        overflow: scroll;
      }
      
      .ass_button {
        width: 100%;
        background-color: var(--ass_blue);
        text-align: center;
        cursor: pointer;
        border-radius: .5rem;
        padding-top: .725rem;
        padding-bottom: .725rem;
        font-weight: 600;
        transition: all .3s;
      }
      
      .ass_button:hover {
        background-color: #5e6ae9;
      }

      .ass_component {
        font-family: 'Inter' !important;
      }

      .ass_component.ass_closed {
       transform: translate(25rem, 0px);
      }
      
      .ass_result-error {
        grid-column-gap: 1.25rem;
        grid-row-gap: 1.25rem;
        color: var(--ass_black);
        text-align: left;
        background-color: rgba(255, 255, 255, .6);
        border: 1px solid rgba(130, 137, 140, .1);
        border-radius: .5rem;
        flex-direction: column;
        flex: none;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 1.5rem;
        display: flex;
        overflow: hidden;
      }
      
      .ass_result-correct {
        color: var(--ass_black);
        background-color: rgba(255, 255, 255, .6);
        border: 1px solid rgba(130, 137, 140, .1);
        border-radius: .5rem;
        flex: none;
        padding: 1.5rem 1.2rem;
        overflow: hidden;
      }

      .ass_icon-embed-medium {
        width: 2.7rem;
        height: 2.7rem;
        border-radius: .3125rem;
        flex: none;
      }
      
      .ass_icon-embed-custom {
        height: 1.25rem;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        display: flex;
      }
      
      .ass_text-small {
        color: var(--ass_black);
        font-size: .75rem;
        font-weight: 600;
      }
      
      .ass_header-inner {
        flex-direction: column;
        align-items: flex-start;
        margin-top: .575rem;
        display: flex;
      }

      .ass_header {
        z-index: 10;
        grid-column-gap: .75rem;
        grid-row-gap: .75rem;
        background-color: var(--white);
        color: var(--ass_white);
        border-bottom: 1px solid rgba(255, 255, 255, .2);
        grid-template-rows: auto auto;
        grid-template-columns: 1fr 1fr;
        grid-auto-columns: 1fr;
        justify-content: flex-start;
        align-items: center;
        padding: 1.5rem 1.3rem 2.375rem 1.6875rem;
        display: flex;
        position: absolute;
        top: 0%;
        bottom: auto;
        left: 0%;
        right: 0%;
        height: auto !important;
      }
      
      .ass_content-counter {
        width: 100%;
        justify-content: space-between;
        margin-bottom: 1.25rem;
        display: flex;
      }

      .ass_content {
        height: 100%;
        grid-column-gap: 1rem;
        flex-direction: column;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        grid-auto-columns: 1fr;
        justify-content: space-between;
        align-items: start;
        padding: 7.5rem 1.3rem 1.4rem;
        display: flex;
      }

      .ass_text {
        font-size: 0.9rem;
      }
      
      .ass_text-large {
        font-size: 1.25rem;
        font-weight: 600;
      }
      
      .ass_text-large.ass_smaller {
        font-size: 1rem;
      }
      
      .ass_result-error-inner {
        grid-column-gap: .75rem;
        grid-row-gap: .75rem;
        flex-direction: column;
        align-items: flex-start;
        display: flex;
      }
      
      .attribute_error {
        color: var(--ass_red);
        background-color: rgba(228, 47, 58, 0.10);
        border-radius: .5rem;
        padding: .2rem 0.5rem;
        font-family: Sourcecodepro, sans-serif;
        font-weight: 600;
        font-size: .8rem;
      }
      
      .ass_result-error-message {
        grid-column-gap: .75rem;
        grid-row-gap: .75rem;
        align-items: center;
        display: flex;
      }
      
      .ass_button-link {
        grid-column-gap: .25rem;
        grid-row-gap: .25rem;
        background-color: var(--white);
        color: var(--ass_red);
        border-radius: .5rem;
        align-items: center;
        padding: .45rem .75rem .55rem;
        text-decoration: none;
        transition: all .3s;
        display: flex;
      }
      
      .ass_button-link:hover {
        color: #fd4038;
        background-color: #faf9f9;
      }
      
      .ass_button-text {
        font-size: .8rem;
        font-weight: 600;
        text-decoration: none;
      }
      
      .ass_result-error-tip {
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
        align-items: center;
        display: flex;
      }
      
      .ass_button-docu {
        grid-column-gap: .25rem;
        grid-row-gap: .25rem;
        color: #82898c;
        align-items: center;
        text-decoration: none;
        transition: all .3s;
        display: flex;
      }
      
      .ass_button-docu:hover {
        color: #000;
      }

      .ass_icon-embed-xxsmall {
        display: flex;
        width: 1rem;
        height: 1rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      
      .ass_icon-embed-small {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: .3125rem;
        flex: none;
      }
      
      #w-node-_409b393b-78eb-73c3-19a0-b5eaabc02f13-1e00a484 {
        grid-area: span 1 / span 1 / span 1 / span 1;
      }

      @font-face {
        font-family: 'Inter';
        src: url('https://assets.website-files.com/65a17c2d42e84ed31e00a473/65be3670fca0ab56c8346ce4_Inter-SemiBold.ttf') format('truetype');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Sourcecodepro';
        src: url('https://assets.website-files.com/65a17c2d42e84ed31e00a473/65be36b0db0e7f3c3334b395_SourceCodePro-SemiBold.ttf') format('truetype');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Inter';
        src: url('https://assets.website-files.com/65a17c2d42e84ed31e00a473/65be3a4322fa5cd707ece9db_Inter-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      .ass_result-error {
        grid-column-gap: 1.25rem;
        grid-row-gap: 1.25rem;
        color: var(--ass_black);
        text-align: left;
        background-color: rgba(255, 255, 255, .6);
        border: 1px solid rgba(130, 137, 140, .1);
        border-radius: .5rem;
        flex-direction: column;
        flex: none;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 1.5rem;
        display: flex;
        overflow: hidden;
      }

      .ass_result-error {
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.60);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.10), 0px 0px 2px 0px rgba(0, 0, 0, 0.03);
        backdrop-filter: blur(15.5px);
        }
        .ass_button-link {
        box-shadow: 0px 0px 1px 0px rgba(16, 24, 40, 0.20), 0px -1px 0px 0px rgba(0, 0, 0, 0.10) inset, 0px 0px 1px 0px rgba(0, 0, 0, 0.05);
        }
        .ass_button {
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px -2px 0px 0px rgba(0, 0, 0, 0.20) inset;
        }
        .ass_icon-embed-medium {
        box-shadow: 0px 2.479px 6.269px 0px rgba(11, 99, 253, 0.30);
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}