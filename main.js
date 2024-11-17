import { readTextFile } from './modules/ajax.js';
import { mimePreset } from './modules/mime-presets.js';

const qsRoot = 'body ';
const qsConfigRoot = `${qsRoot}> .config .config_`;
const addTo = document.querySelector(`${qsRoot}> .content`);
const links = document.querySelectorAll(`${qsRoot}> .links a`);

links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const rawAttributes = e.target.attributes;

        let mime;
        let finalUrl;
        let headers;

        let inputValues = {
            user:           document.querySelector(`${qsConfigRoot}user`).value,
            rep:            document.querySelector(`${qsConfigRoot}rep`).value,
            branch:         document.querySelector(`${qsConfigRoot}branch`).value,
            token:          document.querySelector(`${qsConfigRoot}token`).value,
            tokenHeader:    document.querySelector(`${qsConfigRoot}token_header`).value,
            tokenPrefix:    document.querySelector(`${qsConfigRoot}token_prefix`).value,
            website:        document.querySelector(`${qsConfigRoot}website`).value,
            rawUrl:         document.querySelector(`${qsConfigRoot}rawurl`).value,
            rawUrlSchema:   document.querySelector(`${qsConfigRoot}rawurlschema`).value,
            method:         document.querySelector(`${qsConfigRoot}method:checked`).value,
        };
        let linkAttribute = {
            domainType: rawAttributes.domain.value,
            fileNumber: rawAttributes.filenumber.value,
        };

        inputValues.url = document.querySelector(`${qsConfigRoot}file${linkAttribute.fileNumber}`).value;

        inputValues.dataTypeToGet = document.querySelector(`${qsConfigRoot}type${linkAttribute.fileNumber}`).value;
        if (inputValues.dataTypeToGet === '') {
            mime = mimePreset.html;
        }
        else {
            mime = mimePreset[inputValues.dataTypeToGet];
            if (mime === undefined) {
                mime = inputValues.dataTypeToGet;
            }
        }

        function getRawUrlFromSchema() {
            return inputValues.rawUrlSchema
                .replace('{SRC}',       inputValues.rawUrl)
                .replace('{USER}',      inputValues.user)
                .replace('{REPO}',      inputValues.rep)
                .replace('{BRANCH}',    inputValues.branch)
                .replace('{URL}',       inputValues.url);
        }

        switch (linkAttribute.domainType) {
            case 'ghio':
                finalUrl = `https://${inputValues.website}/${inputValues.url}`;
                break;
            case 'ghraw':
                finalUrl = 'https://' + getRawUrlFromSchema();
                break;
            case 'ghraw_private':
                finalUrl = 'https://' + getRawUrlFromSchema();
                headers = [
                    {
                        property: inputValues.tokenHeader,
                        value: inputValues.tokenPrefix + inputValues.token,
                    }
                ];
                break;
            case 'relative':
                finalUrl = inputValues.url;
                break;
        }

        readTextFile(
            {
                url: finalUrl,
                mime: mime,
                headers: headers,
                method: inputValues.method,
            },
            data => {
                addTo.innerHTML = data;
            }
        );
    });
});

readTextFile(
    {
        url: document.querySelector(`${qsConfigRoot}file1`).value,
        mime: mimePreset.html,
    },
    data => {
        addTo.innerHTML = data;
    }
);