const flattenObject = (objList, parentKey = '') => {
    return objList.map((obj) => {
        let result = {};

        function recursiveFlatten(obj, parentKey = '') {
            for (let key in obj) {
                const newKey = key

                if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    recursiveFlatten(obj[key], newKey);
                } else {
                    result[newKey] = obj[key];
                }
            }
        }

        recursiveFlatten(obj);
        return result;
    });
}
const extractFields = (fieldsToExtract, objectsArr) => objectsArr.reduce((result, obj) => {
    const extractedObject = fieldsToExtract.reduce((acc, field) => {
        if (obj.hasOwnProperty(field)) {
            acc[field] = obj[field];
        }
        return acc;
    }, {});
    result.push(extractedObject);
    return result;
}, []);
const getRandomPrice = () => (Math.random() * 90 + 10).toFixed(2)

const buildApiQuery = ({
                           searchTerm,
                           startIndex,
                           pagesPerCall
                       }) => {

    const queryPrefix = searchTerm.length > 0 ? `?q=${searchTerm}+insubject:cyber` : `?q=cyber`
    const querySuffix = `&projection=lite&maxResults=${pagesPerCall ?? 10}&startIndex=${startIndex ?? 0}`
    return queryPrefix + querySuffix
}


const fieldsToExtract = {

    'thumbnail': {textValue: 'Image', type: 'image'},
    'id': {textValue: 'Id', visible: false},
    'price': {textValue: 'Price'},
    'title': {textValue: 'Title'},
    'subtitle': {textValue: 'Subtitle'},
    'authors': {textValue: 'Authors'},
    'publisher': {textValue: 'Publisher'},
    'publishedDate': {textValue: 'Publish date'},
    'description': {textValue: 'Description', type: 'paragraph'},
    'pageCount': {textValue: 'Pages amount'},
    'categories': {textValue: 'Categories'},
    'maturityRating': {textValue: 'Maturity rating'},
    'language': {textValue: 'Language'},
    'previewLink': {textValue: 'Preview link', type: 'link'},
    'infoLink': {textValue: 'Info link', type: 'link'},
    'country': {textValue: 'Country'}
}
const imageNotFoundUrl = 'https://compote.slate.com/images/055c2ee6-144a-427d-a4ac-af0eaa3d1053.jpeg?crop=2803%2C1869%2Cx0%2Cy0'
const noBooksFound = 'https://www.ganpatuniversity.ac.in/images/front-end/course_not_found_icon.png'

export {flattenObject, extractFields, getRandomPrice, buildApiQuery, fieldsToExtract, imageNotFoundUrl, noBooksFound}