import { v4 as uuidv4 } from 'uuid';

const generateID = (length) => {
    if (!length || length < 0 || length > 32)
        length = 10;
    const uuid = uuidv4();
    return uuid.replaceAll('-','').substring(0,length);
};

export {
    generateID
}