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
            user:       document.querySelector(`${qsConfigRoot}user`).value,
            rep:        document.querySelector(`${qsConfigRoot}rep`).value,
            branch:     document.querySelector(`${qsConfigRoot}branch`).value,
            token:      document.querySelector(`${qsConfigRoot}token`).value,
            website:    document.querySelector(`${qsConfigRoot}website`).value,
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

        switch (linkAttribute.domainType) {
            case 'ghio':
                finalUrl = `${inputValues.website}/${inputValues.url}`;
                break;
            case 'ghraw':
                finalUrl = `https://raw.githubusercontent.com/${inputValues.user}/${inputValues.rep}/${inputValues.branch}/${inputValues.url}`;
                break;
            case 'ghraw_private':
                finalUrl = `https://raw.githubusercontent.com/${inputValues.user}/${inputValues.rep}/${inputValues.branch}/${inputValues.url}`;
                headers = [
                    {
                        property: 'Authorization',
                        value: `Token ${inputValues.token}`,
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